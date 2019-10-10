"use strict";

/******************************************************

Game - Chaser
Modified by Dao-Li Leboeuf Roy;

A "simple" game of cat and mouse but with gargamel and smurfs instead.
The player (Gargamel) can move with keys to overlap the
(randomly moving according to Noise perlin) smurf to catch it.
Each time it catch one, it fuels his hope and gives him Hope. Gargamel "dies"
slowly over time, because of losing hope, so he has to keep catching smurf to stay alive.

- You are gargamel.
Your goal is to catch smurfs to turn them into gold to have enough money to buy a wig.
It has been a long time since you wanted one and didn't have the money to do so.
It takes 20 smurfs to win. The number of smurf caught is displayed on the screen. -

The smurf displayed is random between a selection of 10.

There's a suspense music as a background and a awkward evil laughing
that sounds like a growl when the player catch a smurf.

Includes: Physics-based movement, keyboard controls, Hope/stamina,
random movement (Perlin noise), screen wrap.

******************************************************/

// Track at what point the game is
// 1 === display the context and instructions
// 2 === when the game is active
// 3 === when the player won
// 4 === when the player lost
let game = 1; // start the game on the instructions

// playerGargamel (player) position, size, velocity
let playerGargamelX;
let playerGargamelY;
let playerGargamelscale = 0.3;
let playerGargamelVX = 0;
let playerGargamelVY = 0;
let playerGargamelMaxSpeed = 4;
// playerGargamel Hope
let playerGargamelHope;
let playerGargamelMaxHope = 255;
// playerGargamel image to display
let playerGargamelLeftImage;
let playerGargamelRightImage;
let playerGargamelImage;

// smurf (prey) position, size, velocity, noise time
let smurfX;
let smurfY;
let smurfscale = 0.2;
let smurfVX;
let smurfVY;
let smurfMaxSpeed = 4;
let smurfNoiseTx;
let smurfNoiseTy;
// smurf Hope
let smurfHope;
let smurfMaxHope = 100;
// smurf images to display
let smurfImage1;
let smurfImage2;
let smurfImage3;
let smurfImage4;
let smurfImage5;
let smurfImage6;
let smurfImage7;
let smurfImage8;
let smurfImage9;
let smurfImage10;
// Display a random smurf each time
let randomSmurf;

// Amount of Hope obtained per frame of "eating" (overlapping) the smurf
let eatHope = 10;
// Number of smurf eaten during the game (the "score")
let smurfCaught = 0;

// Define the background and its scale
let smurfBackgroundImage;
let backgroundScale = 0.75;
// Define the instruction image
let instructionImage;
// Define the winning image
let winningImage;

// Audio variables
let backgroundMusic;
let evilLaugh;

// Preload
//
//add preload function to load the assets images and sound
function preload() {

  //sounds
  // https://www.bensound.com/royalty-free-music/3
  backgroundMusic = loadSound("assets/sounds/bensound-evolution.mp3");
  //
  evilLaugh = loadSound("assets/sounds/laugh.wav");

  // Images
  // Smurf images
  // 1 : https://www.stickpng.com/fr/img/films/dessins-animes/les-schtroumpfs/schtroumpf-maladroit-se-cogne-a-un-rocher
  smurfImage1 = loadImage("assets/images/smurf1.png");
  // 2 : https://www.pinclipart.com/pindetail/iiJmJwi_free-png-papa-smurf-png-smurfs-the-lost/
  smurfImage2 = loadImage("assets/images/smurf2.png");
  // 3 : http://www.pngall.com/smurfs-png/download/33570
  smurfImage3 = loadImage("assets/images/smurf3.png");
  // 4 : http://www.pngall.com/smurfs-png/download/33591
  smurfImage4 = loadImage("assets/images/smurf4.png");
  // 5 : http://www.pngall.com/smurfs-png/download/33571
  smurfImage5 = loadImage("assets/images/smurf5.png");
  // 6 : http://www.pngall.com/smurfs-png/download/33577
  smurfImage6 = loadImage("assets/images/smurf6.png");
  // 7 : http://www.pngall.com/smurfs-png/download/33579
  smurfImage7 = loadImage("assets/images/smurf7.png");
  // 8 : http://www.pngall.com/smurfs-png/download/33581
  smurfImage8 = loadImage("assets/images/smurf8.png");
  // 9 : http://www.pngall.com/smurfs-png/download/33587
  smurfImage9 = loadImage("assets/images/smurf9.png");
  // 10 : http://www.pngall.com/smurfs-png/download/33573
  smurfImage10 = loadImage("assets/images/smurf10.png");
  //
  // Gargamel image
  // https://pngimage.net/gargamel-png-5/
  playerGargamelLeftImage = loadImage("assets/images/gargamelLeft.png");
  playerGargamelRightImage = loadImage("assets/images/gargamelRight.png");
  //
  // Background image
  // https://www.artstation.com/artwork/k2Og0
  smurfBackgroundImage = loadImage("assets/images/smurfBackground.jpg");
  //
  // Instructions
  instructionImage = loadImage("assets/images/instructions.jpg");
  //
  // Winning image
  winningImage = loadImage("assets/images/winning.jpg");
}

