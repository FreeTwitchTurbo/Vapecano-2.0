var game = new Phaser.Game(800, 600, Phaser.AUTO, 'game', { preload: preload, create: create, update: update });

var guyWidth = 90;
var guyHeight = 90;
var guyNumFrames = 20;
var character1;
var character2;
var playerGroup;

var bullets;
var fireButton;
var bulletTime = 0;
var bullet;
var directionX = -150;
var directionY = 0;
var angle = 180;


var directionX2 = -150;
var directionY2 = 0;
var angle2 = 180;

var fireButton2;
var bulletTime2 = 0;

var bullets2;
var bullet2;

var hitC1;
var hitC2;

var hitbox1;
var hitbox2;

var bulletSpeed = 150;

var bulletX1 = -30;
var bulletY1 = 0;

var bulletX2 = -30;
var bulletY2 = 0;

function setupCharacter(game, x, y) {
    var character = game.add.sprite(x, y, 'guy');

    character.anchor.setTo(0.5, 0.5);

    game.add.existing(character);

    var right = character.animations.add('right', [5,6,7,8,9], 12, true);
    var idleRight = character.animations.add('rightIdle', [9], 12, false);

    var left = character.animations.add('left', [0,1,2,3,4], 12, true);
    var idleLeft = character.animations.add('leftIdle', [0], 12, false);

    var up = character.animations.add('up', [10,11,12,13,14], 12, true);
    var idleUp = character.animations.add('upIdle', [10], 12, false);

    var down = character.animations.add('down', [15,16,17,18,19], 12, true);
    var idleDown = character.animations.add('downIdle', [15], 12, false);

    left.enableUpdate = true;
    right.enableUpdate = true;

    game.physics.enable(character, Phaser.Physics.ARCADE);

    character.body.collideWorldBounds = true;
    //sets collision box
    character.body.setSize(38,20,20,10);
    
    playerGroup.add(character);

    return character;

};  

function preload() {
    game.load.spritesheet('guy', 'assets/zeldaspritesheet.png', guyWidth , guyHeight , guyNumFrames);
    game.load.image('background', 'assets/backg.png');
    game.load.image('bullet', 'assets/knife.png');
    game.load.image('hitbox1', 'assets/hitbox1.png');
    game.load.image('hitbox2', 'assets/hitbox2.png');

}

function create() {
    game.stage.backgroundColor ='#4dc3ff';

    // Create background and world bound.
    game.world.setBounds(0, 0, 800, 600);
    
    playerGroup = this.game.add.group();

    character2 = setupCharacter(game, 200, 300);
    character1 = setupCharacter(game, 600, 300);
    
    bullets = game.add.physicsGroup();
    bullets.createMultiple(5, 'bullet', false);
    bullets.setAll('checkWorldBounds', true);
    bullets.setAll('outOfBoundsKill', true);
    
    bullets2 = game.add.physicsGroup();
    bullets2.createMultiple(5, 'bullet', false);
    bullets2.setAll('checkWorldBounds', true);
    bullets2.setAll('outOfBoundsKill', true);


    hitbox1 = game.add.sprite(character1.x, character1.y, 'hitbox1'); 
    hitbox2 = game.add.sprite(character2.x, character2.y, 'hitbox2'); 
    hitbox1.anchor.setTo(0.5, 0.5);
    hitbox2.anchor.setTo(0.5, 0.5);
    game.physics.enable([hitbox1, hitbox2], Phaser.Physics.ARCADE);
    
    fireButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    fireButton2 = game.input.keyboard.addKey(Phaser.Keyboard.F);
    
    hitbox1.alpha = 0;
    hitbox2.alpha = 0;


    cursors = game.input.keyboard.createCursorKeys();
    
    
}   

    

