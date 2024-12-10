/*
* Prescott Lau
* December 8th 2024
* This is the Fly class. It creates a fly that moves around the screen randomly and produces a trail that follows it.
*
*/

class Fly 
{
    constructor() 
    {
      this.position = createVector( random(width), random(height) ); //rand pos
      this.velocity = p5.Vector.random2D().mult( random(1, 3) ); //rand vel
      this.trail = []; // array for past positions
      this.maxTrail = 40; // max length of the trail
      this.color = color( 255, 255, 255, 5, 150 );  //color (white)
    }//end of constructor
  
    /*
    * This function updates the location of the flies.
    */
    update() 
    {
      this.position.add( this.velocity );
      if (random( 1 ) < 0.05) 
      {
        this.velocity = p5.Vector.random2D().mult( random(1, 3) );
      }
  
      this.trail.push( this.position.copy() );

      if (this.trail.length > this.maxTrail) 
      {
        this.trail.shift();
      }
  
      if (this.position.x < 0) 
      {
        this.position.x = width;
      }

      if (this.position.x > width) 
      {
        this.position.x = 0;
      }

      if (this.position.y < 0) 
      {
        this.position.y = height;
      }

      if (this.position.y > height) 
      {
        this.position.y = 0;
      }

    } //end of update()
  
    /*
    * This function displays (draws) the fly. 
    */
    display() 
    {
      noFill();
      strokeWeight( 10 );
      for (let i = 0; i < this.trail.length; i++) 
      {
        let alpha = map( i, 0, this.trail.length, 0, 255 );
        stroke( red(this.color), green(this.color), blue(this.color), alpha );
        point( this.trail[i].x, this.trail[i].y );
      }
    }//end of display()
  
}//end of Fly class
  
  