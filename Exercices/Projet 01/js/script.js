"use strict";

/******************************************************

Game - Chaser
Modified by Dao-Li Leboeuf Roy;

A "simple" game of cat and mouse. The player (Gargamel) can move with keys
to overlap the (randomly moving according to Noise perlin) smurf to catch it.
Each time it catch one, it fuels his hope and gives him health. Gargamel "dies"
slowly over time, because of losing hope, so he has to keep catching smurf to stay alive.

Includes: Physics-based movement, keyboard controls, health/stamina,
random movement (Perlin noise), screen wrap.

******************************************************/

// Track whether the game is over
let gameOver = false;

// playerGargamel (player) position, size, velocity
let playerGargamelX;
let playerGargamelY;
let playerGargamelscale = 0.3;
let playerGargamelVX = 0;
let playerGargamelVY = 0;
let playerGargamelMaxSpeed = 2.5;
// playerGargamel health
let playerGargamelHealth;
let playerGargamelMaxHealth = 255;
// playerGargamel image to display
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
// smurf health
let smurfHealth;
let smurfMaxHealth = 100;
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

// Amount of health obtained per frame of "eating" (overlapping) the smurf
let eatHealth = 10;
// Number of smurf eaten during the game (the "score")
let smurfEaten = 0;

// Define the background and its scale
let smurfBackgroundImage;
let backgroundScale = 0.75;

// Preload
//
//add preload function to load the assets images and sound
function preload() {

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
  playerGargamelImage = loadImage("assets/images/gargamel.png");
  //
  // Background image
  // https://www.artstation.com/artwork/k2Og0
  smurfBackgroundImage = loadImage("assets/images/smurfBackground.jpg");
}

// setup()
//
// Sets up the basic elements of the game
function setup() {
  createCanvas(500, 500);

  noStroke();

  // We're using simple functions to separate code out
  setupsmurf();
  setupplayerGargamel();
}

// setupsmurf()
//
// Initialises smurf's position, velocity, and health
function setupsmurf() {
  smurfX = width / 5;
  smurfY = height / 2;
  smurfVX = -smurfMaxSpeed;
  smurfVY = smurfMaxSpeed;
  smurfHealth = smurfMaxHealth;
  smurfNoiseTx = random(0, width);
  smurfNoiseTy = random(0, height);
  // Draw image from center
  imageMode(CENTER)
  // Choice a random smurf
  randomSmurf = random(0,1);
}

// setupplayerGargamel()
//
// Initialises playerGargamel position and health
function setupplayerGargamel() {
  playerGargamelX = 4 * width / 5;
  playerGargamelY = height / 2;
  playerGargamelHealth = playerGargamelMaxHealth;
  // Draw image from center
  imageMode(CENTER)
}

// draw()
//
// While the game is active, checks input
// updates positions of smurf and playerGargamel,
// checks health (dying), checks eating (overlaps)
// displays the two agents.
// When the game is over, shows the game over screen.
function draw() {
  setBackground()

  if (!gameOver) {
    handleInput();

    movePlayerGargamel();
    movesmurf();

    updateHealth();
    checkEating();

    drawsmurf();
    drawplayerGargamel();
  } else {
    showGameOver();
  }
}

