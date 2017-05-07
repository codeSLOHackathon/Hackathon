function ScoreKeeper(){
	var score = 0;
	this.getScore = function(){
		return score;
	};
	this.increaseScore = function(val){
		score += val;
	};
	this.clearScore = function(){
		score = 0;
	}

	this.displayScore = function(){
		scoreText.text = 'Score: '+score;
	};

//this.reset = function(){
//score = 0;
//};
}




