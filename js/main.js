var game = new Phaser.Game(1200,650, Phaser.AUTO, '');
var score = new ScoreKeeper();

// game objects
var background;
var scoreText;
var player;
var cursors;
var pauseText;

var mainState ={

    preload: function(){
          game.load.image('enemyShip1', 'Assets/Enemies/largeShip1.png');
    game.load.image('enemyShip2', 'Assets/Enemies/ship2.png');
    game.load.image('playerGreenShip', 'Assets/PlayerShip/ship5.png');

      
    game.load.image('skyNebula1', 'Assets/Background/skyNebula1.png');
    game.load.image('enemyShip1', 'Assets/Enemies/shipEnemy1.png');
    game.load.image('enemyShip2', 'Assets/Enemies/shipEnemy2.png');
    game.load.image('playerGreenShip', 'Assets/PlayerShip/playerShip.png');
    game.load.image('playerBlueShip', 'Assets/PlayerShip/spikedShipBlue.png');
    game.load.image('playerBlt','Assets/Effects/BuletPlr.png');
    game.load.image('enemyDrone','Assests/Enemies/EnemyShipDrone.png');
    game.load.image('enemyHunter','Assets/Enemies/EnemyShipHunter.png');

    game.load.audio('laser1', 'SounFX/Laser/Laser_00.wav');
    game.load.audio('laser2', 'SounFX/Laser/Laser_01.wav');
    game.load.audio('laser3', 'SounFX/Laser/Laser_02.wav');
    game.load.audio('laser4', 'SounFX/Laser/Laser_03.wav');
    game.load.audio('laser5', 'SounFX/Laser/Laser_04.wav');
    game.load.audio('laser6', 'SounFX/Laser/Laser_05.wav');
    game.load.audio('laser7', 'SounFX/Laser/Laser_06.wav');
    game.load.audio('laser8', 'SounFX/Laser/Laser_07.wav');
    game.load.audio('laser9', 'SounFX/Laser/Laser_08.wav');
    game.load.audio('laser9', 'SounFX/Laser/Laser_09.wav');

    game.load.audio('alarmLoop', 'SounFX/Laser/Alarm_Loop_00.wav');
    game.load.audio('alarmLoop1', 'SounFX/Laser/Alarm_Loop_01.wav');

    game.load.audio('alienLanguage', 'SounFX/Laser/Alien_Language_00.wav');
    game.load.audio('ambience1', 'SounFX/Laser/Ambience_AlienHive_00.wav');
    game.load.audio('ambience2', 'SounFX/Laser/Ambience_AlienPlanet_00.wav');
    game.load.audio('ambience3', 'SounFX/Laser/Ambience_BlackHole_00.wav');
    game.load.audio('ambience4', 'SounFX/Laser/Ambience_Space_00.wav');
    game.load.audio('ambienceAchievement', 'SounFX/Laser/Ambience_Achievement_00.wav');
    game.load.audio('jingleLose', 'SounFX/Laser/Jingle_Lose_00.wav');
    game.load.audio('jingleWin', 'SounFX/Laser/Jingle_Win_00.wav');
    game.load.audio('jingleWi1', 'SounFX/Laser/Jingle_Win_01.wav');

    game.load.audio('menuSelect', 'SounFX/Laser/Menu_Select_00.wav');
    game.load.audio('menuSelect1', 'SounFX/Laser/Menu_Select_01.wav');

    game.load.audio('robotActivated', 'SounFX/Laser/Robot_Activated_00.wav');
    game.load.audio('robotTalk', 'SounFX/Laser/Robot_Talk_01.wav');
    game.load.audio('robotTalk2', 'SounFX/Laser/Robot_Talk_02.wav');

    game.load.audio('engineLarge', 'SounFX/Laser/SpaceShip_Engine_Large_Loop_00.wav');
    game.load.audio('engineMedium', 'SounFX/Laser/SpaceShip_Engine_Medium_Loop_00.wav');
    game.load.audio('engineSmall', 'SounFX/Laser/SpaceShip_Engine_Small_Loop_00.wav');

    game.load.audio('warpDrive', 'SounFX/Laser/WarpDrive_00.wav');
    game.load.audio('warpDrive1', 'SounFX/Laser/WarpDrive_01.wav');
    game.load.audio('warpDrive2', 'SounFX/Laser/WarpDrive_02.wav');
},
    
    create: function(){
        // all items needed at game creation
        scoreText = game.add.text(16, 16, 'score: 0', { fontSize: '32px', font: "Bauhaus 93",fill: '#000' });
        
        // Add background
        background = game.add.tileSprite(0, 0, game.width, game.height, 'skyNebula1');

        // Add player ship
        player = game.add.sprite(0, game.height - 150, 'playerGreenShip');
        player.scale.setTo(0.2, 0.2);
        game.physics.arcade.enable(player);
        player.body.collideWorldBounds = true;

        // controls
        cursors = game.input.keyboard.createCursorKeys();

        // pause functionality
        pauseText = game.add.text(230,150, 'Paused - Press Enter to Resume', {fontSize: '32px', fill: '#5D5'});
        var pauseKey = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
        pauseKey.onDown.add(this.pauseHandler, this);
        game.onBlur.add(this.pauseHandler, this);
        pauseText.visible = false;
    },
     
     
    update: function(){
        // all items needed during game loop
        
        // Scroll background
        background.tilePosition.y += 0.5;

        player.body.velocity.x = 0;
        player.body.velocity.y = 0;

        if (cursors.left.isDown){
        //  Move to the left
            player.body.velocity.x = -150;
        } else if (cursors.right.isDown){
        //  Move to the right
            player.body.velocity.x = 150;
        } 
        if (cursors.up.isDown){
        //  Move up   
            player.body.velocity.y = -150;
        } else if (cursors.down.isDown){
        //  Move down
            player.body.velocity.y = 150;
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
