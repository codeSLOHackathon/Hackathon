var game = new Phaser.Game(900, 1000, Phaser.AUTO, '');

function preload() {
    
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

