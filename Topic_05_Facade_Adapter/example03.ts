interface MediaPlayer {
  play(audioType: string, filename: string): void;
}

class AudioPlayer implements MediaPlayer {
  play(audioType: string, filename: string): void {
    if (audioType === 'mp3') {
      console.log(`Відтворення MP3 файлу: ${filename}`);
    } else {
      console.log(`Формат ${audioType} не підтримується`);
    }
  }
}

class AdvancedMediaPlayer {
  playFlac(filename: string): void {
    console.log(`Відтворення FLAC файлу: ${filename}`);
  }

  playWav(filename: string): void {
    console.log(`Відтворення WAV файлу: ${filename}`);
  }
}

// Створення об'єктного адаптера
class MediaAdapter implements MediaPlayer {
  private advancedMusicPlayer: AdvancedMediaPlayer;

  constructor() {
    this.advancedMusicPlayer = new AdvancedMediaPlayer();
  }

  play(audioType: string, filename: string): void {
    if (audioType === 'flac') {
      this.advancedMusicPlayer.playFlac(filename);
    } else if (audioType === 'wav') {
      this.advancedMusicPlayer.playWav(filename);
    } else {
      console.log(`Формат ${audioType} не підтримується адаптером`);
    }
  }
}

// Розширення AudioPlayer для підтримки додаткових форматів через адаптер
class EnhancedAudioPlayer implements MediaPlayer {
  private mediaAdapter: MediaAdapter;

  constructor() {
    this.mediaAdapter = new MediaAdapter();
  }

  play(audioType: string, filename: string): void {
    if (audioType === 'mp3') {
      console.log(`Відтворення MP3 файлу: ${filename}`);
    } else if (audioType === 'flac' || audioType === 'wav') {
      this.mediaAdapter.play(audioType, filename);
    } else {
      console.log(`Формат ${audioType} не підтримується`);
    }
  }
}

// Використання
const player = new EnhancedAudioPlayer();
player.play('mp3', 'song.mp3');
player.play('flac', 'audio.flac');
player.play('wav', 'sound.wav');
player.play('aac', 'audio.aac');