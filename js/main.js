var game = new Phaser.Game(1000,850, Phaser.AUTO, '');
var score = new ScoreKeeper();


var mainState ={

    preload: function(){
    game.load.image('skyNebula1', 'Assets/Background/skyNebula1.png');
    game.load.image('skyNebula2', 'Assets/Background/skyNebula2.png');
    game.load.image('enemyShip', 'Assets/Enemies/largeShip1.png');
    game.load.image('enemyShip', 'Assets/Enemies/ship2.png');
    game.load.image('playerShip', 'Assets/PlayerShip/ship5.png');
     game.load.image('playerShip', 'Assets/PlayerShip/spikedShipBlue.png');
    }
    create: function(){
        // all items needed at game creation
    },
     
     
    update: function(){
        // all items needed during game loop
    }
    
};

// game state
game.state.add('main',mainState);
game.state.start('main');
