    var loadText;

var loadState = {
    loadEverything: function() {

        game.load.image('skyNebula1', 'Assets/Background/SkyNebula_LH.png');
        game.load.image('starBlu', 'Assets/Background/StarBlu.png');
        game.load.image('coPilot', 'Assets/CoPilot/creature.png');
        game.load.image('coPilotFrame', 'Assets/CoPilot/creatureFrame.png');
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

    // game.load.script('Orbitron','https://fonts.googleapis.com/css?family=Orbitron');
        game.load.spritesheet('explosion', 'Assets/Effects/explosion-01.png', 64, 64, 14);
        
        game.load.start();
    }, 

    create: function() {
        loadText = game.add.text(16, 16, 'Loading: 0%', { fontSize: '32px', fill: '#FFF' });
        this.loadEverything();

        game.load.onFileComplete.add(this.fileComplete, this);
        game.load.onLoadComplete.add(this.loadComplete, this);


    },

    fileComplete: function(progress, cacheKey, success, totalLoaded, totalFiles) {
        loadText.text = "Loading: " + progress + "% - " + totalLoaded + " out of " + totalFiles;
    },

    loadComplete: function() {
        game.state.start('main');
    }


}