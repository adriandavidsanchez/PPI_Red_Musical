import React, { useEffect, useRef, useState } from 'react';
import './AudioPlayer.css';

const AudioPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const audioRef = useRef(null);
  const progressRef = useRef(null);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  useEffect(() => {
    const audio = audioRef.current;

    const updateProgress = () => {
      if (audio.duration) {
        setProgress((audio.currentTime / audio.duration) * 100);
        setCurrentTime(audio.currentTime);
      }
    };

    const setAudioDuration = () => setDuration(audio.duration);

    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('loadedmetadata', setAudioDuration);

    return () => {
      audio.removeEventListener('timeupdate', updateProgress);
      audio.removeEventListener('loadedmetadata', setAudioDuration);
    };
  }, []);

  const togglePlayPause = () => {
    const audio = audioRef.current;
    if (audio.paused) {
      audio.play();
    } else {
      audio.pause();
    }
    setIsPlaying(!isPlaying);
  };

  const handleProgressClick = (e) => {
    const progressBar = progressRef.current;
    const rect = progressBar.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const newProgress = (clickX / rect.width) * 100;
    const audio = audioRef.current;
    audio.currentTime = (newProgress / 100) * audio.duration;
    setProgress(newProgress);
  };

  const handleDrag = (e) => {
    handleProgressClick(e); // Permite mover el círculo al arrastrarlo
  };

  return (
    <div className="audio-player">
      <audio ref={audioRef}>
        <source src="/src/assets/imagenes/gestion-prueva/dis5.mp3" type="audio/mp3" />
        Your browser does not support the audio element.
      </audio>
      <button onClick={togglePlayPause} className="play-pause-button">
        {isPlaying ? 'Pause' : 'Play'}
      </button>
      <div
        className="progress-bar"
        ref={progressRef}
        onClick={handleProgressClick}
        onMouseMove={(e) => e.buttons === 1 && handleDrag(e)}
      >
        <div className="progress" style={{ width: `${progress}%` }}></div>
        <div
          className="progress-circle"
          style={{ left: `calc(${progress}% - 7px)` }} // Posiciona el círculo
        ></div>
      </div>
      <div className="time-info">
        <span>{formatTime(currentTime)}</span>
        <span>{formatTime(duration)}</span>
      </div>
    </div>
  );
};

export default AudioPlayer;

