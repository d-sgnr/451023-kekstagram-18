'use strict';

(function () {

  var EFFECT_LINE_WIDTH = 453;
  var HEAT_FILTER_MIN = 1;
  var HEAT_FILTER_MAX = 3;
  var PHOBOS_FILTER_MIN = 0;
  var PHOBOS_FILTER_MAX = 3;

  var radioPreviews = document.querySelectorAll('.effects__radio');
  var radioPreviewsArray = Array.prototype.slice.call(radioPreviews);
  var filterClassPrefix = 'effects__preview--';
  var photoUploadPreview = document.querySelector('.img-upload__preview');
  var photoUploadPreviewClass = 'img-upload__preview';
  var effectLevelPin = document.querySelector('.effect-level__pin');
  var effectLevelDepth = document.querySelector('.effect-level__depth');
  var effectSlider = document.querySelector('.img-upload__effect-level');
  var imgFilter = document.querySelector('.img-upload__preview');

  window.getDefaultFilter = function () {
    var defaultRadio = document.querySelector('#effect-none');
    defaultRadio.click();
  };

  var getDefaultSlider = function () {
    effectLevelPin.style.left = EFFECT_LINE_WIDTH + 'px';
    effectLevelDepth.style.width = EFFECT_LINE_WIDTH + 'px';
  };

  var getFilterValue = function (number) {
    var toFilterNumber = number / 100;
    var filterValue = parseFloat(toFilterNumber.toFixed(2));
    return filterValue;
  };

  var getFilterLimitedValue = function (number, min, max) {
    var filterValue = parseFloat((number / 100 * 3).toFixed(2));
    if (filterValue <= min) {
      filterValue = min;
    }
    if (filterValue >= max) {
      filterValue = max;
    }
    return filterValue;
  };

  if (imgFilter.classList.length === 1) {
    effectSlider.classList.add('hidden');
  }

  radioPreviewsArray.forEach(function (el) {
    var onRadioPreviewsClick = function () {
      photoUploadPreview.className = '';
      photoUploadPreview.classList.add(photoUploadPreviewClass);
      photoUploadPreview.classList.add(filterClassPrefix + el.value);
      photoUploadPreview.classList.remove('effects__preview--none');
      photoUploadPreview.removeAttribute('style');

      if (imgFilter.classList.length === 1) {
        effectSlider.classList.add('hidden');
      } else {
        effectSlider.classList.remove('hidden');
      }

      getDefaultSlider();
    };

    el.addEventListener('click', onRadioPreviewsClick);
  });

  var changeFilter = function () {
    var effectLevelPinPosition = parseInt(effectLevelPin.style.left, 10);
    var filterNumber = effectLevelPinPosition * 100 / EFFECT_LINE_WIDTH;

    var chromeFilterApplied = imgFilter.classList.contains('effects__preview--chrome');
    var sepiaFilterApplied = imgFilter.classList.contains('effects__preview--sepia');
    var marvinFilterApplied = imgFilter.classList.contains('effects__preview--marvin');
    var phobosFilterApplied = imgFilter.classList.contains('effects__preview--phobos');
    var heatFilterApplied = imgFilter.classList.contains('effects__preview--heat');

    if (chromeFilterApplied) {
      imgFilter.style.WebkitFilter = 'grayscale(' + getFilterValue(filterNumber) + ')';
    }
    if (sepiaFilterApplied) {
      imgFilter.style.WebkitFilter = 'sepia(' + getFilterValue(filterNumber) + ')';
    }
    if (marvinFilterApplied) {
      imgFilter.style.WebkitFilter = 'invert(' + Math.round(filterNumber) + '%)';
    }
    if (phobosFilterApplied) {
      imgFilter.style.WebkitFilter = 'blur(' + getFilterLimitedValue(filterNumber, PHOBOS_FILTER_MIN, PHOBOS_FILTER_MAX) + 'px)';
    }
    if (heatFilterApplied) {
      imgFilter.style.WebkitFilter = 'brightness(' + getFilterLimitedValue(filterNumber, HEAT_FILTER_MIN, HEAT_FILTER_MAX);
    }
  };

  var onSliderDrag = function () {
    changeFilter();
  };

  window.slider.initSlider(onSliderDrag);

})();
