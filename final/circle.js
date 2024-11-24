/*
* Prescott Lau
* November 23rd 2024
*
* This is the class for all the Circles. 
*/

class Circle
{

    //constructor takes in x & y values.
    constructor(x,y)
    {
        this.x = x;
        this.y = y;
        this.r = random(20,50); //sets radius to be a random number from 20 to 50
        this.xVel = random(-1,1); //xVelocity randomly set from -1 to 1
        this.yVel = random(-2, 2); //yVelocity randomly set from -2 to 2
    }


    /*
    * This is the update() function.
    * It updates the circles so that they move around the screen!
    */
    update()
    {
        this.x += this.xVel;
        this.y += this.yVel;

        if( (this.x <= (0 + this.r) ) || ( this.x >= (width - this.r) )  )
        {
            this.xVel *= -1;
        }

        if( (this.y <= (0 + this.r) ) || ( this.y >= (height - this.r) )  )
        {
            this.yVel *= -1;
        }
    }


    /*
    * This is the display() function.
    * It tells the sketch how to draw these individual circles.
    */
    display()
    {
        noStroke();
        fill(255, 255, 255, 150);
        ellipse( this.x, this.y, this.r * 2 );
    }

}