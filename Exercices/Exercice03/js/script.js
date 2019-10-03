"use strict";

/******************************************************************************
Where's Sausage Dog?
by Dao-Li Leboeuf Roy

An algorithmic version of a Where's Wally/Waldo searching game where you
need to click on the sausage dog you're searching for in amongst all
the visual noise of other animals.

The image of the target is displayed at the top corner of the screen
on the top of a blue rectangle with "Chien perdu" and "Please find me" written.

When the player win, the dog move accross the screen randomly in an ellipse
that change colors and it leaves a trail behind with a wrap effect.

There's 600 decoys animal.

Animal images from:
https://creativenerds.co.uk/freebies/80-free-wildlife-icons-the-best-ever-animal-icon-set/
******************************************************************************/

// Position and image of the sausage dog we're searching for
// and the speed and velocity
let targetX;
let targetY;
let targetImage;
let targetSpeed = 0.5;
let targetVX = 0;
let targetVY = 0;
// Noises variables
let tx = 0;
let ty = 0;

// The ten decoy images
let decoyImage1;
let decoyImage2;
let decoyImage3;
let decoyImage4;
let decoyImage5;
let decoyImage6;
let decoyImage7;
let decoyImage8;
let decoyImage9;
let decoyImage10;

// The number of decoys to show on the screen, randomly
// chosen from the decoy images
let numDecoys = 600;

// Keep track of whether they've won
let gameOver = false;

// The rectangle behind tħe image displaying the target image
// and its caracteristics (position, color, size)
let rectangleX;
let rectangleY;
let rectangleHeight;
let rectangleWidth;
let rectangleColor;

// Target image position for the search icons
let targetXSearch;
let targetYSearch;

// Define the caracteristics for the rectangle below the text "You winned"
let rectangleWinnedX;
let rectangleWinnedY;
let rectangleWinnedHeight;
let rectangleWinnedWidth;
let rectangleWinnedColor;

// preload()
//
// Loads the target and decoy images before the program starts
function preload() {
  targetImage = loadImage("assets/images/animals-target.png");

  decoyImage1 = loadImage("assets/images/animals-01.png");
  decoyImage2 = loadImage("assets/images/animals-02.png");
  decoyImage3 = loadImage("assets/images/animals-03.png");
  decoyImage4 = loadImage("assets/images/animals-04.png");
  decoyImage5 = loadImage("assets/images/animals-05.png");
  decoyImage6 = loadImage("assets/images/animals-06.png");
  decoyImage7 = loadImage("assets/images/animals-07.png");
  decoyImage8 = loadImage("assets/images/animals-08.png");
  decoyImage9 = loadImage("assets/images/animals-09.png");
  decoyImage10 = loadImage("assets/images/animals-10.png");
}

// setup()
//
// Creates the canvas, sets basic modes, draws correct number
// of decoys in random positions, then the target
function setup() {
  createCanvas(windowWidth, windowHeight);
  background("#ffff00");
  imageMode(CENTER);

  // No stroke for a better look
  noStroke();

  // Define the rectangle caracteristics
  rectangleX = 3 / 4 * width;
  rectangleY = 0;
  rectangleHeight = 1 / 6 * height;
  rectangleWidth = 1 / 4 * width;
  rectangleColor = '#4287f5'; // blue color

  // Use a for loop to draw as many decoys as we need
  for (let i = 0; i < numDecoys; i++) {
    // Choose a random location on the canvas for this decoy
    let x = random(0, width);
    let y = random(0, height);
    // Generate a random number we can use for probability
    let r = random();
    // Use the random number to display one of the ten decoy
    // images, each with a 10% chance of being shown
    // We'll talk more about this nice quality of random soon enough.
    // But basically each "if" and "else if" has a 10% chance of being true
    if (r < 0.1) {
      image(decoyImage1, x, y, decoyImage1.width / 2, decoyImage1.height / 2);
    } else if (r < 0.2) {
      image(decoyImage2, x, y, decoyImage2.width / 2, decoyImage2.height / 2);
    } else if (r < 0.3) {
      image(decoyImage3, x, y, decoyImage3.width / 2, decoyImage3.height / 2);
    } else if (r < 0.4) {
      image(decoyImage4, x, y, decoyImage4.width / 2, decoyImage4.height / 2);
    } else if (r < 0.5) {
      image(decoyImage5, x, y, decoyImage5.width / 2, decoyImage5.height / 2);
    } else if (r < 0.6) {
      image(decoyImage6, x, y, decoyImage6.width / 2, decoyImage6.height / 2);
    } else if (r < 0.7) {
      image(decoyImage7, x, y, decoyImage7.width / 2, decoyImage7.height / 2);
    } else if (r < 0.8) {
      image(decoyImage8, x, y, decoyImage8.width / 2, decoyImage8.height / 2);
    } else if (r < 0.9) {
      image(decoyImage9, x, y, decoyImage9.width / 2, decoyImage9.height / 2);
    } else if (r < 1.0) {
      image(decoyImage10, x, y, decoyImage10.width / 2, decoyImage10.height / 2);
    }
  }

  // Once we've displayed all decoys, we choose a random location for the target
  // We acknowledge the place that the rectangle take
  targetX = random(0, rectangleX);
  targetY = random(rectangleHeight, height);

  // Make the rectangle a nice blue color
  fill(rectangleColor);
  // Display the rectangle under the target image search
  // but on the top of the images
  rect(rectangleX, rectangleY, rectangleWidth, rectangleHeight);

  // Define the image position for the search image
  targetXSearch = 7 / 8 * width;
  targetYSearch = 1 / 12 * height;
  // Display the target image at the top corner of the screen
  image(targetImage, targetXSearch, targetYSearch);

  //Prepare the typography for the text in the search icon
  textFont("Helvetica");
  textSize(25);
  textAlign(CENTER, CENTER);
  noStroke();
  fill(255);

  // Tell instructions in the search icon
  // Display 'Chien perdu' over the target search icon
  text('Chien perdu!', targetXSearch, targetYSearch / 4);
  // Display 'Please find me' under the target search icon
  text('Please find me', targetXSearch, targetYSearch * 1.75);
}