// setup()
//
// Sets up the basic elements of the game
function setup() {
  createCanvas(800, 500);

  noStroke();

  // We're using simple functions to separate code out
  setupsmurf();
  setupplayerGargamel();
  setupSound();
}

// setupsmurf()
//
// Initialises smurf's position, velocity, and Hope
function setupsmurf() {
  smurfX = width / 5;
  smurfY = height / 2;
  smurfVX = -smurfMaxSpeed;
  smurfVY = smurfMaxSpeed;
  smurfHope = smurfMaxHope;
  smurfNoiseTx = random(0, width);
  smurfNoiseTy = random(0, height);
  // Draw image from center
  imageMode(CENTER);
  // Choice a random smurf
  randomSmurf = random(0, 1);
}

// setupplayerGargamel()
//
// Initialises playerGargamel position and Hope
function setupplayerGargamel() {
  playerGargamelX = 4 * width / 5;
  playerGargamelY = height / 2;
  playerGargamelHope = playerGargamelMaxHope;
  // Draw by default to the left
  playerGargamelImage = playerGargamelLeftImage;
  // Draw image from center
  imageMode(CENTER);
}

// setup the background sound, with light volume and in loop
function setupSound() {
  backgroundMusic.play();
  backgroundMusic.setVolume(0.7);
  backgroundMusic.loop();
}

// draw()
//
// Before the game start display the instruction
// While the game is active, checks input
// updates positions of smurf and playerGargamel,
// checks Hope (dying), checks catching (overlaps)
// displays the two agents.
// When the game is over, shows the game over screen if losing and
// game winning image if winning.
function draw() {

  if (game === 1) {
    showInstructions();
  } else if (game === 2) {
    setBackground()
    displayNumberAndText()
    handleInput();

    movePlayerGargamel();
    movesmurf();

    updateHope();
    checkCatching();

    drawsmurf();
    drawplayerGargamel();
  } else if (game === 3) {
    showWinning();
  } else if (game === 4) {
    showGameOver();
  }
}

// showInstructions
//
// Introduction about the game and some instructions
function showInstructions() {
  // display the image show the instruction
  image(instructionImage, width / 2, height / 2, instructionImage.width, instructionImage.height);
  // check if the player press the enter key
  if (keyIsDown(ENTER)) {
    game = 2;
  }
}

// setBackground()
//
// Set the background with a smurf background landscape
function setBackground() {
  // Put light tin in red to show hatred in the player (Gargamel) mind and with small
  // transparency so when the gargamel or the smurf go fast there's a small trail
  tint(255, random(255), 0, 127);
  // Display the background
  image(smurfBackgroundImage, width / 2, height / 2, smurfBackgroundImage.width * backgroundScale, smurfBackgroundImage.height * backgroundScale);
}

// displayNumberAndText()
//
// A function that display the number of hope left and the number of smurf caught
function displayNumberAndText() {
  // Define the properties of the text
  fill(255);
  textSize(50);
  textAlign(CENTER, CENTER);
  // display the number of smurf caught
  let numberAndText = smurfCaught + " SMURF(S) CAUGHT\n"
  // display the number of hope left
  numberAndText = numberAndText + "HOPE : " + playerGargamelHope
  // display the text
  text(numberAndText, width / 2, height / 2);
}

// handleInput()
//
// Checks arrow keys and adjusts playerGargamel velocity accordingly
function handleInput() {
  // Check for horizontal movement
  if (keyIsDown(LEFT_ARROW)) {
    playerGargamelVX = -playerGargamelMaxSpeed;
  } else if (keyIsDown(RIGHT_ARROW)) {
    playerGargamelVX = playerGargamelMaxSpeed;
  } else {
    playerGargamelVX = 0;
  }

  // Check for if the character goes left or right
  if (keyIsDown(LEFT_ARROW)) {
    // draw the player to the left
    playerGargamelImage = playerGargamelLeftImage;
  } else if (keyIsDown(RIGHT_ARROW)) {
    // draw the player to the left
    playerGargamelImage = playerGargamelRightImage;
  }

  // Check for vertical movement
  if (keyIsDown(UP_ARROW)) {
    playerGargamelVY = -playerGargamelMaxSpeed;
  } else if (keyIsDown(DOWN_ARROW)) {
    playerGargamelVY = playerGargamelMaxSpeed;
  } else {
    playerGargamelVY = 0;
  }

  // Check if the player pressed shift. If yes, give the ability to sprint.
  if (keyIsDown(SHIFT)) {
    // Give speed to the player Gargamel, but reduce Hope
    playerGargamelMaxSpeed = 7;
    playerGargamelHope -= 3;
  } else {
    // Reset to the initial values
    playerGargamelMaxSpeed = 4;
    playerGargamelHope -= 0.5;
  }
}