// setBackground
//
// Set the background with a smurf background landscape
function setBackground() {
  // Put light tin in red to show hatred in the player (Gargamel) mind and with small
  // transparency so when the gargamel or the smurf go fast there's a small trail
  tint(255, random(255), 0, 127);
  // Display the background
  image(smurfBackgroundImage, width / 2, height / 2, smurfBackgroundImage.width * backgroundScale, smurfBackgroundImage.height * backgroundScale);
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
    // Give speed to the player Gargamel, but reduce health
    playerGargamelMaxSpeed = 6;
    playerGargamelHealth -= 3;
  } else {
    // Reset to the initial values
    playerGargamelMaxSpeed = 2.5;
    playerGargamelHealth -= 0.5;
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

// updateHealth()
//
// Reduce the playerGargamel's health (happens every frame)
// Check if the playerGargamel is dead
function updateHealth() {
  // Reduce playerGargamel health
  playerGargamelHealth = playerGargamelHealth - 0.5;
  // Constrain the result to a sensible range
  playerGargamelHealth = constrain(playerGargamelHealth, 0, playerGargamelMaxHealth);
  // Check if the playerGargamel is dead (0 health)
  if (playerGargamelHealth === 0) {
    // If so, the game is over
    gameOver = true;
  }
}

// checkEating()
//
// Check if the playerGargamel overlaps the smurf and updates health of both
function checkEating() {
  // Get distance of playerGargamel to smurf
  let d = dist(playerGargamelX, playerGargamelY, smurfX, smurfY);
  // Check if it's an overlap. Addition each image * their scale and divide them by two to
  if (d < (playerGargamelImage.width * playerGargamelscale) / 2 + (smurfImage1.width * smurfscale) / 2) {
    // Increase the playerGargamel health
    playerGargamelHealth = playerGargamelHealth + eatHealth;
    // Constrain to the possible range
    playerGargamelHealth = constrain(playerGargamelHealth, 0, playerGargamelMaxHealth);
    // Reduce the smurf health
    smurfHealth = smurfHealth - eatHealth;
    // Constrain to the possible range
    smurfHealth = constrain(smurfHealth, 0, smurfMaxHealth);

    // Check if the smurf died (health 0)
    if (smurfHealth === 0) {
      // Choice a random smurf
      randomSmurf = random(0,1)
      // Move the "new" smurf to a random position
      smurfX = random(0, width);
      smurfY = random(0, height);
      // Give it full health
      smurfHealth = smurfMaxHealth;
      // Track how many smurf were eaten
      smurfEaten = smurfEaten + 1;
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
  tint(255, 255)
  // Each smurf has 10% chance to be displayed on the screen
  if (randomSmurf < 0.1) {
    image(smurfImage1, smurfX, smurfY, smurfImage1.width * smurfscale, smurfImage1.height * smurfscale);
  } else if (randomSmurf < 0.2) {
    image(smurfImage2, smurfX, smurfY, smurfImage1.width * smurfscale, smurfImage1.height * smurfscale);
  }
  else if (randomSmurf < 0.3) {
    image(smurfImage3, smurfX, smurfY, smurfImage1.width * smurfscale, smurfImage1.height * smurfscale);
  }
  else if (randomSmurf < 0.4) {
    image(smurfImage4, smurfX, smurfY, smurfImage1.width * smurfscale, smurfImage1.height * smurfscale);
  }
  else if (randomSmurf < 0.5) {
    image(smurfImage5, smurfX, smurfY, smurfImage1.width * smurfscale, smurfImage1.height * smurfscale);
  }
  else if (randomSmurf < 0.6) {
    image(smurfImage6, smurfX, smurfY, smurfImage1.width * smurfscale, smurfImage1.height * smurfscale);
  }
  else if (randomSmurf < 0.7) {
    image(smurfImage7, smurfX, smurfY, smurfImage1.width * smurfscale, smurfImage1.height * smurfscale);
  }
  else if (randomSmurf < 0.8) {
    image(smurfImage8, smurfX, smurfY, smurfImage1.width * smurfscale, smurfImage1.height * smurfscale);
  }
  else if (randomSmurf < 0.9) {
    image(smurfImage9, smurfX, smurfY, smurfImage1.width * smurfscale, smurfImage1.height * smurfscale);
  }
  else if (randomSmurf < 1.1) {
    image(smurfImage10, smurfX, smurfY, smurfImage1.width * smurfscale, smurfImage1.height * smurfscale);
  }
}


// drawplayerGargamel()
//
// Draw the playerGargamel with a picture of Gargamel with alpha value based on health
function drawplayerGargamel() {
  tint(255, playerGargamelHealth);
  image(playerGargamelImage, playerGargamelX, playerGargamelY,
    playerGargamelImage.width * playerGargamelscale, playerGargamelImage.height * playerGargamelscale);
}

// showGameOver()
//
// Display text about the game being over!
function showGameOver() {
  //set a background
  background(255)
  // Set up the font
  textSize(32);
  textAlign(CENTER, CENTER);
  fill(0);
  // Set up the text to display
  let gameOverText = "GAME OVER\n"; // \n means "new line"
  gameOverText = gameOverText + "You catched " + smurfEaten + " smurf(s)\n";
  gameOverText = gameOverText + "before you died of hopelessness."
  // Display it in the centre of the screen
  text(gameOverText, width / 2, height / 2);
}
