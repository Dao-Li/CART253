//Dao-Li leboeuf Roy (40097085)
//
// Exercise 1 - Movement
// Pippin Barr
//
// Starter code for exercise 1.
// Draws a moving square and circle that intersect
// in the middle of the canvas.

// The current position and size of the circle
let circleX;
let circleY;
let circleSize = 100;

// The current position and size of the square
let squareX;
let squareY;
let squareSize = 100;

//The display text, current position and the size of the text
let crossing = "Crossing...";
let crossingX = 0;
let crossingY = 0;
let crossingSize = 50;

// The current position and size of the square that goes under the text
let rectangleX = 0;
let rectangleY = 0;
let rectangleHeight = 60;
let rectangleWidth = 200;

// The image choice, the position and size of the image
let mouse1Image;
let mouseScale = 0.05;
let mouse1X;
let mouse1Y;

// The image choice, the position and size of the image
let waveImage;
let waveScale = .75;
let waveX;
let waveY;

// preload()
//
// Preload of the image mouse

function preload() {
mouse1Image = loadImage('assets/images/mouse.png');
waveImage = loadImage('assets/images/wave.png');
}


// setup()
//
// Set up the canvas, position the images, set the image mode.

function setup() {
  // Create our canvas
  createCanvas(640,640);


  // Start the circle off screen to the bottom left
  // We divide the size by two because we're drawing from the center
  circleX = -circleSize/2;
  circleY = height + circleSize/2;

  // Start the square off screen to the bottom right
  // We divide the size by two because we're drawing from the center
  squareX = width + squareSize/2;
  squareY = height + squareSize/2;

  // Start the text off screen to the center left
  // In X, we remove some pixels to make sure the text start off screen
  crossingX = 0 - 300;
  crossingY = height/2;

  // Start the text off screen to the center left (under the text)
  // We divide the size by two because we're drawing from the center
  // In X, we remove some pixels to make sure the text start off screen
  rectangleX = 0 - rectangleWidth/2 - 20;
  rectangleY = height/2;

  // Start the wave image off the screen at the middle top
  waveX = width/2;
  waveY = 0 - 600;

  // We'll draw rectangles from the center
  rectMode(CENTER);
  //We'll draw the image from the center
  imageMode(CENTER)
  //We'll display the text in Montserrat
  textFont("Montserrat");
  // We won't have a stroke in this
  noStroke();
 // We want a frame Rate slower than default
  frameRate(40)

}


// draw()
//
// Change the circle and square's positions so they move
// Draw the circle and square on screen

function draw() {
  // We don't fill the background so we get a drawing effect

  // Move circle up and to the right
  circleX += 1;
  circleY -= 1;
  // Make the circle transparent red
  fill(255,0,0,10);
  // Display the circle
  ellipse(circleX,circleY,circleSize,circleSize);

  // Move square up and to the left
  squareX -= 1;
  squareY -= 1;
  // Make the square transparent blue
  fill(0,0,255,10);
  // Display the square
  rect(squareX,squareY,squareSize,squareSize);

  // Move the rectangle (under the text) center left to right
  rectangleX += 1;
  // Make the rectangle transparent yellow/orange
  fill(255,174,0,25);
  // Display the rectangle
  rect(rectangleX,rectangleY,rectangleWidth,rectangleHeight);

  // Move the text center left to right
  crossingX += 1.25;
  // Make the text green
  fill(0,255,0);
  // Display the textFont
  text(crossing,crossingX,crossingY);
  textSize(crossingSize);

  // Move the wave image center up to down in zigag
  waveY += 0.75;
  waveX = random (0,500);
  // Display of the wave. We'll have the image of a mouse following the mouse
  image(waveImage,waveX,waveY,waveImage.width * waveScale,waveImage.height * waveScale);

  // the image will follow the mouse
  mouse1X = mouseX
  mouse1Y = mouseY
  // Display of the image. We'll have the image of a mouse following the mouse
  image(mouse1Image,mouse1X,mouse1Y,mouse1Image.width * mouseScale,mouse1Image.height*
     mouseScale);


  }
