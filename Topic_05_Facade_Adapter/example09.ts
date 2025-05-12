class CustomVideoDecoder {
    decode(path: string): void {
        console.log(`Декодування відео: ${path}`);
    }
}

class CustomAudioDecoder {
    decode(path: string): void {
        console.log(`Декодування аудіо: ${path}`);
    }
}

class MediaRenderer {
    render(video: void, audio: void): void {
        console.log('Рендеринг медіа');
    }
}

class MediaPlayer {
    private videoDecoder = new CustomVideoDecoder();
    private audioDecoder = new CustomAudioDecoder();
    private renderer = new MediaRenderer();

    play(path: string): void {
        const video = this.videoDecoder.decode(path);
        const audio = this.audioDecoder.decode(path);
        this.renderer.render(video, audio);
    }
}

// Використання
const player = new MediaPlayer();
player.play('video.mp4');