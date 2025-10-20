import $ from 'jquery';

export const animateScore = (element, points) => {
  $(element)
    .animate({ fontSize: '2em' }, 200)
    .animate({ fontSize: '1.5em' }, 200);
};

// Custom shake animation without jQuery UI
export const shakeElement = (element) => {
  const $el = $(element);
  const positions = [-5, 5, -5, 5, -2, 2, 0];
  
  positions.forEach((pos, index) => {
    setTimeout(() => {
      $el.css('margin-left', pos + 'px');
    }, index * 50);
  });
};

// Custom pulse animation without jQuery UI
export const pulseElement = (element) => {
  const $el = $(element);
  $el.fadeTo(200, 0.3).fadeTo(200, 1.0);
};