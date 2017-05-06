var game = new Phaser.Game(1200,620, Phaser.AUTO, '');

var score = new ScoreKeeper();

// game objects
var background;
var midground;
var scoreText;
var player;
var cursors;
var pauseText;

var laser;
var laserSpeed = 300;
var fireRate = 0;
var coPilot;
var weapon = 0;

var mainState ={

    preload: function(){

    game.load.image('skyNebula1', 'Assets/Background/SkyNebula_LH.png');
    game.load.image('starBlu', 'Assets/Background/StarBlu.png');
    game.load.image('coPilot', 'Assets/CoPilot/creature.png');


    game.load.image('enemyShip1', 'Assets/Enemies/shipEnemy1.png');
    game.load.image('enemyShip2', 'Assets/Enemies/shipEnemy2.png');
    game.load.image('playerGreenShip', 'Assets/PlayerShip/playerShip.png');
    game.load.image('playerBlueShip', 'Assets/PlayerShip/spikedShipBlue.png');
    game.load.image('playerBltBasic','Assets/Effects/BuletPlr.png');
    game.load.image('enemyDrone','Assets/Enemies/EnemyShipDrone.png');
    game.load.image('enemyHunter','Assets/Enemies/EnemyShipHunter.png');


    game.load.audio('laser1', 'Assets/soundFx/Laser/Laser_00.wav');
    game.load.audio('laser2', 'Assets/soundFx/Laser/Laser_01.wav');
    game.load.audio('laser3', 'Assets/soundFx/Laser/Laser_02.wav');
    game.load.audio('laser4', 'Assets/soundFx/Laser/Laser_03.wav');
    game.load.audio('laser5', 'Assets/soundFx/Laser/Laser_04.wav');
    game.load.audio('laser6', 'Assets/soundFx/Laser/Laser_05.wav');
    game.load.audio('laser7', 'Assets/soundFx/Laser/Laser_06.wav');
    game.load.audio('laser8', 'Assets/soundFx/Laser/Laser_07.wav');
    game.load.audio('laser9', 'Assets/soundFx/Laser/Laser_08.wav');
    game.load.audio('laser10', 'Assets/soundFx/Laser/Laser_09.wav');

    game.load.audio('alarmLoop', 'Assets/soundFx/Alarm_Loop_00.wav');
    game.load.audio('alarmLoop1', 'Assets/soundFx/Alarm_Loop_01.wav');

    game.load.audio('alienLanguage', 'Assets/soundFx/Alien_Language_00.wav');
    game.load.audio('ambience1', 'Assets/soundFx/Ambience_AlienHive_00.wav');
    game.load.audio('ambience2', 'Assets/soundFx/Ambience_AlienPlanet_00.wav');
    game.load.audio('ambience3', 'Assets/soundFx/Ambience_BlackHole_00.wav');
    game.load.audio('ambience4', 'Assets/soundFx/Ambience_Space_00.wav');
    game.load.audio('ambienceAchievement', 'Assets/soundFx/Jingle_Achievement_00.wav');
    game.load.audio('jingleLose', 'Assets/soundFx/Jingle_Lose_00.wav');
    game.load.audio('jingleWin', 'Assets/soundFx/Jingle_Win_00.wav');
    game.load.audio('jingleWi1', 'Assets/soundFx/Jingle_Win_01.wav');

    game.load.audio('menuSelect', 'Assets/soundFx/Menu_Select_00.wav');
    game.load.audio('menuSelect1', 'Assets/soundFx/Menu_Select_01.wav');

    game.load.audio('robotActivated', 'Assets/soundFx/Robot_Activated_00.wav');
    game.load.audio('robotTalk', 'Assets/soundFx/Robot_Talk_01.wav');
    game.load.audio('robotTalk2', 'Assets/soundFx/Robot_Talk_02.wav');

    game.load.audio('engineLarge', 'Assets/soundFx/SpaceShip_Engine_Large_Loop_00.wav');
    game.load.audio('engineMedium', 'Assets/soundFx/SpaceShip_Engine_Medium_Loop_00.wav');
    game.load.audio('engineSmall', 'Assets/soundFx/SpaceShip_Engine_Small_Loop_00.wav');

    game.load.audio('warpDrive', 'Assets/soundFx/WarpDrive_00.wav');
    game.load.audio('warpDrive1', 'Assets/soundFx/WarpDrive_01.wav');
    game.load.audio('warpDrive2', 'Assets/soundFx/WarpDrive_02.wav');
},
    
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

        //add sound effects
        laser10 = game.add.audio('laser10');

        // controls
        cursors = game.input.keyboard.createCursorKeys();

        // pause functionality
        pauseText = game.add.text(230, 150, 'Paused - Press Enter to Resume', { fontSize: '32px', fill: '#5D5' });
        var pauseKey = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
        pauseKey.onDown.add(this.pauseHandler, this);
        game.onBlur.add(this.pauseHandler, this);
        pauseText.visible = false;


        // add player basic player bullet
        lasers = game.add.group();
        lasers.enableBody = true;
        lasers.physicsBodyType = Phaser.Physics.ARCADE;
        lasers.createMultiple(50, 'playerBltBasic');
        lasers.setAll('anchor.x', 0.5);
        lasers.setAll('anchor.y', 1);
        lasers.setAll('checkWorldBounds', true);
        lasers.setAll('outOfBoundsKill', true);

        // co-pilot feature
        coPilot = game.add.image(50,50,'coPilot');
        coPilot.scale.setTo(0.1,0.1);
        coPilotText = game.add.text(190,50,'Nice work', {fontSize: '18px', fill: '#dbd2d2'});
        // TODO Add fade in, fade out; cycle through array of quotes
        
        scoreText = game.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#FFF' });
        
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
            player.body.velocity.x = -150;
        } else if (cursors.right.isDown) {
            //  Move to the right
            player.body.velocity.x = 150;
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
                }
            }
            break;
        }

            
        }

};

// game state
game.state.add('main', mainState);
game.state.start('main');