// movePlayerGargamel()
//
// Updates playerGargamel position based on velocity,
// wraps around the edges.
function movePlayerGargamel() {
  // Update position
  playerGargamelX = playerGargamelX + playerGargamelVX;
  playerGargamelY = playerGargamelY + playerGargamelVY;

  // Wrap when playerGargamel goes off the canvas
  if (playerGargamelX < 0) {
    // Off the left side, so add the width to reset to the right
    playerGargamelX = playerGargamelX + width;
  } else if (playerGargamelX > width) {
    // Off the right side, so subtract the width to reset to the left
    playerGargamelX = playerGargamelX - width;
  }

  if (playerGargamelY < 0) {
    // Off the top, so add the height to reset to the bottom
    playerGargamelY = playerGargamelY + height;
  } else if (playerGargamelY > height) {
    // Off the bottom, so subtract the height to reset to the top
    playerGargamelY = playerGargamelY - height;
  }
}

// updateHope()
//
// Reduce the playerGargamel's Hope (happens every frame)
// Check if the playerGargamel is dead
function updateHope() {
  // Reduce playerGargamel Hope
  playerGargamelHope = playerGargamelHope - 0.5;
  // Constrain the result to a sensible range
  playerGargamelHope = constrain(playerGargamelHope, 0, playerGargamelMaxHope);
  // Check if the playerGargamel is dead (0 Hope)
  if (playerGargamelHope === 0) {
    // If so, the game is over
    game = 4; // 4 represents that the game is over
  }
}

// checkEating()
//
// Check if the playerGargamel overlaps the smurf and updates Hope of both
function checkCatching() {
  // Get distance of playerGargamel to smurf
  let d = dist(playerGargamelX, playerGargamelY, smurfX, smurfY);
  // Check if it's an overlap. Addition each image * their scale and divide them by two to
  if (d < (playerGargamelLeftImage.width * playerGargamelscale) / 2 + (smurfImage1.width * smurfscale) / 2) {
    // Increase the playerGargamel Hope, because he gains hope
    playerGargamelHope = playerGargamelHope + eatHope;
    // Constrain to the possible range
    playerGargamelHope = constrain(playerGargamelHope, 0, playerGargamelMaxHope);
    // Reduce the smurf Hope
    smurfHope = smurfHope - eatHope;
    // Constrain to the possible range
    smurfHope = constrain(smurfHope, 0, smurfMaxHope);
    // play an evil laugh sound, because the player is evil and happy
    // only play it in mode untilDone so it won't play again and again
    evilLaugh.play();
    evilLaugh.playMode('untilDone');

    // Make the player Gargamel a little bit bigger,
    // because his hope in his soul actually makes him bigger.
    playerGargamelscale += 0.002;

    // Check if the smurf died (Hope 0)
    if (smurfHope === 0) {
      // Choice a random smurf
      randomSmurf = random(0, 1);
      // Move the "new" smurf to a random position
      smurfX = random(0, width);
      smurfY = random(0, height);
      // Give it full Hope
      smurfHope = smurfMaxHope;
      // Track how many smurf were eaten
      smurfCaught = smurfCaught + 1;

      // Check if gargamel catched 20 smurf. If so the player won.
      if (smurfCaught > 19) {
        game = 3;
      }
    }
  }
}

// movesmurf()
//
// Moves the smurf based on random velocity changes
function movesmurf() {
  // Change the smurf's velocity at random intervals
  // random() will be < 0.02 2% of the time, so the smurf
  // will change direction on 2% of frames
  if (random() < 0.02) {
    // Set velocity based on random values to get a new direction
    // and speed of movement
    //
    // Use map() to convert from the 0-1 range of the random() function
    // to the appropriate range of velocities for the smurf
    smurfVX = map(noise(smurfNoiseTx), 0, 1, -smurfMaxSpeed, smurfMaxSpeed);
    smurfVY = map(noise(smurfNoiseTy), 0, 1, -smurfMaxSpeed, smurfMaxSpeed);
    smurfNoiseTx += 5;
    smurfNoiseTy += 5;
  }

  // Update smurf position based on velocity
  smurfX = smurfX + smurfVX;
  smurfY = smurfY + smurfVY;

  // Screen wrapping
  if (smurfX < 0) {
    smurfX = smurfX + width;
  } else if (smurfX > width) {
    smurfX = smurfX - width;
  }

  if (smurfY < 0) {
    smurfY = smurfY + height;
  } else if (smurfY > height) {
    smurfY = smurfY - height;
  }
}

