var game = new Phaser.Game(1000,850, Phaser.AUTO, '');
var score = new ScoreKeeper();

function preload() {

  
}
console.log(score.getScore());
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
