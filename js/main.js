var game = new Phaser.Game(1200, 620, Phaser.AUTO, '');

var score = new ScoreKeeper();

// game objects
var background;
var midground;
var scoreText;
var player;
var cursors;
var playerSpeed = 400;

var lasers;
var laserSpeed = 300;
var fireRate = 0;
var coPilotGroup;
var coPilot;
var coPilotFrame;
var coPilotText;
var weapon = 0;

var explosions;

// variables for drone shooting
var droneBullets;
var droneBulletSpeed = 600;
var droneFireRate = 2000;

var drones;


var mainState = {

    create: function () {
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
        laser9 = game.add.audio('laser9');
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

        // add drone bullet
        droneBullets = game.add.group();
        droneBullets.enableBody = true;
        droneBullets.physicsBodyType = Phaser.Physics.ARCADE;
        droneBullets.createMultiple(50, 'enemyBltDrone');
        droneBullets.setAll('anchor.x', 0.5);
        droneBullets.setAll('anchor.y', 1);
        droneBullets.setAll('checkWorldBounds', true);
        droneBullets.setAll('outOfBoundsKill', true);

        // Enemies

        drones = game.add.group();
        drones.enableBody = true;
        drones.physicsBodyType = Phaser.Physics.ARCADE;
        drones.setAll('anchor.x', 0.5);
        drones.setAll('anchor.y', 0.5);
        drones.setAll('outOfBoundsKill', true);
        //drones.setAll('fireRate',0);

        // for (var i = 0; i < 12; i++) {
        //     var that = this;
        //     var drone = drones.create((game.stage.width - 150) * Math.random(), -i * 400, 'enemyDrone');
        //     drone.scale.setTo(0.6, 0.6);
        //     drone.body.velocity.y = 150;
        //     drone.checkWorldBounds = true;
        //     drone.events.onOutOfBounds.add((d) => {
        //         if (d.body.y > game.height) {
        //             d.kill();
        //         }
        //     }, this);
        //     drone.fireRate = 0;
        // }


        // co-pilot feature

        coPilotGroup = game.add.group();
        coPilot = game.add.image(200, 250, 'coPilot');
        coPilotFrame = game.add.image(coPilot.x, coPilot.y, 'coPilotFrame');
        coPilotText = game.add.text(coPilot.x + coPilot.width / 2 + 50, coPilot.y - coPilot.height / 2, "Test", { fontSize: '24px', wordWrap: true, wordWrapWidth: 300, fill: '#dbd2d2' });
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
        var pauseKey = game.input.keyboard.addKey(Phaser.Keyboard.ESC);
        pauseKey.onDown.add(this.pauseHandler, this);
        game.onBlur.add(this.pauseHandler, this);

        scoreText = game.add.text(16, 16, 'Score: 0', { fontSize: '32px', fill: '#FFF' });

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
    
        // load the level
        this.loadLevel(game.cache.getJSON('levelData'));
    

    },


    update: function () {
        // all items needed during game loop
        // drones shoot on timer
        drones.children.forEach(function (drone) {

            if (drone.body) {
                if (game.time.now > drone.fireRate) {
                    window.mainState.droneFire(drone.body.x, drone.body.y);
                    drone.fireRate = game.time.now + droneFireRate;
                }
            }
        });
        // Scroll background
        background.tilePosition.y += 0.25;
        midground.tilePosition.y += 0.5;

        player.body.velocity.x = 0;
        player.body.velocity.y = 0;

        // player movement controls
        if (cursors.left.isDown) {
            //  Move to the left
            player.body.velocity.x = -1 * playerSpeed;
        } else if (cursors.right.isDown) {
            //  Move to the right
            player.body.velocity.x = playerSpeed;
        }
        if (cursors.up.isDown) {
            //  Move up   
            player.body.velocity.y = -1 * playerSpeed;
        } else if (cursors.down.isDown) {
            //  Move down
            player.body.velocity.y = playerSpeed;
        }

        // add fire button
        fireButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

        // enable shooting
        if (fireButton.isDown) {
                this.fire(player.x);
            
        }

        // check if lasers hit enemies

        game.physics.arcade.overlap(lasers, drones, (laser, drone) => {
            this.enemyExplosion(drone);
            laser.kill();
            drone.kill();
            drone.body = false;
            score.increaseScore(10);
            score.displayScore();
            //TODO: Increase score

        }, null, this);

        // check if bullets hit player 

        game.physics.arcade.overlap(droneBullets, player, (droneBullet, player) => {
            this.enemyExplosion(player);
            player.kill();
            droneBullet.kill();
            this.coPilotMessage("GAME OVER. Press Enter to play again");
            var escapeKey = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
            escapeKey.onDown.addOnce(() => { game.state.start('lose') }, this);
        }, null, this)

        // check if player collides with enemy
        game.physics.arcade.overlap(player, drones, (player, drone) => {
            this.enemyExplosion(player);
            player.kill();
            drone.kill();

            this.coPilotMessage("GAME OVER. Press Enter to play again");
            var escapeKey = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
            escapeKey.onDown.addOnce(() => { game.state.start('lose') }, this);
        }, null, this)


    },

    loadLevel: function(levelData) {
        levelData.enemies.forEach((e)=>{
            game.time.events.add(Phaser.Timer.SECOND * e.time, this.addDrone, this, e.position);
        });
        levelData.messages.forEach((e)=>{
            game.time.events.add(Phaser.Timer.SECOND * e.time, this.coPilotMessage, this, e.text);
        });
    },

    addDrone: function(position) {

        if(position === 'random' || position === undefined){
            postion = (game.stage.width - 150) * Math.random();
        }
        
        var drone = drones.create(position, -100, 'enemyDrone');
        drone.scale.setTo(0.6, 0.6);
        drone.body.velocity.y = 150;
        drone.checkWorldBounds = true;
        drone.events.onOutOfBounds.add((d) => {
            if (d.body.y > game.height) {
                d.kill();
            }
        }, this);
        drone.fireRate = 0;
    },

    enemyExplosion: function (enemy) {
        var explosion = explosions.getFirstExists(false);
        explosion.reset(enemy.body.x + enemy.body.halfWidth, enemy.body.y + enemy.body.halfHeight);
        explosion.alpha = 0.7;
        explosion.play('explosion', 30, false, true);
        explode1.play();
    },

    coPilotMessage: function (message) {
        coPilotText.setText(message)
        coPilotGroup.visible = true;
        game.time.events.add(Phaser.Timer.SECOND * 5, function () {
            coPilotGroup.visible = false
        }
            , this);
    },

    pauseHandler: function () {
        if(player.alive){
            coPilotText.setText("Game Paused. Press ESC to continue");
            if (game.paused) {
                game.paused = false;
                coPilotGroup.visible = false;
            } else {
                game.paused = true;
                coPilotGroup.visible = true;
            }

        }
    },

    fire: function (x) {
        switch (weapon) {
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

    },

    droneFire: function (x, y) {
        droneBullet = droneBullets.getFirstExists(false);
        if (droneBullet) {
            droneBullet.reset(x + 60, y + 140);
            droneBullet.body.velocity.y = droneBulletSpeed;
            laser9.play();
        }
    }
};

// game state
game.state.add('load', loadState);
game.state.add('main', mainState);
game.state.add('win', winState);
game.state.add('lose', loseState);
game.state.start('load');