// drawsmurf()
//
// Draw the prey smurf with a random smurf image with full opacity
function drawsmurf() {
  // Make the smurf full opacity
  tint(255, 255);
  // Each smurf has 10% chance to be displayed on the screen
  if (randomSmurf < 0.1) {
    image(smurfImage1, smurfX, smurfY, smurfImage1.width * smurfscale, smurfImage1.height * smurfscale);
  } else if (randomSmurf < 0.2) {
    image(smurfImage2, smurfX, smurfY, smurfImage1.width * smurfscale, smurfImage1.height * smurfscale);
  } else if (randomSmurf < 0.3) {
    image(smurfImage3, smurfX, smurfY, smurfImage1.width * smurfscale, smurfImage1.height * smurfscale);
  } else if (randomSmurf < 0.4) {
    image(smurfImage4, smurfX, smurfY, smurfImage1.width * smurfscale, smurfImage1.height * smurfscale);
  } else if (randomSmurf < 0.5) {
    image(smurfImage5, smurfX, smurfY, smurfImage1.width * smurfscale, smurfImage1.height * smurfscale);
  } else if (randomSmurf < 0.6) {
    image(smurfImage6, smurfX, smurfY, smurfImage1.width * smurfscale, smurfImage1.height * smurfscale);
  } else if (randomSmurf < 0.7) {
    image(smurfImage7, smurfX, smurfY, smurfImage1.width * smurfscale, smurfImage1.height * smurfscale);
  } else if (randomSmurf < 0.8) {
    image(smurfImage8, smurfX, smurfY, smurfImage1.width * smurfscale, smurfImage1.height * smurfscale);
  } else if (randomSmurf < 0.9) {
    image(smurfImage9, smurfX, smurfY, smurfImage1.width * smurfscale, smurfImage1.height * smurfscale);
  } else if (randomSmurf < 1.1) {
    image(smurfImage10, smurfX, smurfY, smurfImage1.width * smurfscale, smurfImage1.height * smurfscale);
  }
}

// drawplayerGargamel()
//
// Draw the playerGargamel with a picture of Gargamel display the image with alpha value based on Hope
function drawplayerGargamel() {
  tint(255, playerGargamelHope);
  image(playerGargamelImage, playerGargamelX, playerGargamelY,
    playerGargamelLeftImage.width * playerGargamelscale, playerGargamelLeftImage.height * playerGargamelscale);
}

// showWinning
//
// Display an image saying that you won!
function showWinning() {
  // display the image telling the play he or she won
  image(winningImage, width / 2, height / 2, winningImage.width, winningImage.height);
  // check if the enter is pressed
  if (keyIsDown(ENTER)) {
    // reset the values
    restartGame();
    // restart the game
    game = 2;
  }
}

// showGameOver()
//
// Display text about the game being over!
function showGameOver() {
  //set a background
  background(0);
  // Set up the font
  textSize(40);
  textAlign(CENTER, CENTER);
  fill(255);
  textFont('MONTSERRAT');
  // Set up the text to display
  let gameOverText = "GAME OVER\n\n"; // \n means "new line"
  gameOverText = gameOverText + "You caught " + smurfCaught + " smurf(s)\n";
  gameOverText = gameOverText + "before you died of hopelessness.\n";
  gameOverText = gameOverText + "PRESS ENTER TO TRY AGAIN";
  // Display it in the centre of the screen
  text(gameOverText, width / 2, height / 2);
  // check if the enter is pressed
  if (keyIsDown(ENTER)) {
    // reset the values
    restartGame();
    // restart the game
    game = 2;
  }
}

// function restartGame
function restartGame() {
  // player
  playerGargamelMaxHope = 255;
  playerGargamelscale = 0.3;
  playerGargamelVX = 0;
  playerGargamelVY = 0;
  playerGargamelMaxSpeed = 4;
  setupplayerGargamel();
  // smurf
  smurfCaught = 0;
  smurfscale = 0.2;
  smurfMaxSpeed = 4;
  smurfMaxHope = 100;
  setupsmurf();
}
