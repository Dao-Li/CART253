"use strict";

// Pong
// Modified by Dao-Li leboeuf Roy
//
// A "simple" implementation of Pong. The score is displayed according to the background
// color of each side. It changes color with each point. The left side starts
// with blue and wins when it gets one point afet pink, and the right side starts
// at red and wins when it gets one point after the yellow.

// The player who gets 16 points first win. 

// The ball is the chromatic circle to match the idea of colors.
//
// Up and down keys control the right hand paddle, W and S keys control
// the left hand paddle

// Defining the game state
let gameState = 'Start';

// Game colors (using hexadecimal)
let bgColor = 0;
let fgColor = 255;

// BALL

// A ball object with the properties of
// position, size, velocity, and speed
// And also the image associated to
let ball = {
  x: 0,
  y: 0,
  size: 20,
  vx: 0,
  vy: 0,
  speed: 5,
  image: 0,
  scale: 0.05
}

// PADDLES

// Basic definition of a left paddle object with its key properties of
// position, size, velocity, and speed
let leftPaddle = {
  x: 0,
  y: 0,
  w: 20,
  h: 70,
  vy: 0,
  speed: 5,
  upKey: 87,
  downKey: 83,
  score: 0
}

// RIGHT PADDLE

// Basic definition of a left paddle object with its key properties of
// position, size, velocity, and speed
let rightPaddle = {
  x: 0,
  y: 0,
  w: 20,
  h: 70,
  vy: 0,
  speed: 5,
  upKey: 38,
  downKey: 40,
  score: 0
}

// A variable to hold the sounds in the game
let beepSFX;
let backgroundMusic;

// A variable to hold the images in the game
let scoreInfoImage = {
  left: 0,
  right: 0
}

let endingImage = {
  leftWin: 0,
  rightWin: 0
}

// preload()
//
// Loads the beep audio for the sound of bouncing and background music
function preload() {

  // sounds
  // sound when the ball is bouncing on a paddle or on the side
  beepSFX = new Audio("assets/sounds/beep.wav");
  // https://freesound.org/people/Greek555/sounds/487759/
  backgroundMusic = loadSound("assets/sounds/backgroundMusic.mp3")

  // images
  scoreInfoImage.left = loadImage("assets/images/LeftScoreInfo.png")
  scoreInfoImage.right = loadImage("assets/images/RightScoreInfo.png")
  endingImage.leftWin = loadImage("assets/images/LeftWin.jpg")
  endingImage.rightWin = loadImage("assets/images/RightWin.jpg")
  //https://fr.wix.com/blog/amp/2016/08/01/la-theorie-des-couleurs-appliquee-a-votre-site-internet
  ball.image = loadImage("assets/images/ChromaticCircle.png")
}

// setup()
//
// Creates the canvas, sets up the drawing modes,
// Sets initial values for paddle and ball positions
// and velocities.
function setup() {
  // Create canvas and set drawing modes
  createCanvas(1000, 500);
  noStroke();
  fill(fgColor);

  setupPaddles();
  resetBall();
}

// setupPaddles()
//
// Sets the starting positions of the two paddles
function setupPaddles() {
  // Initialise the left paddle position
  leftPaddle.x = 0 + leftPaddle.w;
  leftPaddle.y = height / 2;

  // Initialise the right paddle position
  rightPaddle.x = width - rightPaddle.w;
  rightPaddle.y = height / 2;
}

