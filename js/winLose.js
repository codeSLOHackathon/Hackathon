var winLoseMainText;
var winLoseSubText;

var winState = {
    create: function() {
        setTimeout(function() {
            game.state.start('main')
        }, 1000);
    }
};

var loseState = {
    create: function() {
        winLoseMainText = game.add.text(400, 200, 'GAME OVER', { fontSize: '50px', fill: '#FFF' });
        winLoseSubText = game.add.text(370, 300, 'Press Enter to Play Again', { fontSize: '30px', fill: '#FFF' });

        var escapeKey = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
        escapeKey.onDown.addOnce(()=>{game.state.start('main')}, this);
    }
};