export default class SceneGame extends Phaser.Scene {
    constructor() {
        super({ key: 'SceneGame' });
    }

    create() {
        this.width = this.cameras.main.width;
        this.height = this.cameras.main.height;

        // Settings
        this.blockHeight = 40;
        this.initialWidth = 300;
        this.perfectTolerance = 3;
        this.moveSpeed = 300; // Initial speed
        this.maxSpeed = 800;  // Max speed to prevent it from becoming impossible
        
        this.score = 0;
        this.combo = 0; // Combo counter
        this.hue = Math.floor(Math.random() * 360); // Random starting hue
        this.stack = [];
        this.isGameOver = false;

        this.stackContainer = this.add.container(0, 0);

        this.scoreText = this.add.text(20, 20, 'Score: 0', {
            fontSize: '32px',
            fontFamily: 'Arial',
            color: '#ffffff'
        }).setDepth(100);

        const startY = this.height - this.blockHeight / 2 - 100;
        this.currentY = startY;
        this.currentWidth = this.initialWidth;
        
        const baseBlock = this.add.rectangle(
            this.width / 2,
            this.currentY,
            this.currentWidth,
            this.blockHeight,
            this.getColor()
        );
        this.stackContainer.add(baseBlock);
        this.stack.push(baseBlock);

        this.spawnBlock();

        this.input.on('pointerdown', this.placeBlock, this);
        this.input.keyboard.on('keydown-SPACE', this.placeBlock, this);
    }

    getColor() {
        const color = Phaser.Display.Color.HSLToColor(this.hue / 360, 0.8, 0.6);
        return color.color;
    }

    playSound(type) {
        if (!this.audioCtx) {
            this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        }
        if (this.audioCtx.state === 'suspended') {
            this.audioCtx.resume();
        }

        const osc = this.audioCtx.createOscillator();
        const gain = this.audioCtx.createGain();
        osc.connect(gain);
        gain.connect(this.audioCtx.destination);

        const now = this.audioCtx.currentTime;

        if (type === 'place') {
            osc.type = 'sine';
            osc.frequency.setValueAtTime(300, now);
            osc.frequency.exponentialRampToValueAtTime(150, now + 0.1);
            gain.gain.setValueAtTime(0.3, now);
            gain.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
            osc.start(now);
            osc.stop(now + 0.1);
        } else if (type === 'perfect') {
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(600, now);
            osc.frequency.setValueAtTime(800, now + 0.05);
            gain.gain.setValueAtTime(0.3, now);
            gain.gain.linearRampToValueAtTime(0, now + 0.15);
            osc.start(now);
            osc.stop(now + 0.15);
        } else if (type === 'gameover') {
            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(200, now);
            osc.frequency.exponentialRampToValueAtTime(50, now + 0.5);
            gain.gain.setValueAtTime(0.3, now);
            gain.gain.linearRampToValueAtTime(0, now + 0.5);
            osc.start(now);
            osc.stop(now + 0.5);
        }
    }

    spawnBlock() {
        this.hue = (this.hue + 25) % 360; // More dramatic color shift
        this.currentY -= this.blockHeight;

        const startX = (this.stack.length % 2 === 0) ? -this.currentWidth : this.width + this.currentWidth;
        const targetX = (this.stack.length % 2 === 0) ? this.width + this.currentWidth : -this.currentWidth;

        this.movingBlock = this.add.rectangle(
            startX,
            this.currentY,
            this.currentWidth,
            this.blockHeight,
            this.getColor()
        );
        this.stackContainer.add(this.movingBlock);

        const distance = Math.abs(targetX - startX);
        const duration = (distance / this.moveSpeed) * 1000;

        this.blockTween = this.tweens.add({
            targets: this.movingBlock,
            x: targetX,
            duration: duration,
            yoyo: true,
            repeat: -1,
            ease: 'Linear'
        });
    }

    showCombo(x, y) {
        if (this.combo < 2) return;

        const comboText = this.add.text(x, y, `${this.combo} COMBO!`, {
            fontSize: '32px',
            fontFamily: 'Arial',
            fontStyle: 'bold',
            color: '#ffdd00',
            stroke: '#ff0000',
            strokeThickness: 4
        }).setOrigin(0.5);

        this.stackContainer.add(comboText);

        this.tweens.add({
            targets: comboText,
            y: y - 50,
            alpha: 0,
            duration: 800,
            ease: 'Cubic.easeOut',
            onComplete: () => {
                comboText.destroy();
            }
        });
    }

    placeBlock() {
        if (this.isGameOver) return;

        this.blockTween.stop();

        const previousBlock = this.stack[this.stack.length - 1];
        
        const moveX = this.movingBlock.x;
        const prevX = previousBlock.x;
        
        const diff = moveX - prevX;
        const absDiff = Math.abs(diff);

        if (absDiff <= this.perfectTolerance) {
            // Perfect stack
            this.movingBlock.x = prevX;
            this.cameras.main.shake(100, 0.01);
            this.combo++;
            this.playSound('perfect');
            this.addScore();
            this.showCombo(this.movingBlock.x, this.currentY);
            this.finalizePlacement(this.movingBlock);
        } else if (absDiff < this.currentWidth) {
            // Overhang (cut block)
            this.combo = 0; // Reset combo
            this.playSound('place');
            const newWidth = this.currentWidth - absDiff;
            
            const placedX = prevX + (diff / 2);
            this.movingBlock.destroy(); 
            
            const placedBlock = this.add.rectangle(
                placedX,
                this.currentY,
                newWidth,
                this.blockHeight,
                this.getColor()
            );
            this.stackContainer.add(placedBlock);

            const dropWidth = absDiff;
            const dropX = diff > 0 ? prevX + (this.currentWidth / 2) + (dropWidth / 2) : prevX - (this.currentWidth / 2) - (dropWidth / 2);
            
            const debris = this.add.rectangle(
                dropX,
                this.currentY,
                dropWidth,
                this.blockHeight,
                this.getColor()
            );
            
            this.tweens.add({
                targets: debris,
                y: this.height + this.blockHeight,
                rotation: diff > 0 ? 1 : -1,
                duration: 1000,
                ease: 'Quad.easeIn',
                onComplete: () => debris.destroy()
            });

            this.currentWidth = newWidth;
            this.addScore();
            this.finalizePlacement(placedBlock);
        } else {
            // Missed completely
            this.isGameOver = true;
            this.combo = 0;
            this.playSound('gameover');
            this.cameras.main.shake(200, 0.02);
            
            this.tweens.add({
                targets: this.movingBlock,
                y: this.height + this.blockHeight,
                rotation: diff > 0 ? 1 : -1,
                duration: 1000,
                ease: 'Quad.easeIn',
                onComplete: () => {
                    this.scene.start('SceneResult', { score: this.score });
                }
            });
        }
    }

    addScore() {
        this.score++;
        this.scoreText.setText(`Score: ${this.score}`);
        if (this.moveSpeed < this.maxSpeed) {
            this.moveSpeed += 15;
        }
    }

    finalizePlacement(block) {
        this.stack.push(block);
        
        const targetVisualY = this.height - this.blockHeight / 2 - 250; 
        const newContainerY = targetVisualY - this.currentY;

        this.tweens.add({
            targets: this.stackContainer,
            y: newContainerY,
            duration: 200,
            ease: 'Sine.easeOut'
        });

        this.tweens.add({
            targets: block,
            scaleX: 1.05,
            scaleY: 1.05,
            duration: 50,
            yoyo: true,
        });

        this.spawnBlock();
    }
}