// draw()
//
// Calls the appropriate functions to run the game
// See how tidy it looks?!
function draw() {
  // Fill the background with an option to update de score
  displayScoreBackground();
  displayInfoScoreImages();

  if (gameState === 'Start') {
    // Otherwise we display the message to start the game
    displayStartMessage();
  } else if (gameState === 'Playing') {
    // set up the background music of the game
    setupBackgroundMusic();
    // If the game is in play, we handle input and move the elements around
    handleInput(leftPaddle);
    handleInput(rightPaddle);
    updatePaddle(leftPaddle);
    updatePaddle(rightPaddle);
    updateBall();

    checkBallWallCollision();
    checkBallPaddleCollision(leftPaddle);
    checkBallPaddleCollision(rightPaddle);
    checkWinning();

    // Check if the ball went out of bounds and respond if so
    // (Note how we can use a function that returns a truth value
    // inside a conditional!)
    if (ballIsOutOfBounds()) {
      // If it went off either side, reset it
      resetBall();
      // This is where we would likely count points, depending on which side
      // the ball went off...
    }
  }

  // We always display the paddles and ball so it looks like Pong!
  // Except when someone win
  displayPaddle(leftPaddle);
  displayPaddle(rightPaddle);
  displayBall();


  if (gameState === 'LeftWin') {
    showLeftWinning();
  }
  if (gameState === 'RightWin') {
    showRightWinning();
  }
}

// displayScoreBackground()
//
// Change the color according to the score
function displayScoreBackground() {
  // Draw from the Corner
  rectMode(CORNER);
  // Left side
  // Start with blue color and become toward pink with more points
  fill(17 * leftPaddle.score, 0, 255, 175);
  // Display on the left side of the screen
  rect(0, 0, width / 2, height);

  // Right side
  // Start with red color and become toward yellow with more points
  fill(255, 17 * rightPaddle.score, 0);
  // Display on the right side of the screen
  rect(width / 2, 0, width / 2, height);

  // Fill other forms in black
  fill(0);
  rectMode(CENTER);
}

// displayInfoScoreImages()
//
// A function to help the player to keep track of their score
function displayInfoScoreImages() {
  // Display the images from the center
  imageMode(CENTER);

  // Left side
  // Display the image at the top left of the screen
  image(scoreInfoImage.left, 1 / 4 * width, height / 10);

  // Right side
  // Display the image at the top right of the screen
  image(scoreInfoImage.right, 3 / 4 * width, height / 10);
}

// displayStartMessage()
//
// Shows a message about how to start the game
function displayStartMessage() {
  push();
  textAlign(CENTER, CENTER);
  textSize(60);
  // The text should be approximately at the center of the screen
  // but not exactly, because I want the ball to be in the center of the 'o'
  text("CLICK TO START", width / 2 - 12, height / 2 + 5);
  pop();
}

// setupBackgroundMusic()
//
// Set up the background Music that plays when the game is active
function setupBackgroundMusic() {
  // play on loop and only once at a time
  backgroundMusic.loop();
  backgroundMusic.playMode("untilDone")
}

// handleInput()
//
// Checks the mouse and keyboard input to set the velocities of the
// left and right paddles respectively.
function handleInput(paddle) {
  // Move the paddle based on its up and down keys
  // If the up key is being pressed
  if (keyIsDown(paddle.upKey)) {
    // Move up
    paddle.vy = -paddle.speed;
  }
  // Otherwise if the down key is being pressed
  else if (keyIsDown(paddle.downKey)) {
    // Move down
    paddle.vy = paddle.speed;
  } else {
    // Otherwise stop moving
    paddle.vy = 0;
  }
}

// updatePositions()
//
// Sets the positions of the paddles and ball based on their velocities
function updatePaddle(paddle) {
  // Update the paddle position based on its velocity
  paddle.y += paddle.vy;
}

// updateBall()
//
// Sets the position of the ball based on its velocity
function updateBall() {
  // Update the ball's position based on velocity
  ball.x += ball.vx;
  ball.y += ball.vy;
}

// checkWinning()
//
// Check if a player won
function checkWinning() {
  if (rightPaddle.score > 15) {
    gameState = 'RightWin';
  }
  if (leftPaddle.score > 15) {
    gameState = 'LeftWin';
  }
}

// ballIsOutOfBounds()
//
// Checks if the ball has gone off the left or right
// Returns true if so, false otherwise
function ballIsOutOfBounds() {
  // Check for ball going of the left side
  if (ball.x < 0) {
    // add score to the right side
    rightPaddle.score += 1
    return true;
  }
  // Check for ball going of the right side
  else if (ball.x > width) {
    // add score to the left side
    leftPaddle.score += 1
    return true;
  } else {
    return false;
  }
}

