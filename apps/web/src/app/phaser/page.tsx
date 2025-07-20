"use client"

import React, { useEffect, useRef } from 'react';
import * as Phaser from 'phaser';

export function MagnetControls({ strength, setStrength }:{ strength:any, setStrength:any }) {
    return (
        <div style={{ padding: '10px' }}>
            <label>Magnet Strength: {strength}</label>
            <input
                type="range"
                min="0"
                max="200"
                value={strength}
                onChange={(e) => setStrength(parseInt(e.target.value))}
            />
        </div>
    );
}



export function MagnetDemo({ strength }: { strength: number }) {
    const gameRef = useRef<HTMLDivElement | null>(null);
    const phaserGame = useRef<Phaser.Game | null>(null);

    useEffect(() => {
        const scene = createMagnetScene(() => strength); // 👈 pass in a getter function

        const config: Phaser.Types.Core.GameConfig = {
            type: Phaser.AUTO,
            width: 800,
            height: 600,
            parent: gameRef.current!,
            physics: { default: 'arcade' },
            scene,
        };

        phaserGame.current = new Phaser.Game(config);

        return () => {
            phaserGame.current?.destroy(true);
        };
    }, []);

    return <div ref={gameRef} />;
}

export function createMagnetScene(getStrength: () => number) {
    return class MagnetScene extends Phaser.Scene {
        magnet!: Phaser.Physics.Arcade.Image;
        objects: Phaser.Physics.Arcade.Image[] = [];

        constructor() {
            super('MagnetScene');
        }

        preload() {
            this.load.image('magnet', 'https://i.imgur.com/5vW2kQh.png');
            this.load.image('nail', 'https://i.imgur.com/1R9uD5A.png');
        }

        create() {
            this.magnet = this.physics.add.image(400, 300, 'magnet')
                .setImmovable(true)
                .setInteractive()
                .setScale(0.2);

            this.input.setDraggable(this.magnet);
            this.input.on('drag', (_:any, obj:any, x:any, y:any) => obj.setPosition(x, y));

            for (let i = 0; i < 5; i++) {
                const obj = this.physics.add.image(100 + i * 120, 500, 'nail')
                    .setScale(0.1)
                    .setCircle(20)
                    .setCollideWorldBounds(true);
                this.objects.push(obj);
            }
        }

        update() {
            const strength = getStrength(); // 👈 dynamic!
            this.objects.forEach(obj => {
                const dx = this.magnet.x - obj.x;
                const dy = this.magnet.y - obj.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 200 && strength > 0) {
                    const force = (strength / (dist * dist)) * 1000;
                    obj.setVelocity(dx * force, dy * force);
                }
            });
        }
    };
}

const storyPages = [
    {
        type: 'text+image',
        text: 'This is a magnet.',
        image: 'magnet.png',
    },
    {
        type: 'text+phaser',
        text: 'Try dragging the magnet near the nail!',
        scene: 'MagnetScene',
    },
    {
        type: 'text+image',
        text: 'It sticks!',
        image: 'magnet-nail-stuck.png',
    }
];

const Page = () => {
    const page = storyPages[1];

    return (
        <div className="page">
            <p className={`cursor-`}>{page.text}</p>
            {page.image && <img src={page.image} />}
            {page.scene && <MagnetDemo strength={5} />}
            <MagnetControls strength={5} setStrength={(strength:any) => console.log('strength', strength)} />
        </div>
    );
};

export default Page;