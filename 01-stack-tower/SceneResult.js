export default class SceneResult extends Phaser.Scene {
    constructor() {
        super({ key: 'SceneResult' });
    }

    init(data) {
        this.score = data.score || 0;
    }

    create() {
        // GA4 tracking
        if (typeof window.gtag === 'function') {
            window.gtag('event', 'game_over', {
                'score': this.score
            });
        }

        // Best score logic
        let bestScore = parseInt(localStorage.getItem('tsumtsum_best_score') || '0', 10);
        let isNewBest = false;
        if (this.score > bestScore) {
            bestScore = this.score;
            localStorage.setItem('tsumtsum_best_score', bestScore);
            isNewBest = true;
        }

        const width = this.cameras.main.width;
        const height = this.cameras.main.height;

        this.add.text(width / 2, height / 3 - 30, 'GAME OVER', {
            fontSize: '64px',
            fontFamily: 'Arial',
            fontStyle: 'bold',
            color: '#ff3366',
            shadow: { offsetX: 3, offsetY: 3, color: '#000000', blur: 10, fill: true }
        }).setOrigin(0.5);

        this.add.text(width / 2, height / 2 - 40, `SCORE: ${this.score}`, {
            fontSize: '48px',
            fontFamily: 'Arial',
            color: '#ffffff'
        }).setOrigin(0.5);

        if (isNewBest && this.score > 0) {
            this.add.text(width / 2, height / 2 + 10, 'NEW BEST!', {
                fontSize: '32px',
                fontFamily: 'Arial',
                fontStyle: 'italic',
                color: '#ffd700'
            }).setOrigin(0.5);
        } else {
            this.add.text(width / 2, height / 2 + 10, `BEST: ${bestScore}`, {
                fontSize: '24px',
                fontFamily: 'Arial',
                color: '#aaaaaa'
            }).setOrigin(0.5);
        }

        const retryBtn = this.add.text(width / 2, height / 2 + 120, 'RETRY', {
            fontSize: '32px',
            fontFamily: 'Arial',
            color: '#00ffcc',
            backgroundColor: '#003333',
            padding: { left: 30, right: 30, top: 15, bottom: 15 }
        }).setOrigin(0.5).setInteractive({ useHandCursor: true });

        this.tweens.add({
            targets: retryBtn,
            scaleX: 1.1,
            scaleY: 1.1,
            duration: 800,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut'
        });

        retryBtn.on('pointerdown', () => {
            this.scene.start('SceneGame');
        });
        
        this.input.keyboard.on('keydown-SPACE', () => {
            this.scene.start('SceneGame');
        });
    }
}
