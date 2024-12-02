// Prescott Lau
// November 28th 2024
// Perlin Noise Particle class

class perlin_particle
{
    constructor()
    {
        this.position = createVector(random(width), random(height));
        this.velocity = createVector(0, 0);
        this.acceleration = createVector(0, 0);
        this.highestSpeed = 4;
        this.prevPosition = this.position.copy();

  }//end of constructor()

  /*
  * This function updates the particles, thus allowing it to move around the screen.
  */
  updateParticles() 
  {
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.highestSpeed);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
  }//end of updatePixels()

  /*
  * This function allows it to move and follows the other pixels.
  */
  followOther(vectors) 
  {
    var x = floor(this.position.x / scl);
    var y = floor(this.position.y / scl);
    var index = x + y * cols;
    var force = vectors[index];
    this.applyV_Force(force);
  }

  /*
  *This function adds the force to the object
  */
  applyV_Force(force) 
  {
    this.acceleration.add(force);
  }

  /*
  * This function "shows/draws the object"
  */
  showParticles() 
  {
    stroke(0 , 55);
    stroke(255, 25);
    strokeWeight(1);
    line(this.position.x, this.position.y, this.prevPosition.x, this.prevPosition.y);
    this.updatePrevPos();
  }//end of show()

  /*
  * This function "updates the previous position"
  */
  updatePrevPos() 
  {
    this.prevPosition.x = this.position.x;
    this.prevPosition.y = this.position.y;
  }

 /*
  * This function checks whether or not the x & y positions are greater than the screen
  */
  checkEdges() 
  {
    if (this.position.x > width) 
    {
      this.position.x = 0;
      this.updatePrevPos();
    }

    if (this.position.x < 0) 
    {
      this.position.x = width;
      this.updatePrevPos();
    }

    if (this.position.y > height) 
    {
      this.position.y = 0;
      this.updatePrevPos();
    }

    if (this.position.y < 0) 
    {
      this.position.y = height;
      this.updatePrevPos();
    }
  }//end of checkEdges()

}//end of perlin_particle class