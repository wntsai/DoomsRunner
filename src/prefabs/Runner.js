//Runner prefab
class Runner extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, texture, frame){
        super(scene, x, y, texture, frame);

        //add object to existing scene
        scene.add.existing(this);
        this.isFiring = false;
        this.moveSpeed = 4;
        this.sfxjump = scene.sound.add('jump'); //add jump sfx
    }

    update(){
        //check for input to jump
        if(!this.isFiring){
            if(keySPACE.isDown && this.x >= borderUISize + this.width){
                this.y -= this.moveSpeed;
            }
        }
        //fjump check input
        if(Phaser.Input.Keyboard.JustDown(keySPACE) && !this.isFiring){
            this.isFiring = true;
            this.sfxjump.play();  //play sfx
        }
        //jump mechanic
        if(this.isFiring && this.y >= borderUISize + 3 + borderPadding){
                this.y -= this.moveSpeed;
        }
        //back to ground
        if(this.y <= borderUISize * 8 + (borderPadding* 2)){
           this.isFiring = false;
           this.y = game.config.height - borderUISize - borderPadding;
        }
    }
    
    reset(){
        this.isFiring = false;
        this.y = game.config.height - borderUISize - borderPadding;
    }
}
