// mediaFacade.ts — модуль, що виступає як фасад

class AudioEngine {
    initialize(): void {
        console.log("🔈 Ініціалізація аудіо-движка");
    }

    playSound(file: string): void {
        console.log(`🎵 Відтворення аудіо: ${file}`);
    }
}

class VideoEngine {
    initialize(): void {
        console.log("📺 Ініціалізація відео-движка");
    }

    playVideo(file: string): void {
        console.log(`🎬 Відтворення відео: ${file}`);
    }
}

class SubtitlesEngine {
    load(file: string): void {
        console.log(`📝 Завантаження субтитрів: ${file}`);
    }
}

// Цей об'єкт — фасад всередині модуля
class MediaPlayerFacade {
    private audio = new AudioEngine();
    private video = new VideoEngine();
    private subtitles = new SubtitlesEngine();

    playMedia(videoPath: string, audioPath: string, subtitlesPath?: string): void {
        this.audio.initialize();
        this.video.initialize();

        this.audio.playSound(audioPath);
        this.video.playVideo(videoPath);

        if (subtitlesPath) {
            this.subtitles.load(subtitlesPath);
        }
    }
}

// Експортуємо лише фасад
export const mediaPlayer = new MediaPlayerFacade();