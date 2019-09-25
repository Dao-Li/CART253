/******************************************************

Game - The Artful Dodger
Dao-Li Leboeuf (40097085)

Modification of a simple dodging game with keyboard controls
The dodge game now display the number of successful dodges at the bottom.
Now the enemy's size and speed both also change if the player win.
They both are reset if the player loses.

******************************************************/

// The position and scale of our avatar image (cat)
let cat;
let avatarX;
let avatarY;
let avatarScale = 0.05;

// The speed and velocity of our avatar
let avatarSpeed = 10;
let avatarVX = 0;
let avatarVY = 0;

// The position and scale of the enemy image (lion)
let lion;
let enemyX;
let enemyY;
let enemyScale = 0.05;

// The speed and velocity of our enemy circle
let enemySpeed = 3;
let enemyVX = 5;

// How many dodges the player has made
let dodges = 0;

// The text displaying the number of successful dodges and its properties
let successfulDodges;
let lemonMilk;
let successfulDodgesX = 0;
let successfulDodgesY = 0;

// The rectangle (below text) position and size
let rectangle;
let rectangleWidth;
let rectangleHeight;
let rectangleX;
let rectangleY;


// Background (jungle image), its position and its scale
let jungle;
let jungleX;
let jungleY;
let jungleScale = 0.2;

// preload()
// preload of images and font

function preload() {
  lemonMilk = loadFont("assets/text/LemonMilk.otf");
  cat = loadImage("assets/images/cat.png")
  lion = loadImage("assets/images/lion.png")
  jungle = loadImage("assets/images/jungle.jpg")
}

// setup()
//
// Make the canvas, position the avatar and anemy
function setup() {
  // Create our playing area
  createCanvas(500,500);

  // Put the avatar in the centre
  avatarX = width/2;
  avatarY = height/2;

  // Put the background in the middle
  jungleX = width/2;
  jungleY = height/2;

  // We want to have LemonMilk font and bold and a big large size
  textFont(lemonMilk);
  textStyle(BOLD);
  textSize(25);
  // We want the text at the bottom right corner of the screen
  successfulDodgesX = width/1.7;
  successfulDodgesY = height/1.1;

  // Put the enemy to the left at a random y coordinate within the canvas
  enemyX = 0;
  enemyY = random(0,height);

  // Draw the images from the center
  imageMode(CENTER)
  // Draw the text from the center
  textAlign(CENTER,CENTER)
  // Draw the rectangle from the center
  rectMode(CENTER)
  // No stroke so it looks cleaner
  noStroke();
}

// draw()
//
// Handle moving the avatar and enemy and checking for dodges and
// game over situations.
function draw() {
  // A jungle as a background
  image(jungle,jungleX,jungleY, jungle.width * jungleScale, jungle.height *jungleScale);

  // Default the avatar's velocity to 0 in case no key is pressed this frame
  avatarVX = 0;
  avatarVY = 0;

  // Check which keys are down and set the avatar's velocity based on its
  // speed appropriately

  // Left and right
  if (keyIsDown(LEFT_ARROW)) {
    avatarVX = -avatarSpeed;
  }
  else if (keyIsDown(RIGHT_ARROW)) {
    avatarVX = avatarSpeed;
  }

  // Up and down (separate if-statements so you can move vertically and
  // horizontally at the same time)
  if (keyIsDown(UP_ARROW)) {
    avatarVY = -avatarSpeed;
  }
  else if (keyIsDown(DOWN_ARROW)) {
    avatarVY = avatarSpeed;
  }

  // Move the avatar according to its calculated velocity
  avatarX = avatarX + avatarVX;
  avatarY = avatarY + avatarVY;

  // The enemy always moves at enemySpeed
  enemyVX = enemySpeed;
  // Update the enemy's position based on its velocity
  enemyX = enemyX + enemyVX;

  // Check if the enemy and avatar overlap - if they do the player loses
  // We do this by checking if the distance between the centre of the enemy
  // and the centre of the avatar is less that their combined radii, because both image are circles.
  if (dist(enemyX,enemyY,avatarX,avatarY) < (lion.height*enemyScale)/2 + (cat.height*avatarScale)/2) {
    // Tell the player they lost
    console.log("YOU LOSE!");
    // Reset the enemy's position
    enemyX = 0;
    enemyY = random(0,height);
    // Reset the avatar's position
    avatarX = width/2;
    avatarY = height/2;
    // Reset the dodge counter
    dodges = 0;
    // Reset the enemy size
    enemyScale = 0.05;
    // Reset the enemy speed
    enemySpeed = 3;
  }

  // Check if the avatar has gone off the screen (cheating!)
  if (avatarX < 0 || avatarX > width || avatarY < 0 || avatarY > height) {
    // If they went off the screen they lose in the same way as above.
    console.log("YOU LOSE!");
    enemyX = 0;
    enemyY = random(0,height);
    avatarX = width/2;
    avatarY = height/2;
    dodges = 0;
    enemyScale = 50;
    enemySpeed = 4;
  }

  // Check if the enemy has moved all the way across the screen
  if (enemyX > width) {
    // This means the player dodged so update its dodge statistic
    dodges = dodges + 1;
    // Tell them how many dodges they have made
    console.log(dodges + " DODGES!");
    // Reset the enemy's position to the left at a random height
    enemyX = 0;
    enemyY = random(0,height);
    // The enemy size should increase
    enemyScale += 0.005;
    // The enemy speed should increase too
    enemySpeed += 0.5;
  }

  // Display the number of successful dodges in the console
  console.log(dodges);

  // Draw the player as a cat
  image(cat,avatarX,avatarY, cat.width * avatarScale, cat.height *avatarScale);

  // Draw the enemy as a lion
  image(lion,enemyX,enemyY, lion.width * enemyScale, cat.height *enemyScale);

  // We want a black semi-transparent rectangle
  fill(0,0,0,150)
  // We want the rectangle at the same place than the text
  //After observation, the position in Y needs some adjustment
  let rectangleX = successfulDodgesX;
  let rectangleY = successfulDodgesY + 3;
  // Display rectangle below the text so it makes it more visible
  let rectangleWidth = 340;
  let rectangleHeight = 30;
  rect(rectangleX,rectangleY,rectangleWidth,rectangleHeight)

  // We want to display the number of successful dodges
  successfulDodges = "SUCCESSFUL dodge(s): " + dodges;
  // The text is in white
  fill(255);
  // Display the text
  text(successfulDodges,successfulDodgesX,successfulDodgesY);


}
