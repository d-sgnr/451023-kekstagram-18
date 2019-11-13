'use strict';

(function () {
  window.slider = {
    initSlider: function (someFunction) {
      var EFFECT_LINE_WIDTH = 453;
      var pin = document.querySelector('.effect-level__pin');
      var level = document.querySelector('.effect-level__depth');

      pin.addEventListener('mousedown', function (evt) {
        evt.preventDefault();

        var startCoords = {
          x: evt.clientX
        };

        var onMouseMove = function (moveEvt) {
          moveEvt.preventDefault();

          var shift = {
            x: startCoords.x - moveEvt.clientX
          };

          startCoords = {
            x: moveEvt.clientX
          };

          pin.style.left = (pin.offsetLeft - shift.x) + 'px';
          var effectLevelPinPosition = parseInt(pin.style.left, 10);

          if (effectLevelPinPosition >= EFFECT_LINE_WIDTH) {
            pin.style.left = EFFECT_LINE_WIDTH + 'px';
          }

          if (effectLevelPinPosition < 1) {
            pin.style.left = 0;
          }

          level.style.width = pin.style.left;

          someFunction();
        };

        var onMouseUp = function (upEvt) {
          upEvt.preventDefault();

          document.removeEventListener('mousemove', onMouseMove);
          document.removeEventListener('mouseup', onMouseUp);
        };

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
      });
    }
  };
})();
