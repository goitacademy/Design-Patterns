interface MediaPlayer {
  play(audioType: string, filename: string): void;
}

// Adaptee 
class AdvancedMediaPlayer {
  playFlac(filename: string): void {
    console.log(`Відтворення FLAC файлу: ${filename}`);
  }

  playWav(filename: string): void {
    console.log(`Відтворення WAV файлу: ${filename}`);
  }
}

// Класовий адаптер 
class MediaAdapter extends AdvancedMediaPlayer implements MediaPlayer {
  play(audioType: string, filename: string): void {
    if (audioType === 'mp3') {
      console.log(`Відтворення MP3 файлу: ${filename}`);
    } else if (audioType === 'flac') {
      this.playFlac(filename);
    } else if (audioType === 'wav') {
      this.playWav(filename);
    } else {
      console.log(`Формат ${audioType} не підтримується адаптером`);
    }
  }
}

// Використання
const player: MediaPlayer = new MediaAdapter();
player.play('flac', 'audio.flac');
player.play('wav', 'sound.wav');
player.play('mp3', 'song.mp3');
player.play('aac', 'audio.aac');