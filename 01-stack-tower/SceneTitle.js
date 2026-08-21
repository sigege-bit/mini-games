export default class SceneTitle extends Phaser.Scene {
    constructor() {
        super({ key: 'SceneTitle' });
    }

    create() {
        const width = this.cameras.main.width;
        const height = this.cameras.main.height;

        this.add.text(width / 2, height / 3, '積む積む', {
            fontSize: '80px',
            fontFamily: 'Arial, sans-serif',
            fontStyle: 'bold',
            color: '#ffffff',
            shadow: { offsetX: 3, offsetY: 3, color: '#000000', blur: 15, fill: true }
        }).setOrigin(0.5);

        const bestScore = localStorage.getItem('tsumtsum_best_score') || 0;
        this.add.text(width / 2, height / 3 + 80, `BEST SCORE: ${bestScore}`, {
            fontSize: '24px',
            fontFamily: 'Arial',
            color: '#ffd700'
        }).setOrigin(0.5);

        const startBtn = this.add.text(width / 2, height / 2 + 100, 'TAP TO START', {
            fontSize: '32px',
            fontFamily: 'Arial',
            color: '#00ffcc',
            backgroundColor: '#003333',
            padding: { left: 20, right: 20, top: 10, bottom: 10 }
        }).setOrigin(0.5).setInteractive({ useHandCursor: true });

        // Pulsing animation
        this.tweens.add({
            targets: startBtn,
            scaleX: 1.1,
            scaleY: 1.1,
            duration: 800,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut'
        });

        startBtn.on('pointerdown', () => {
            this.scene.start('SceneGame');
        });
        
        this.input.keyboard.on('keydown-SPACE', () => {
            this.scene.start('SceneGame');
        });
    }
}
