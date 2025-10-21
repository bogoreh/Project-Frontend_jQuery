import React, { useState, useRef, useEffect } from 'react';
import $ from 'jquery';
import PlayerControls from './PlayerControls';
import VolumeControl from './VolumeControl';
import Playlist from './Playlist';
import useLocalStorage from '../hooks/useLocalStorage';
import { createAudioElement } from '../utils/audioHelpers';

const AudioPlayer = () => {
  const [playlist, setPlaylist] = useLocalStorage('musicPlayerPlaylist', []);
  const [currentTrackIndex, setCurrentTrackIndex] = useLocalStorage('currentTrackIndex', 0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useLocalStorage('musicPlayerVolume', 0.7);
  
  const audioRef = useRef(null);

  const currentTrack = playlist[currentTrackIndex];

  useEffect(() => {
    // Initialize audio element
    if (currentTrack) {
      audioRef.current = createAudioElement(currentTrack.src);
      setupAudioEvents();
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [currentTrackIndex, playlist.length]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const setupAudioEvents = () => {
    const audio = audioRef.current;
    
    audio.addEventListener('loadedmetadata', () => {
      setDuration(audio.duration);
    });

    audio.addEventListener('timeupdate', () => {
      setCurrentTime(audio.currentTime);
    });

    audio.addEventListener('ended', handleNext);
  };

  const handlePlayPause = () => {
    if (!audioRef.current || !currentTrack) return;

    if (isPlaying) {
      audioRef.current.pause();
      // jQuery effect for pause
      $('.play-pause').addClass('paused').removeClass('playing');
    } else {
      audioRef.current.play().catch(console.error);
      // jQuery effect for play
      $('.play-pause').addClass('playing').removeClass('paused');
    }
    setIsPlaying(!isPlaying);
  };

  const handleNext = () => {
    if (playlist.length === 0) return;
    
    const nextIndex = (currentTrackIndex + 1) % playlist.length;
    setCurrentTrackIndex(nextIndex);
    setIsPlaying(true);
    
    // jQuery animation for track change
    $('.player-container').fadeOut(100).fadeIn(100);
  };

  const handlePrevious = () => {
    if (playlist.length === 0) return;
    
    const prevIndex = currentTrackIndex === 0 ? playlist.length - 1 : currentTrackIndex - 1;
    setCurrentTrackIndex(prevIndex);
    setIsPlaying(true);
    
    // jQuery animation for track change
    $('.player-container').fadeOut(100).fadeIn(100);
  };

  const handleSeek = (time) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const handleVolumeChange = (newVolume) => {
    setVolume(newVolume);
  };

  const handleTrackSelect = (index) => {
    setCurrentTrackIndex(index);
    setIsPlaying(true);
  };

  const handleAddTrack = (track) => {
    setPlaylist(prev => [...prev, track]);
  };

  const handleRemoveTrack = (index) => {
    setPlaylist(prev => {
      const newPlaylist = prev.filter((_, i) => i !== index);
      
      // Adjust current track index if needed
      if (index === currentTrackIndex) {
        setCurrentTrackIndex(0);
        setIsPlaying(false);
      } else if (index < currentTrackIndex) {
        setCurrentTrackIndex(prevIndex => prevIndex - 1);
      }
      
      return newPlaylist;
    });
  };

  // Auto-play when track changes and was playing
  useEffect(() => {
    if (audioRef.current && isPlaying && currentTrack) {
      audioRef.current.play().catch(console.error);
    }
  }, [currentTrackIndex, currentTrack]);

  return (
    <div className="music-player">
      <div className="player-container">
        <div className="now-playing">
          {currentTrack ? (
            <>
              <h2>Now Playing</h2>
              <div className="current-track-info">
                <h3>{currentTrack.title}</h3>
                <p>Track {currentTrackIndex + 1} of {playlist.length}</p>
              </div>
            </>
          ) : (
            <div className="no-track">
              <h2>No Track Selected</h2>
              <p>Add tracks to your playlist to start playing</p>
            </div>
          )}
        </div>

        <PlayerControls
          isPlaying={isPlaying}
          onPlayPause={handlePlayPause}
          onNext={handleNext}
          onPrevious={handlePrevious}
          currentTime={currentTime}
          duration={duration}
          onSeek={handleSeek}
        />

        <VolumeControl
          volume={volume}
          onVolumeChange={handleVolumeChange}
        />
      </div>

      <Playlist
        playlist={playlist}
        currentTrackIndex={currentTrackIndex}
        onTrackSelect={handleTrackSelect}
        onAddTrack={handleAddTrack}
        onRemoveTrack={handleRemoveTrack}
      />
    </div>
  );
};

export default AudioPlayer;