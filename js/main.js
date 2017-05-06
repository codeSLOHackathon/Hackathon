var game = new Phaser.Game(1000,850, Phaser.AUTO, '');
var score = new ScoreKeeper();
var background;
var scoreText;


var mainState ={

    preload: function(){
    game.load.image('skyNebula1', 'Assets/Background/skyNebula1.png');
    game.load.image('enemyShip1', 'Assets/Enemies/largeShip1.png');
    game.load.image('enemyShip2', 'Assets/Enemies/ship2.png');
    game.load.image('playerGreenShip', 'Assets/PlayerShip/ship5.png');
    game.load.image('playerBlueShip', 'Assets/PlayerShip/spikedShipBlue.png');
    game.load.audio('explosion', 'assets/audio/SoundEffects/explosion.mp3');
    },
    
    create: function(){
        // all items needed at game creation
        scoreText = game.add.text(16, 16, 'score: 0', { fontSize: '32px', font: "Bauhaus 93",fill: '#000' });
        
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
