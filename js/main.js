var game = new Phaser.Game(1200,620, Phaser.AUTO, '');

var score = new ScoreKeeper();

// game objects
var background;
var midground;
var scoreText;
var healthText;
var player;
var cursors;
var pauseText;

var laser;
var laserSpeed = 300;
var fireRate = 0;
var coPilotGroup;
var coPilot;
var coPilotFrame;
var coPilotText;
var coPilotQuote = 'So, so you think you can tell, heaven from hell, blue skys from pain, can you tell a green field from a cold steel rail? A smile from a veil? Do you think you can tell?';
var weapon = 0;
var explosions;
var drones;

var mainState ={
    
    create: function(){
        // all items needed at game creation
        
        // Add background
        background = game.add.tileSprite(0, 0, game.width, game.height, 'starBlu');
        midground = game.add.tileSprite(0, 0, game.width, game.height, 'skyNebula1');

        // Add player ship
        player = game.add.sprite(0, game.height - 150, 'playerGreenShip');
        player.scale.setTo(0.3, 0.3);
        game.physics.arcade.enable(player);
        player.body.collideWorldBounds = true;
        player.anchor.set(0.5, 0.0);
        player.health = 3;

        //add sound effects
        laser10 = game.add.audio('laser10');
        explode1 = game.add.audio('explode1');

        // controls
        cursors = game.input.keyboard.createCursorKeys();

        // add player basic player bullet
        lasers = game.add.group();
        lasers.enableBody = true;
        lasers.physicsBodyType = Phaser.Physics.ARCADE;
        lasers.createMultiple(50, 'playerBltBasic');
        lasers.setAll('anchor.x', 0.5);
        lasers.setAll('anchor.y', 1);
        lasers.setAll('checkWorldBounds', true);
        lasers.setAll('outOfBoundsKill', true);

        // Enemies

        drones = game.add.group();
        drones.enableBody = true;

        for (var i = 0; i < 12; i++)
        {
            var drone = drones.create((game.stage.width - 150) * Math.random(), -i * 400, 'enemyDrone');
            drone.scale.setTo(0.6, 0.6);
            drone.body.velocity.y = 150;
            drone.checkWorldBounds = true;
            drone.events.onOutOfBounds.add((d) => {
                if(d.body.y > game.height){
                    d.kill(); 
                }
            }, this);
        }

        // co-pilot feature
        coPilotGroup = game.add.group();
        coPilot = game.add.image(200, 200, 'coPilot');
        coPilotFrame = game.add.image(coPilot.x, coPilot.y,'coPilotFrame');
        coPilotText = game.add.text(coPilot.x + coPilot.width/2 + 50, coPilot.y - coPilot.height/2, "Test", {fontSize: '24px', wordWrap: true, wordWrapWidth: 300, fill: '#dbd2d2'});
        coPilotGroup.add(coPilot);
        coPilotGroup.add(coPilotFrame);
        coPilotGroup.add(coPilotText);
        coPilot.anchor.set(0.5);
        coPilotFrame.anchor.set(0.5);
        coPilotText.anchor.set(0);
        coPilotGroup.alpha = 0.8;
        coPilotGroup.visible = false;

        
        // TODO Add fade in, fade out; cycle through array of quotes
        
        // pause functionality
        pauseText = game.add.text(230, 150, 'Paused - Press Enter to Resume', { fontSize: '32px', fill: '#5D5' });
        var pauseKey = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
        pauseKey.onDown.add(this.pauseHandler, this);
        game.onBlur.add(this.pauseHandler, this);
        pauseText.visible = false;


        healthText = game.add.text(1000, 16, 'health: 3, ', { fontSize: '32px', fill: '#F50' });
        scoreText = game.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#FFF' });

        //  An explosion pool
        explosions = game.add.group();
        explosions.enableBody = true;
        explosions.physicsBodyType = Phaser.Physics.ARCADE;
        explosions.createMultiple(30, 'explosion');
        explosions.setAll('anchor.x', 0.5);
        explosions.setAll('anchor.y', 0.5);
        explosions.forEach(function(explosion) {
        explosion.animations.add('explosion');
        });
    
    },


    update: function () {
        // all items needed during game loop
        
        // Scroll background
        background.tilePosition.y += 0.25;
        midground.tilePosition.y += 0.5;

        player.body.velocity.x = 0;
        player.body.velocity.y = 0;

        // player movement controls
        if (cursors.left.isDown) {
            //  Move to the left
            player.body.velocity.x = -300;
        } else if (cursors.right.isDown) {
            //  Move to the right
            player.body.velocity.x = 300;
        }
        if (cursors.up.isDown) {
            //  Move up   
            player.body.velocity.y = -150;
        } else if (cursors.down.isDown) {
            //  Move down
            player.body.velocity.y = 150;
        }

        // add fire button
        fireButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

        // enable shooting
        if (fireButton.isDown) {
            this.fire(player.x);
        }

        // check if bullets hit enemies
        game.physics.arcade.overlap(lasers, drones, (laser, drone)=>{
            this.enemyExplosion(drone);
            this.coPilotMessage("Nice shot!");
            laser.kill();
            drone.kill();    
            //TODO: Increase score

        }, null, this);

        healthText.text = 'health: ' + player.health;

    },

    enemyExplosion: function(enemy){
        var explosion = explosions.getFirstExists(false);
        explosion.reset(enemy.body.x + enemy.body.halfWidth, enemy.body.y + enemy.body.halfHeight);
        explosion.alpha = 0.7;
        explosion.play('explosion', 30, false, true);
        explode1.play();
    },

    coPilotMessage: function(message){
        coPilotText.setText(message)
        coPilotGroup.visible = true;
        game.time.events.add(Phaser.Timer.SECOND * 5, function(){
            coPilotGroup.visible = false}
            , this);
    },

    pauseHandler: function () {
        console.log(game.paused);
        if (game.paused) {
            game.paused = false;
            pauseText.visible = false;
        } else {
            game.paused = true;
            pauseText.visible = true;
        }
    },

    fire: function(x) {
        switch(weapon){
            case 0:
                if (game.time.now > fireRate) {

                laser = lasers.getFirstExists(false);

                if (laser) {
                    laser.reset(x, player.y + 10);
                    laser.body.velocity.y = laserSpeed * -1;
                    laser10.play();
                    fireRate = game.time.now + 200;
                    // testing for ScoreKeeper method
                   // score.increaseScore(1);
                   // score.displayScore();
                }
            }
            break;
        }

            
    }

};

// game state
game.state.add('load', loadState);
game.state.add('main', mainState);
game.state.start('load');
