/*
* Prescott Lau
* November 23rd 2024
* This project uses p5.js to create (what will eventually, hopefully) 
* be an interactive lava lamp!
*
* This is the main file. 
* It calls the Circle function to create many different circles.
*/


//initialize variables:
let circles = [];
let circleCount = 25;

let randomC1;
let randomC2;
let randomC3;
let randomC4;
let randomC5;
let randomC6;


/*
* This is the setup() function.
*/
function setup()
{
  createCanvas(800,800);
  
  //initialize random colors above, so that when the background draws, it allows the circles to move.
  randomC1 = random(255);
  randomC2 = random(255);
  randomC3 = random(255);
  randomC4 = random(255);
  randomC5 = random( 0, random(255) );
  randomC6 = random(255);

  initCircles(); //initializes the circles.
}


/*
* This is the draw() function.
*/
function draw()
{ 
  drawBackground(); //calls the drawBackground function.
  for(let circle of circles) //for loop to loop through circles and move & draw them.
  {
    circle.update();
    circle.display();
  }
}


/*
* This is the initCircles() function.
* This function is called in the setup() and creates and initializes all the circles based on the circleCount.
*/
function initCircles()
{
  for(let i = 0; i < circleCount; i++)
  {
    circles.push( new Circle( random(width), random(height) ) );
  }
}


/*
* This is the drawBackground() function.
* This creates a gradient multicolored background 
*/
function drawBackground()
{
  noStroke();
  let gradS = color( randomC1, randomC2, randomC3 );
  let gradE = color( randomC4, randomC5, randomC6 );
  for( let y = 0; y < height; y++ )
  {
    let amt = map(y, 0, height, 0, 1); 
    let c = lerpColor(gradS, gradE, amt);
    
    stroke(c);
    line(0, y, width, y);
  }
}