/*var goku;

function setup() {
    createCanvas(800,300);
    
    var img = loadImage("img/goku/DS - Jump Ultimate Stars - Goku SSJ_01.png");
    
    goku = createSprite(400,150);
    goku.addImage(img);
}

function draw() {
    drawSprites();
}*/




//Changing the sprites' animations
//position and transformations: rotation, scale, mirror
//move the mouse and click
//press and hold the up and down keys

var goku, platform;
var onGround;
var gravity;
var kame, punch;

function setup() {
    createCanvas(1000, 400);
    fill(0,0,100);

    //create a sprite and add the 3 animations
    goku = createSprite(500, 150, 70, 70);
    platform = createSprite(500, 300, 500, 500);
    platform.addAnimation("normal","img/platform.png");
    onGround = true;
    kame = false;
    punch = false;
    gravity = 0.5;

    var myAnimation = goku.addAnimation("standing", "img/goku/DS - Jump Ultimate Stars - Goku SSJ_01.png", "img/goku/DS - Jump Ultimate Stars - Goku SSJ_02.png", "img/goku/DS - Jump Ultimate Stars - Goku SSJ_03.png", "img/goku/DS - Jump Ultimate Stars - Goku SSJ_04.png");
    //offX and offY is the distance of animation from the center of the sprite
    //in this case since the animations have different heights i want to adjust
    //the vertical offset to make the transition between floating and moving look better
    myAnimation.offY = 18;

    goku.addAnimation("moving", "img/goku/DS - Jump Ultimate Stars - Goku SSJ_05.png", "img/goku/DS - Jump Ultimate Stars - Goku SSJ_06.png", "img/goku/DS - Jump Ultimate Stars - Goku SSJ_07.png", "img/goku/DS - Jump Ultimate Stars - Goku SSJ_08.png");

    goku.addAnimation("movingFast", "img/goku/DS - Jump Ultimate Stars - Goku SSJ_09.png", "img/goku/DS - Jump Ultimate Stars - Goku SSJ_10.png");

    goku.addAnimation("kamehameha", "img/goku/DS - Jump Ultimate Stars - Goku SSJ_165.png", "img/goku/DS - Jump Ultimate Stars - Goku SSJ_166.png", "img/goku/DS - Jump Ultimate Stars - Goku SSJ_167.png", "img/goku/DS - Jump Ultimate Stars - Goku SSJ_168.png", "img/goku/DS - Jump Ultimate Stars - Goku SSJ_169.png", "img/goku/DS - Jump Ultimate Stars - Goku SSJ_170.png", "img/goku/DS - Jump Ultimate Stars - Goku SSJ_171.png", "img/goku/DS - Jump Ultimate Stars - Goku SSJ_172.png", "img/goku/DS - Jump Ultimate Stars - Goku SSJ_173.png", "img/goku/DS - Jump Ultimate Stars - Goku SSJ_174.png");

    goku.addAnimation("jump", "img/goku/DS - Jump Ultimate Stars - Goku SSJ_17.png", "img/goku/DS - Jump Ultimate Stars - Goku SSJ_18.png", "img/goku/DS - Jump Ultimate Stars - Goku SSJ_16.png", "img/goku/DS - Jump Ultimate Stars - Goku SSJ_14.png");

    goku.addAnimation("punch", "img/goku/DS - Jump Ultimate Stars - Goku SSJ_65.png", "img/goku/DS - Jump Ultimate Stars - Goku SSJ_66.png", "img/goku/DS - Jump Ultimate Stars - Goku SSJ_67.png", "img/goku/DS - Jump Ultimate Stars - Goku SSJ_68.png");

}

function kameTurnOff () {
    
    kame = false;
}
function punchTurnOff () {
    
    punch = false;
}

function draw() {
    background(0, 0, 80);
    goku.velocity.y += gravity;

    if (goku.collide(platform)) {
        goku.velocity.y = 0;
    }

    if (onGround == true) {
        if (keyIsDown(65)) {
            goku.changeAnimation("moving");
            //flip horizontally
            goku.mirrorX(-1);
            //negative x velocity: move left
            goku.velocity.x = -2;
        } else if (keyIsDown(68)) {
            goku.changeAnimation("moving");
            //unflip 
            goku.mirrorX(1);
            goku.velocity.x = 2;
        } else {
            //if close to the mouse, don't move
            goku.changeAnimation("standing");
            goku.velocity.x = 0;
        }

        if (keyIsDown(65) && keyIsDown(16)) {
            goku.changeAnimation("movingFast");
            //flip horizontally
            goku.mirrorX(-1);
            //negative x velocity: move left
            goku.velocity.x = -4;
        } else if (keyIsDown(68) && keyIsDown(16)) {
            goku.changeAnimation("movingFast");
            //unflip 
            goku.mirrorX(1);
            goku.velocity.x = 4;
        }

        if (keyWentDown("w")){
            goku.changeAnimation("jump");
            goku.animation.rewind();
            goku.velocity.y = -10;
        }
        if (keyIsDown(75)) {
            kame = true;
            setTimeout(kameTurnOff,500);
        }
        if (kame==true){
            goku.changeAnimation("kamehameha");
        }

        if (keyIsDown(80)) {
            punch = true;
            setTimeout(punchTurnOff,200);
        }
        if (punch==true){
            goku.changeAnimation("punch");
        }
    }


    //up and down keys to change the scale
    //note that scaling the image quality deteriorates
    //and scaling to a negative value flips the image
    if (keyIsDown(UP_ARROW))
        goku.scale += 0.05;
    if (keyIsDown(DOWN_ARROW))
        goku.scale -= 0.05;

    //draw the sprite
    drawSprites();
}