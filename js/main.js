var game = new Phaser.Game(1000,850, Phaser.AUTO, '');
var score = new ScoreKeeper();
var background;
var player;
var cursors;


var mainState ={

    preload: function(){
    game.load.image('skyNebula1', 'Assets/Background/skyNebula1.png');
    game.load.image('enemyShip1', 'Assets/Enemies/largeShip1.png');
    game.load.image('enemyShip2', 'Assets/Enemies/ship2.png');
    game.load.image('playerGreenShip', 'Assets/PlayerShip/ship5.png');
     game.load.image('playerBlueShip', 'Assets/PlayerShip/spikedShipBlue.png');
    },

    create: function(){
        // all items needed at game creation
        
        // Add background
        background = game.add.tileSprite(0, 0, game.width, game.height, 'skyNebula1');

        // Add player ship
        player = game.add.sprite(0, game.height - 150, 'playerGreenShip');
        player.scale.setTo(0.5, 0.5);
        game.physics.arcade.enable(player);
        player.body.collideWorldBounds = true;

        // controls
        cursors = game.input.keyboard.createCursorKeys();

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
    
    }
    
};

// game state
game.state.add('main',mainState);
game.state.start('main');
