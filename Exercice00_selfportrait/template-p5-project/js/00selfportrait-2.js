/*****************

Title of Project
Author Name

This is a template. You must fill in the title,
author, and this description to match your project!

******************/

// preload()
//
// Description of preload

function preload() {

}


// setup()
//
// Description of setup

function setup() {

  // Set up the canvas and give it a yellow/orange (color)
  createCanvas(500,500);
  background(255,183,0);
  noStroke()

  //Hair section
  //***Hair black color and a little bit below the 'shoulder'
  fill(0)
  ellipse(250,250,275,350)
  rectMode(CENTER);
  rect(250,355,275,180);
  //***A.brownish shading at the bottom of the hair
  //seeing through (up) to opaque color (down)
    //A.1Define colors
  let from = color (56, 35, 3, 100);
  let to = color(56, 35, 3);
  let interA = lerpColor(from,to,0.125);
  let interB = lerpColor(from,to,0.25);
  let interC = lerpColor(from,to,0.375);
  let interD = lerpColor(from,to,0.5);
  let interE = lerpColor(from,to,0.625);
  let interF = lerpColor(from,to,0.75);
  let interG = lerpColor(from,to,0.875);
    //A.2rectangles up to down to create a gradient
  fill(from); rect(250,275,275,20);
  fill(interA); rect(250,295,275,20);
  fill(interB); rect(250,315,275,20);
  fill(interC); rect(250,335,275,20);
  fill(interD); rect(250,355,275,20);
  fill(interE); rect(250,375,275,20);
  fill(interF); rect(250,395,275,20);
  fill(interG); rect(250,415,275,20);
  fill(to); rect(250,435,275,20);

  //clothing section
  //***White shirt

  //Head section
  //***neck
  fill(255,220,161);
  rect(250,370,100,70);
  //***Head shape with yellowish skin color
  stroke(0);
  ellipse(250,240,200,250);
  //***Ears
  noStroke();
  ellipse(145,245,30,60);
  ellipse(355,245,30,60);
  //***Nose triangle shape in really light pink-skin color
  fill(255, 237, 227);
  triangle(250,235,230,280,270,280);
  //***smiling open mouth with light pink-red contour
  fill(255);
  stroke(250, 175, 175);
  strokeWeight(3.5);
  arc(250,300,80,50,0,PI, CHORD);
  //***B.slanting eyes with black pupil
    //B.1 white background eye
  noStroke();
  ellipse(207,225,55,18);
  ellipse(293,225,55,18);
    //B.1 pupil black
  fill(0);
  ellipse(207,225,20,17);
  ellipse(293,225,20,17);
  //B.2 eyelid (top/non-'hide')
  noFill()
  stroke(0,0,0,100)
  strokeWeight(0.5)
  arc(202,223,65,18,PI+0.2,0,OPEN)
  arc(298,223,65,18,PI,0-0.5,OPEN)
  //Eyebrows
  stroke(0,0,0,220)
  strokeWeight(6)
  arc(205,210,65,18,PI+0.2,0-0.5,OPEN)
  arc(294,210,65,18,PI+0.2,0-0.5,OPEN)


}


// draw()
//
// Description of draw()

function draw() {

}
