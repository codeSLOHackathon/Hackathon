var game = new Phaser.Game(1000,850, Phaser.AUTO, '');
var score = new ScoreKeeper();

function preload() {
    game.load.image('SkyNebula1', 'Assets/background/skyNebula_256LH.png');
    game.load.image('SkyNebula2', 'Assets/background/skyNebula_LH.png');
    game.load.image('EnemyShip', 'Assets/Enemies/large.ship_1.png');
    game.load.image('PlayerShip', 'Assets/PlayerShip/ship_1.png');
  
}

var mainState ={
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
