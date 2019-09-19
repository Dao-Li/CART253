/*****************

Self-Portrait
Dao-Li Leboeuf Roy

Exercise 0 - Spiritual Self-Portrait
Draw a head using shape and color

******************/

// preload()
//
// Description of preload

function preload() {

}


// setup()
//
// Draw a self-portrait of an Asian girl

function setup() {

  // Set up the canvas and give it a yellow/orange (color)
  createCanvas(500,500);
  background(255,183,0);
  noStroke();


  //clothing section
  //***S.White shirt (effect hair on the top)
  rectMode(CENTER);
  fill(255);
    //S.1 Shirt below the hair
  rect(250,430,390,75);
    //S.2 Shoulders
  ellipse(145,390,180,80);
  ellipse(355,390,180,80);
    //S.3 Arms (line indicating the arm)
  stroke(40);
    line(135,425,135,467 );
    line(365,425,365,467);


  //Hair section
  //***Hair black color and a little bit below the 'shoulder'
  noStroke();
  fill(0);
  ellipse(250,225,275,350);
  rect(250,320,275,180);
  //***A.brownish shading at the bottom of the hair
  //seeing through (up) to opaque color (down)
    //C.1Define colors
  let from = color (56, 35, 3, 100);
  let to = color(56, 35, 3);
  let interA = lerpColor(from,to,0.125);
  let interB = lerpColor(from,to,0.25);
  let interC = lerpColor(from,to,0.375);
  let interD = lerpColor(from,to,0.5);
  let interE = lerpColor(from,to,0.625);
  let interF = lerpColor(from,to,0.75);
  let interG = lerpColor(from,to,0.875);
    //C.2rectangles up to down to create a gradient
  fill(from); rect(250,225,275,20);
  fill(interA); rect(250,255,275,20);
  fill(interB); rect(250,275,275,20);
  fill(interC); rect(250,295,275,20);
  fill(interD); rect(250,315,275,20);
  fill(interE); rect(250,335,275,20);
  fill(interF); rect(250,355,275,20);
  fill(interG); rect(250,375,275,20);
  fill(to); rect(250,397,275,25);


//***S.Shirt section (CONTINUE)
  //S.4 Center of the shirt (below the neck,over back hair)
  fill(255);
  rect(250,400,100,100);


  //Head section
  //***neck
  fill(255,220,161);
  rect(250,330,100,60);
  ellipse(250,360,100,70);
  //***Head shape with yellowish skin color
  stroke(0);
  ellipse(250,215,200,250);
  //***Ears
  noStroke();
  ellipse(145,220,30,60);
  ellipse(355,220,30,60);
  //***Nose triangle shape in really light pink-skin color
  fill(255, 237, 227);
  triangle(250,210,230,255,270,255);
  //***smiling open mouth with light pink-red contour
  fill(255);
  stroke(250, 175, 175);
  strokeWeight(3.5);
  arc(250,275,80,50,0,PI, CHORD);

  //***E.slanting eyes with black pupil
    //E.1 white-ish background eye
  noStroke();
  fill(245)
  ellipse(207,200,55,18);
  ellipse(293,200,55,18);
    //E.1 pupil black
  fill(0);
  ellipse(207,200,20,17);
  ellipse(293,200,20,17);
    //E.2 Eye glow white in the pupil
  fill(255)
  ellipse(208,199,5);
  ellipse(293,199,5);
  ellipse(206,195,2);
  ellipse(294,195,2);
    //E.3 eyelid (top/non-'hide')
  noFill();
  stroke(0,0,0,100);
  strokeWeight(0.5);
  arc(202,198,65,18,PI+0.2,0,OPEN);
  arc(298,198,65,18,PI,0-0.5,OPEN);

  //***Eyebrows
  stroke(0,0,0,220);
  strokeWeight(6);
  arc(205,185,65,18,PI+0.2,0-0.5,OPEN);
  arc(294,185,65,18,PI+0.2,0-0.5,OPEN);
  //***Beauty marks
  noStroke();
  fill(0,0,0,70);
  ellipse(340,240,3);
  ellipse(320,260,2);
  ellipse(300,220,2);
  ellipse(270,150,1);
  ellipse(230,320,2);
  ellipse(190,240,1);



}


// draw()
//
// no function for now

function draw() {

}