function update() {

    if (fireButton.isDown)
    {
        fireBullet();
    }
        
    if (fireButton2.isDown)
    {
        fireBullet2();
    }

    if (cursors.left.isDown)
    {
        character1.body.velocity.x = -100;
        character1.play('left');
        directionX = -bulletSpeed;
        directionY = 0;
        angle = 180;
        bulletX1 = -30;
        bulletY1 = 0;
    }
    else if (cursors.right.isDown)
    {
        character1.body.velocity.x = 100;
        character1.play('right');
        directionX = bulletSpeed;
        directionY = 0;
        angle = 0;
        bulletX1 = 30;
        bulletY1 = 0;
    }
    else if (cursors.up.isDown)
    {
        character1.body.velocity.y = -100;
        character1.play('up');
        directionX = 0;
        directionY = -bulletSpeed;  
        angle = 270;
        bulletX1 = 0;
        bulletY1 = -40;   
    }
    else if (cursors.down.isDown)
    {
        character1.body.velocity.y = 100;
        character1.play('down');
        directionX = 0;
        directionY = bulletSpeed;
        angle = 90;
        bulletX1 = 0;
        bulletY1 = 40;
   
    }
    else
    { 
        var nextIdle;

        if (character1.body.velocity.x < 0)
            nextIdle = "leftIdle";
        else if (character1.body.velocity.x > 0)
            nextIdle = "rightIdle"
        else if (character1.body.velocity.y < 0)
            nextIdle = "upIdle"
        else if(character1.body.velocity.y > 0)
            nextIdle = "downIdle"
        else 
            nextIdle = null;

        if (nextIdle != null)
            character1.play(nextIdle);

        character1.body.velocity.set(0);

        
        
    }
    
    game.physics.arcade.collide(character1, character2);
    
    
    var w = game.input.keyboard.addKey(Phaser.Keyboard.W);
    var a = game.input.keyboard.addKey(Phaser.Keyboard.A);
    var s = game.input.keyboard.addKey(Phaser.Keyboard.S);
    var d = game.input.keyboard.addKey(Phaser.Keyboard.D);
    

    if (a.isDown)
    {
        character2.body.velocity.x = -100;
        character2.play('left');
        directionX2 = -100;
        directionY2 = 0;
        angle2 = 180;
        bulletX2 = -30;
        bulletY2 = 0;
    }
    else if (d.isDown)
    {
        character2.body.velocity.x = 100;
        character2.play('right');
        directionX2 = bulletSpeed;
        directionY2 = 0;  
        angle2 = 0;   
        bulletX2 = 30;
        bulletY2 = 0;
    }
    else if (w.isDown)
    {
        character2.body.velocity.y = -100;
        character2.play('up');
        directionX2 = 0;
        directionY2 = -bulletSpeed;  
        angle2 = 270;
        bulletX2 = 0;
        bulletY2 = -40;
    }
    else if (s.isDown)
    {
        character2.body.velocity.y = 100;
        character2.play('down');
        directionX2 = 0;
        directionY2 = bulletSpeed;
        angle2 = 90;
        bulletX2 = 0;
        bulletY2 = 40; 
    }
    else
    {
        if (character2.body.velocity.x < 0)
            nextIdle = "leftIdle";
        else if (character2.body.velocity.x > 0)
            nextIdle = "rightIdle"
        else if (character2.body.velocity.y < 0)
            nextIdle = "upIdle"
        else if(character2.body.velocity.y > 0)
            nextIdle = "downIdle"
        else 
            nextIdle = null;

        if (nextIdle != null)
            character2.play(nextIdle);

        character2.body.velocity.set(0);   
    }
      //change depth by y position, player sprite with greater y will be on the topper layer
        playerGroup.sort('y', Phaser.Group.SORT_ASCENDING);
    game.physics.arcade.overlap(bullet, hitbox2, hitC2, null, this);
    game.physics.arcade.overlap(bullet2, hitbox1, hitC1, null, this); 
    hitbox1.body.position.y = character1.y - 31;
    hitbox2.body.position.y = character2.y - 31;
    hitbox1.body.position.x = character1.x - 19;
    hitbox2.body.position.x = character2.x - 19;
}

function fireBullet () {

    if (game.time.time > bulletTime)
    {
        bullet = bullets.getFirstExists(false);

        if (bullet)
        {
            bullet.reset(character1.x + bulletX1, character1.y + bulletY1);
            bullet.body.velocity.x = directionX;
            bullet.body.velocity.y = directionY;
            bullet.angle = angle;
            bullet.anchor.setTo(0.5, 0.5);

            bulletTime = game.time.time + 250;
        }
    }
    
}

function fireBullet2 () {

    if (game.time.time > bulletTime2)
    {
        bullet2 = bullets2.getFirstExists(false);

        if (bullet2)
        {
            bullet2.reset(character2.x + bulletX2, character2.y + bulletY2);
            bullet2.body.velocity.x = directionX2;
            bullet2.body.velocity.y = directionY2;
            bullet2.angle = angle2;
            bullet2.anchor.setTo(0.5, 0.5);

            bulletTime2 = game.time.time + 250;
        }
    }
    
}

function hitC1 (bullet2, hitbox1) {
    character1.kill();
    hitbox1.kill();
    bullet2.kill();
}

function hitC2 (bullet, hitbox2) {
    character2.kill();
    hitbox2.kill();
    bullet.kill();
}