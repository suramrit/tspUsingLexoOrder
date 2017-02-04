
var pokemon = [];
var totalCount = 5;
var recordDistance;
var bestOrder;

var order = [];

var totalPermutations = factorial(totalCount);
var count=0;

function setup(){ 
	createCanvas(400,600);
	for(var i =0; i<totalCount;i++){
		var v = createVector(random(width), random(height/2));
		pokemon[i] = v;
		order[i] = i;
	}

	var d = calcDistance(pokemon,order);
	recordDistance = d;
	bestOrder = order.slice();
	
	
}


function draw(){
	background(50);
	//frameRate(8);
	fill(255);
	for(var i=0;i<pokemon.length;i++){
		ellipse(pokemon[i].x,pokemon[i].y,6,6);
	}
	
	stroke(255,0,255);
	strokeWeight(4);
	noFill();
	beginShape();
	for(var i=0;i<order.length;i++){
		var n = bestOrder[i];
		vertex(pokemon[n].x,pokemon[n].y);
	}
	endShape();
	translate(0,height/2);
	stroke(255);
	strokeWeight(1);
	noFill();
	beginShape();
	for(var i=0;i<order.length;i++){
		var n = order[i];
		vertex(pokemon[n].x,pokemon[n].y);
	}
	endShape();




	//swap(pokemon,floor(random(pokemon.length)),floor(random(pokemon.length)));

	var d = calcDistance(pokemon,order);
	if(d<recordDistance){
		recordDistance = d;
		bestOrder = order.slice();
		console.log(recordDistance);
	}

	
	textSize(30);
	/*var s = '';
	for(var i=0; i<order.length;i++){
		s+=order[i];
	}
	text(s,20,height/2)
	*/
	fill(255);
	var perc = 100 * (count/totalPermutations);
	text(nf(perc,0,2) + "% completed",20,height/2-50);
	nextOrder();
}

function swap(a,i,j){
	var t = a[j];
	a[j] = a[i];
	a[i] = t;
}

function calcDistance(points,order){
	var sum =0;
	for(var i=0; i<points.length-1;i++){
		var cityA = points[order[i]];
		var cityB = points[order[i+1]];
		var d = dist(cityA.x,cityA.y,cityB.x,cityB.y);
		sum+=d;
	}

	return sum; 

}


function nextOrder(){
	count++;
	var largestI = -1;
	for(var i=0;i<order.length-1;i++){
		if(order[i]<order[i+1])
			largestI = i;
	}
	if(largestI == -1){
		noLoop();
		console.log('finished');
	}
	var largestJ = -1;
	for(var i =0; i<order.length;i++){
		if(order[i]>order[largestI])
			largestJ = i;
	}
	//console.log(largestJ)
	//console.log(largestI)
	swap(order,largestI,largestJ);

	// reverse from largestI+1 to the end. 
	var endArray = order.splice(largestI+1);
	endArray.reverse();
	order = order.concat(endArray);

}
function factorial(n){
	if(n==1)
		return 1;
	else
		return n * factorial(n-1);
}