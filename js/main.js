var game = new Phaser.Game(1000, 900, Phaser.AUTO, '', { preload: preload, create: create, update: update });
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
