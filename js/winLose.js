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
        game.state.start('main');
    }
};