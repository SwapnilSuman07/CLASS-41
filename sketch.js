var database;
var canvas, gameState = 0, playerCount;
var game, form, player;
var allPlayersInfo;
var car1,car2,car3,car4;
var cars;
var car1Img,car2Img,car3Img,car4Img;
var track;
var lbImage,lb;
var sound;

function preload(){
car1Img = loadImage("images/car1.png");
car2Img = loadImage("images/car2.png");
car3Img = loadImage("images/car3.png");
car4Img = loadImage("images/car4.png");
track = loadImage("images/track.jpg");
lbImage = loadImage("images/leaderboard.png");
sound=loadSound("car-racing.mp3");

}

function setup() {
   canvas=createCanvas(displayWidth-200, displayHeight-250);
    database = firebase.database();
    game = new Game();
    game.getState();
    game.start();

    lb = createSprite(displayWidth/2, -(displayHeight*4 + 30));
    lb.addImage(lbImage);
    lb.scale=0.7;


}

function draw() {
    //background("white");
    

    if(playerCount === 4){
        game.update(1);
    }

    if(gameState === 1){
        game.play();
        sound.play();
    }

    if(gameState === 2){
        game.end();
    }
}

