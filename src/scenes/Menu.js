class Menu extends Phaser.Scene{
    constructor(){
        super("menuScene");
    }

    preload(){
        //load audio
        this.load.audio('menumusic', './assets/MenuMusic.mp3');
        this.load.audio('backgroundmusic', './assets/runnermusic.mp3');
        this.load.audio('death', './assets/wah.wav');
        this.load.audio('running', './assets/running.mp3');
        this.load.audio('jump', './assets/jump.mp3');
        this.load.audio('obstaclespawn', './assets/obstaclespawn.mp3');
    }

    create(){
        let menuConfig = {
            fontFamily: 'Georgia',
            fontSize: '28px',
            backgroundColor: '#666699',
            color: '#ffffff',
            align: 'center',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
    }

    //show menu text
    this.add.text(game.config.width / 2, game.config.height / 2 - borderUISize - borderPadding, 'Doomsday Runner', menuConfig).setOrigin(0.5);
    this.add.text(game.config.width / 2, game.config.height / 2, 'Use Space Bar to Jump over Obstacles', menuConfig).setOrigin(0.5);
    menuConfig.backgroundColor = '#000';
    menuConfig.color = '#054784';
    this.add.text(game.config.width / 2, game.config.height / 2 + borderUISize + borderPadding, 'Space Bar to Start', menuConfig).setOrigin(0.5);
    
    //define keys
    keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
}

    update(){
        if(Phaser.Input.Keyboard.JustDown(keySPACE)){
            //start game
            game.settings = {
                obstaclespeed: 3,
                gameTimer: 60000
            }
            this.sound.play('backgroundmusic');
            this.scene.start('playScene');
        }
}

}