// checkBallWallCollision()
//
// Check if the ball has hit the top or bottom of the canvas
// Bounce off if it has by reversing velocity
// Play a sound
function checkBallWallCollision() {
  // Check for collisions with top or bottom...
  if (ball.y < 0 || ball.y > height) {
    // It hit so reverse velocity
    ball.vy = -ball.vy;
    // Play our bouncing sound effect by rewinding and then playing
    beepSFX.currentTime = 0;
    beepSFX.play();
  }
}

// checkBallPaddleCollision(paddle)
//
// Checks for collisions between the ball and the specified paddle
function checkBallPaddleCollision(paddle) {
  // VARIABLES FOR CHECKING COLLISIONS

  // the ball size equal the width of the image of the ball
  ball.size = ball.image.width * ball.scale
  // We will calculate the top, bottom, left, and right of the
  // paddle and the ball to make our conditionals easier to read...
  let ballTop = ball.y - ball.size / 2;
  let ballBottom = ball.y + ball.size / 2;
  let ballLeft = ball.x - ball.size / 2;
  let ballRight = ball.x + ball.size / 2;

  let paddleTop = paddle.y - paddle.h / 2;
  let paddleBottom = paddle.y + paddle.h / 2;
  let paddleLeft = paddle.x - leftPaddle.w / 2;
  let paddleRight = paddle.x + paddle.w / 2;

  // First check the ball is in the vertical range of the paddle
  if (ballBottom > paddleTop && ballTop < paddleBottom) {
    // Then check if it is touching the paddle horizontally
    if (ballLeft < paddleRight && ballRight > paddleLeft) {
      // Then the ball is touching the paddle
      // Reverse its vx so it starts travelling in the opposite direction
      ball.vx = -ball.vx;
      // Play our bouncing sound effect by rewinding and then playing
      beepSFX.currentTime = 0;
      beepSFX.play();
    }
  }
}

// displayPaddle(paddle)
//
// Draws the specified paddle
function displayPaddle(paddle) {
  // Draw the paddles
  rect(paddle.x, paddle.y, paddle.w, paddle.h);
}

// displayBall()
//
// Draws the ball on screen as a square
function displayBall() {
  // Draw the ball
  image(ball.image, ball.x, ball.y, ball.image.width * ball.scale, ball.image.height * ball.scale)
  // When it start the ball should go to the right
}

// resetBall()
//
// Sets the starting position and velocity of the ball
function resetBall() {
  // Make the ball goes to the side that get the last win point
  if (ball.x < 0) {
    // The ball goes off to the left so the ball should go to the right and be random
    ball.vx = random(ball.speed * 1.5, ball.speed);
  } else if (ball.x > width) {
    // The ball goes off to the right so the ball should go to the left and be random
    ball.vx = random(-ball.speed, -ball.speed * 1.5);
  } else {
    // The ball should be random between left or right at start using an array
    // I want the speed to be the same
    let ballSpeed = [-ball.speed, ball.speed];
    ball.vx = random(ballSpeed);
  }

  // Initialise the ball's position and velocity
  // Make the ball start at the center of the screen
  ball.x = width / 2;
  ball.y = height / 2;

  // The ball should have a random velocity
  // Use array to have choice between -ball.speed * 2 to ball speed * 2, but
  // without the number between -ball.speed/2 and ball.speed/2,
  // because the ball goes to much straight
  let speedRandom = [random(-ball.speed * 1.2, -ball.speed / 2), random(ball.speed / 2, ball.speed * 1.2)]
  ball.vy = random(speedRandom);
}

// showLeftWinning
//
// Display an image that tells the left player won
function showLeftWinning() {
  image(endingImage.leftWin, width / 2, height / 2);
}

// showRightWinning
//
// Display an image that tells the right player won
function showRightWinning() {
  image(endingImage.rightWin, width / 2, height / 2);
}

// mousePressed()
//
// Here to require a click to start playing the game
// Which will help us be allowed to play audio in the browser
function mousePressed() {
  gameState = 'Playing';
}
