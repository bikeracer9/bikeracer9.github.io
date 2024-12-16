/*
* Prescott Lau
* December 15th 2024
* This project uses p5.js.
* This is the main file. 
* It calls the Circle, Fly, and Perlin_Particle classes to create a randomized interactive art exhibit.
* INSTRUCTIONS: 
*              [MouseClick] --> Draws and displays a new Circle at mouse X & Y coords
*            [MouseDragged] --> Changes the "gradS" value (change the background gradient color)
*            [Refresh Page] --> Changes everything (background colors, placement of circles, flies, perlin noise generator)
*/

let circles = [];
let extraCircleCount;
let circleCount = 25; //+ extraCircleCount;

let gradS, gradE; //gradient for background color

let randomC1;
let randomC2;
let randomC3;
let randomC4;
let randomC5;
let randomC6;

var incriment = 0.1; //incriments the perlin noise 
var scl = 10; //scale to determine grid cells 
var cols, rows; //columns and rows for the flow field grid

var zOffset = 0; //z axis offset

var fr; //frame rate

var particles = []; //array to store Particle objects

var flowfield; //array to store flow field vectors

let flies = []; //array to store Fly objects
var fliesCount = 30; // num of total flies being created


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

  gradS = color( randomC1, randomC2, randomC3 ); //init start color
  gradE = color( randomC4, randomC5, randomC6); // init end color

  initCircles();  //initializes the white circles.
  initParticles();//initializes the Perlin Noise Particles
  initFlies();    //initializes the Flies.

} //end of setup()


/*
* This is the draw() function.
*/
function draw()
{ 
  drawBackground(); 

  perlinParticlesDraw();

  circlesDraw();

  fliesDraw();
} //end of draw()


/*
* This is the mousePressed() function
* It creates and displays a new circle at the mouse X & Y cords whenever the mouse is pressed.
*/
function mousePressed()
{
  circles.push(new Circle(mouseX, mouseY));
}//end of mousePressed()


/*
*This is the initParticles() function.
* This function is called in the setup() and creates and initializes all the Perlin Particles.
*/
function initParticles()
{
  cols = floor(width / scl);
  rows = floor(height / scl);
  fr = createP('');

  flowfield = new Array(cols * rows);

  for (var i = 0; i < 350; i++) 
  {
    particles[i] = new perlin_particle();
  }
}//end of initParticles()

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
} //end of initCircles()

/*
* This is the initFlies() function.
* This function is called in the setup() and creates and initializes all the flies based on the fliesCount variable.
*/
function initFlies()
{
    for (let i = 0; i < fliesCount; i++) 
    {
      flies.push(new Fly());
    }
}// end of initFlies()

/*
* This is the drawBackground() function.
* This creates a gradient multicolored background 
*/
function drawBackground()
{
  noStroke();
  for( let y = 0; y < height; y++ )
  {
    let amt = map(y, 0, height, 0, 1); 
    let c = lerpColor(gradS, gradE, amt);
    stroke(c);
    line(0, y, width, y);
  }//end of drawBackground()
}

  /*
  * This is the mouseDragged() function
  * This function allows for the start (beginning) of the gradient that the user starts with to be changed manually,
  * whenever the user clicks and drags their mouse around the screen.
  */
  function mouseDragged()
  {
    gradS = color( map(mouseX, 0, width, 0, 255) + random(-50,50), map(mouseY, 0, height, 0, 255) + random(-50,50), random(25, 255) );
  }//end of mouseDragged()

  /*
  * This is the perlinParticlesDraw() function
  *This function is called in the draw() function 
  * This function draws & updates all the particles for the perlin noise thingy.
  */
  function perlinParticlesDraw()
  {
    var yOffset = 0;
    for (var y = 0; y < rows; y++) 
    {
      var xOffset = 0;
      for (var x = 0; x < cols; x++) 
      {
        var index = x + y * cols;
        var angle = noise(xOffset, yOffset, zOffset) * TWO_PI * 4.2;
        var v = p5.Vector.fromAngle(angle);
        v.setMag(1);
        flowfield[index] = v;
        xOffset += incriment;
        stroke(0, 50);
      }

      yOffset += incriment;

      zOffset += 0.0007;

      for (var i = 0; i < particles.length; i++) 
      {
        particles[i].followOther(flowfield);
        particles[i].updateParticles();
        particles[i].checkEdges();
        particles[i].showParticles();
      }
    }
  }

  /*
  * This is the circlesDraw() function
  * This function is called in the draw() function 
  * This function draws & updates all the circles.
  */
  function circlesDraw()
  {
    for(let circle of circles) 
    {
      circle.update();
      circle.display();
    }
  }

  /*
  * This is the fliesDraw() function
  * This function is called in the draw() function 
  * This function draws & updates all the flies.
  */
  function fliesDraw()
  {
    for (let fly of flies) 
    {
      fly.update();
      fly.display();
    }
  }
