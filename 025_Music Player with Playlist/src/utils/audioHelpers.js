export const formatTime = (seconds) => {
  if (isNaN(seconds)) return '0:00';
  
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
};

export const createAudioElement = (src) => {
  const audio = new Audio(src);
  audio.crossOrigin = "anonymous";
  return audio;
};