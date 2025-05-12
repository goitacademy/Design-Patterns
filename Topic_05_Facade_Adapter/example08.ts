class FileLoader {
  load(path: string): Buffer {
    console.log(`Завантаження файлу з ${path}`);
    return Buffer.from("file data");
  }
}

class Decoder {
  decode(data: Buffer): string {
    console.log("Декодування даних");
    return data.toString();
  }
}

class AudioProcessor {
  normalize(audio: string): string {
    console.log("Нормалізація аудіо");
    return audio.toUpperCase();
  }
}

class AudioPlayer {
  play(audio: string): void {
    console.log(`Відтворення: ${audio}`);
  }
}

// Клієнтський код повинен знати всі кроки
const loader = new FileLoader();
const decoder = new Decoder();
const processor = new AudioProcessor();
const player = new AudioPlayer();

const file = loader.load("song.mp3");
const decoded = decoder.decode(file);
const processed = processor.normalize(decoded);
player.play(processed);
