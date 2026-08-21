import SceneTitle from './SceneTitle.js';
import SceneGame from './SceneGame.js';
import SceneResult from './SceneResult.js';

const config = {
    type: Phaser.AUTO,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        parent: 'game-container',
        width: 600,
        height: 800
    },
    backgroundColor: '#1a1a2e',
    scene: [SceneTitle, SceneGame, SceneResult]
};

const game = new Phaser.Game(config);