// draw()
//
// Displays the game over screen if the player has won,
// otherwise nothing (all the gameplay stuff is in mousePressed())
function draw() {

  // And draw the target image on top of the others
  image(targetImage, targetX, targetY, targetImage.width / 2, targetImage.height / 2);

  if (gameOver) {

    //Put the frame rate lower
    frameRate(40)

    // Rectangle center mode (easier to put below the text)
    rectMode(CENTER)
    // Define the rectangle caracteristics for under the "You winned"
    rectangleWinnedX = width / 2;
    rectangleWinnedY = height / 2;
    rectangleWinnedHeight = 100;
    rectangleWinnedWidth = 500;
    rectangleWinnedColor = (0);
    // Display the rectangle in black
    fill(rectangleWinnedColor)
    rect(rectangleWinnedX, rectangleWinnedY, rectangleWinnedWidth, rectangleWinnedHeight);

    // Prepare our typography
    textFont("Helvetica");
    textSize(random(50, 75));
    textAlign(CENTER, CENTER);
    noStroke();
    fill(random(255), random(255), random(255), 200);

    // Tell them they won!
    text("YOU WINNED!", width / 2, height / 2);

    // Draw a circle around the sausage dog to show where it is (even though
    // they already know because they found it!)
    noFill();
    stroke(random(255), random(255), random(255), 100);
    strokeWeight(10);
    ellipse(targetX, targetY, targetImage.width, targetImage.height);

    // Move the image through the screen when you win
    // Define the velocity
    targetVX += targetSpeed * random(-2, 2);
    targetVY += targetSpeed * random(-2, 2);
    // Make the image move trough the screen
    targetX += targetVX;
    targetY += targetVY;

    // Wrap when the target and the ellipse goes off the canvas
    if (targetX < 0) {
      // Off the left side, so add the width to reset to the right
      targetX = targetX + width;
    } else if (targetX > width) {
      // Off the right side, so subtract the width to reset to the left
      targetX = targetX - width;
    }
    if (targetY < 0) {
      // Off the top, so add the height to reset to the bottom
      targetY = targetY + height;
    } else if (targetY > height) {
      // Off the bottom, so subtract the height to reset to the top
      targetY = targetY - height;
    }
  }
}

// mousePressed()
//
// Checks if the player clicked on the target and if so tells them they won
function mousePressed() {
  // The mouse was clicked!
  // Check if the cursor is in the x range of the target
  // (We're subtracting the image's width/2 because we're using imageMode(CENTER) -
  // the key is we want to determine the left and right edges of the image.)
  if (mouseX > targetX - targetImage.width / 2 && mouseX < targetX + targetImage.width / 2) {
    // Check if the cursor is also in the y range of the target
    // i.e. check if it's within the top and bottom of the image
    if (mouseY > targetY - targetImage.height / 2 && mouseY < targetY + targetImage.height / 2) {
      gameOver = true;
    }
  }
}
