/*

Please Refer to README.md for Detailed Credits

*/

let config = {
    type: Phaser.AUTO,
    width: 1060,
    height: 753,
    scene: [Menu, Play, Death ]
}

let game = new Phaser.Game(config);

//reserve keyboard vars
let keySPACE, keyR;

//UI sizes set-up
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;
