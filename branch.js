function branch(begin,end){
	this.begin = begin;
	this.end = end;
	this.finished =false;
	this.show = function(){
		stroke(255);
		line(this.begin.x,this.begin.y,this.end.x,this.end.y);
	}
	this.jitter = function(){
		this.end.x += random(-1,1);
		this.end.y += random(-1,1);
	}
	this.brnchA = function(){
		//this.finished =true;
		var dir = p5.Vector.sub(this.end,this.begin);
		dir.rotate(PI/6);
		dir.mult(0.67);
		var newEnd = p5.Vector.add(this.end,dir);

		var right = new branch(this.end, newEnd);
		return right;

	}
	this.brnchB = function(){

		var dir = p5.Vector.sub(this.end,this.begin);
		dir.rotate(-PI/3);
		dir.mult(0.67);
		var newEnd = p5.Vector.add(this.end,dir);

		var left = new branch(this.end, newEnd);
		return left;

	}
}