var game = new Phaser.Game(1000,850, Phaser.AUTO, '');
var score = new ScoreKeeper();
var background;


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
    },
     
     
    update: function(){
        // all items needed during game loop
        
        // Scroll background
        background.tilePosition.y += 0.5;
    }
    
};

// game state
game.state.add('main',mainState);
game.state.start('main');
