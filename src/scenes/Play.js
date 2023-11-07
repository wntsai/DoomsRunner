class Play extends Phaser.Scene{
    constructor(){
        super("playScene");
    }

    preload(){
        //load images & tile sprites
        this.load.image('standing', './assets/stand.png');
        this.load.image('death', './assets/death.png');
        this.load.image('obstacle', './assets/obstacle.png');
        this.load.image('back', './assets/background.png');
        this.load.audio('backgroundmusic', './assets/runnermusic.mp3')
        //load spritesheet
        //this.load.spritesheet('explosion', './assets/explosion.png', {frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame: 9});
    }

    create(){
        this.add.text(20,20, "Doomsday Runner");

        //place tile sprite
        this.back = this.add.tileSprite(0, 0, 1060, 760, 'back').setOrigin(0,0);
        
        //green UI background
        this.add.rectangle(0, borderUISize + borderPadding, game.config.width, borderUISize * 2, 0xFFFFFF).setOrigin(0,0);
        //white borders
        this.add.rectangle(0, 0, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(0, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);
    
        //add runner sprite (p1)
        this.p1Runner = new Runner(this, 40, 0, 'standing').setOrigin(0, 0);
        this.p1Runner.setScale(2, 2);
        
        //add obstacle
        this.obstacle = new Obstacle(this, game.config.width + borderUISize * 6, borderUISize * 4, 'obstacle', 0, 30).setOrigin(0,-18.5);

        //define keys
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        //initialize score
        this.p1Score = 0;
        
        //**initalize audio**
        this.backgroundMusic = this.sound.add('backgroundmusic', {
            loop: true
        });
        this.backgroundMusic.play;
        //this.sound.loop=true
        

        //display score
        let scoreConfig = {
            fontFamily: 'Georgia',
            fontSize: '28px',
            backgroundColor: '#666699',
            color: '#ffffff',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100
        }
        //declares Score box
        this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding * 2, this.p1Score, scoreConfig);

        //GAME OVER FLAG
        this.gameOver = false;
        //60s Play Clock
        scoreConfig.fixedWidth = 0;
        this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
            this.add.text(game.config.width / 2, game.config.height / 2, 'GAME OVER', scoreConfig).setOrigin(0.5);
            //this.sound.pause('background');
            this.add.text(game.config.width / 2, game.config.height / 2 + 64, 'Press (R) to Restart', scoreConfig).setOrigin(0.5);
            this.gameOver = true;
            //this.sound.pause('background');
            this.back.tilePositionX = 0;
        }, null, this);
    }

    update(){
        //check key input for restart
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)){
            this.scene.restart();
        }

        if (this.gameOver) {
            this.scene.start("Death");
            this.sound.pause('background');
          }

        this.back.tilePositionX -=3;

        //GAME OVER CONDITIONAL
        if(!this.gameOver){
            this.p1Runner.update(); //updates rocket sprite
            this.obstacle.update();   //updates obstacle
        }

        //colllision checker
        if(this.checkCollision(this.p1Runner, this.obstacle)){
            this.p1Runner.reset();
            this.obstacleExplode(this.obstacle);
        }
        

    }
    checkCollision(rocket, obstacle){
        //simple AABB checking
        if(rocket.x < obstacle.x + obstacle.width && rocket.x + rocket.width > obstacle.x && rocket.y < obstacle.y + obstacle.height && rocket.height + rocket.y > obstacle.y){
            return true; 
        } else{
            return false;
        }
    }

    obstacleExplode(obstacle){
        //temporarily hide obstacle
        obstacle.alpha = 0;
        //collision
        let boom = this.add.sprite(obstacle.x, obstacle.y, 'death').setOrigin(0, 0);
        //score add and repaint    
        this.p1Score += obstacle.points;
        this.scoreLeft.text = this.p1Score;

        this.sound.play('death');
    }
}