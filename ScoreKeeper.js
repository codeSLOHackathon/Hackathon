function ScoreKeeper(){
	var score = 0;
	this.getScore = function(){
		return score;
	};
	this.increaseScore = function(val){
		score += val;
	};

//this.reset = function(){
//score = 0;
//};
}




