var game = new Phaser.Game(1000,850, Phaser.AUTO, '');
var score = new ScoreKeeper();

// game objects
var background;
var scoreText;
var player;
var cursors;
var pauseText;

var mainState ={

    preload: function(){
    game.load.image('skyNebula1', 'Assets/Background/skyNebula1.png');
    game.load.image('enemyShip1', 'Assets/Enemies/shipEnemy1.png');
    game.load.image('enemyShip2', 'Assets/Enemies/shipEnemy2.png');
    game.load.image('playerGreenShip', 'Assets/PlayerShip/playerShip.png');

    },
    
    create: function(){
        // all items needed at game creation
        scoreText = game.add.text(16, 16, 'score: 0', { fontSize: '32px', font: "Bauhaus 93",fill: '#000' });
        
        // Add background
        background = game.add.tileSprite(0, 0, game.width, game.height, 'skyNebula1');

        // Add player ship
        player = game.add.sprite(0, game.height - 150, 'playerGreenShip');
        player.scale.setTo(0.3, 0.3);
        game.physics.arcade.enable(player);
        player.body.collideWorldBounds = true;

        // controls
        cursors = game.input.keyboard.createCursorKeys();

        // pause functionality
        pauseText = game.add.text(200,400, 'Paused - Press Enter to Resume', {fontSize: '32px', fill: '#DDD'});
        var pauseKey = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
        pauseKey.onDown.add(this.pauseHandler, this);
        game.onBlur.add(this.pauseHandler, this);
        pauseText.visible = false;
    },
     
     
    update: function(){
        // all items needed during game loop
        
        // Scroll background
        background.tilePosition.y += 0.5;

        if (cursors.left.isDown)
        {
        //  Move to the left
            player.body.velocity.x = -150;
        } else if (cursors.right.isDown){
        //  Move to the right
            player.body.velocity.x = 150;
        } else if (cursors.up.isDown){
            player.body.velocity.y = -150;
        } else if (cursors.down.isDown){
            player.body.velocity.y = 150;
        } else {
        player.body.velocity.x = 0;
        player.body.velocity.y = 0;
        }
    
    },

    pauseHandler: function() {
        console.log(game.paused)
        if(game.paused) {
            game.paused = false;
            pauseText.visible = false;
        } else {
            game.paused = true;
            pauseText.visible = true;
        }
    }
    
};

// game state
game.state.add('main',mainState);
game.state.start('main');
