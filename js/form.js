'use strict';

(function () {
  var RESIZE_STEP = 25;
  var RESIZE_MAX = 100;
  var MAX_HASHTAGS_QTY = 5;
  var MAX_HASHTAGS_LENGTH = 20;

  var photoScaleSmaller = document.querySelector('.scale__control--smaller');
  var photoScaleBigger = document.querySelector('.scale__control--bigger');
  var photoScaleValue = document.querySelector('.scale__control--value');
  var photoUpload = document.querySelector('.img-upload__preview img');

  var pageMain = document.querySelector('main');
  var imgUpload = document.querySelector('#upload-file');
  var photoEditForm = document.querySelector('.img-upload__overlay');
  var photoEditFormClose = document.querySelector('#upload-cancel');
  var imgUploadForm = document.querySelector('.img-upload__form');
  var hashtagsInput = document.querySelector('.text__hashtags');
  var formSubmitBtn = document.querySelector('.img-upload__submit');

  var errorTemplate = document.querySelector('#error').content.querySelector('.error');

  var successTemplate = document.querySelector('#success').content.querySelector('.success');

  var successMessage = successTemplate.cloneNode(true);
  var errorMessage = errorTemplate.cloneNode(true);

  var closeEditorOnEsc = function (evt) {
    if (document.activeElement === hashtagsInput) {
      return null;
    }

    return window.util.isEscEvent(evt, closeEditor);
  };

  var hasDuplicates = function (arr) {
    return arr.some(function (item, index) {
      return arr.indexOf(item.toLowerCase()) !== index;
    });
  };

  var validateHashtags = function () {
    var hashTags = hashtagsInput.value.split(' ');
    for (var i = 0; i < hashTags.length; i++) {
      if (hashTags[i] === '') {
        hashtagsInput.setCustomValidity('');
      } else if (hashTags[i].charAt(0) !== '#') {
        hashtagsInput.setCustomValidity('Хэш-тег должен начинаться с решётки');
      } else if (hashTags[i] === '#') {
        hashtagsInput.setCustomValidity('Хэш-тег не может состоять только из одной решётки');
      } else if (hashTags.length > MAX_HASHTAGS_QTY) {
        hashtagsInput.setCustomValidity('Нельзя указывать больше ' + MAX_HASHTAGS_QTY + ' хэш-тегов');
      } else if (hashTags[i].length > MAX_HASHTAGS_LENGTH) {
        hashtagsInput.setCustomValidity('Максимальная длина одного хэш-тега не более ' + MAX_HASHTAGS_LENGTH + ' символов, включая решётку');
      } else if ((hashTags[i].match(/#/g)).length > 1) {
        hashtagsInput.setCustomValidity('Хэш-теги должны разделяться пробелами');
      } else if (hasDuplicates(hashTags)) {
        hashtagsInput.setCustomValidity('Один и тот же хэш-тег не может быть использован дважды');
      } else {
        hashtagsInput.setCustomValidity('');
      }
    }
    if (!hashtagsInput.checkValidity()) {
      hashtagsInput.style.boxShadow = '0px 0px 4px 4px red';
    } else {
      hashtagsInput.style.boxShadow = '';
    }
    return hashtagsInput.reportValidity();
  };

  var openEditor = function () {
    photoEditForm.classList.remove('hidden');
    document.addEventListener('keydown', closeEditorOnEsc);
    photoEditFormClose.addEventListener('keydown', closeEditorOnEnter);
  };

  var closeEditor = function () {
    photoEditForm.classList.add('hidden');
    imgUploadForm.reset();
    hashtagsInput.style.boxShadow = '';
    photoUpload.style.transform = '';
    document.removeEventListener('keydown', closeEditorOnEsc);
    photoEditFormClose.removeEventListener('keydown', closeEditorOnEnter);
  };

  var closeEditorOnEnter = function (evt) {
    window.util.isEnterEvent(evt, closeEditor);
    return null;
  };

  var changePreviewSize = function (limit) {
    var percentString = photoScaleValue.value;
    var percentNumber = parseFloat(percentString);
    if (limit === RESIZE_STEP) {
      if (percentNumber !== limit) {
        percentNumber -= RESIZE_STEP;
      }
    } else {
      if (percentNumber !== RESIZE_MAX) {
        percentNumber += RESIZE_STEP;
      }
    }
    photoUpload.style.transform = 'scale(' + percentNumber / 100 + ')';
    photoScaleValue.value = percentNumber + '%';
  };

  var onMinusButtonClick = function () {
    changePreviewSize(RESIZE_STEP);
  };

  var onPlusButtonClick = function () {
    changePreviewSize(RESIZE_MAX);
  };

  photoScaleSmaller.addEventListener('click', onMinusButtonClick);

  photoScaleBigger.addEventListener('click', onPlusButtonClick);

  var onHashtagsInputChange = function () {
    validateHashtags();
  };

  hashtagsInput.addEventListener('change', onHashtagsInputChange);

  var onImgUploadChange = function () {
    openEditor();
  };

  imgUpload.addEventListener('change', onImgUploadChange);

  var onEditorCrossClick = function () {
    closeEditor();
  };

  photoEditFormClose.addEventListener('click', onEditorCrossClick);

  var showSuccessMessage = function () {
    closeEditor();
    var fragment = document.createDocumentFragment();
    fragment.appendChild(successMessage);
    pageMain.appendChild(fragment);

    var successWindow = document.querySelector('.success');

    var closeSuccess = function () {
      var notClickable = document.querySelector('.success__inner');
      if (event.target !== notClickable) {
        successWindow.remove();
        document.removeEventListener('click', closeSuccess);
        document.removeEventListener('keydown', closeSuccessOnEsc);
        successButton.removeEventListener('click', closeSuccess);
        successButton.removeEventListener('keydown', closeSuccessOnEnter);
      }
    };

    var closeSuccessOnEsc = function (evt) {
      window.util.isEscEvent(evt, closeSuccess);
    };

    var closeSuccessOnEnter = function (evt) {
      window.util.isEnterEvent(evt, closeSuccess);
    };

    var successButton = document.querySelector('.success__button');
    var onSuccessButtonClick = function () {
      closeSuccess();
    };

    successButton.addEventListener('click', onSuccessButtonClick);
    successButton.addEventListener('keydown', closeSuccessOnEnter);
    document.addEventListener('click', closeSuccess);
    document.addEventListener('keydown', closeSuccessOnEsc);
  };

  var showErrorMessage = function () {
    var fragment = document.createDocumentFragment();
    fragment.appendChild(errorMessage);
    pageMain.appendChild(errorMessage);

    var tryAgainButton = document.querySelector('.error__button--try-again');
    var tryAnotherFileButton = document.querySelector('.error__button--another-file');

    var errorWindow = document.querySelector('.error');

    errorWindow.style.zIndex = '4';

    var tryAnotherFile = function () {
      errorWindow.remove();
      imgUpload.click();
    };

    var onTryAgainClick = function () {
      closeError();
    };

    var onScreenClick = function () {
      closeError();
    };

    var closeError = function () {
      var notClickable = document.querySelector('.error__inner');
      if (event.target !== notClickable) {
        errorWindow.remove();
        document.removeEventListener('click', onScreenClick);
        document.removeEventListener('keydown', closeErrorOnEsc);
        document.addEventListener('keydown', closeEditorOnEsc);
        tryAgainButton.removeEventListener('click', onTryAgainClick);
        tryAgainButton.removeEventListener('keydown', closeErrorOnEnter);
      }
    };

    var closeErrorOnEsc = function (evt) {
      window.util.isEscEvent(evt, closeError);
    };

    var closeErrorOnEnter = function (evt) {
      window.util.isEnterEvent(evt, closeError);
    };

    tryAnotherFileButton.addEventListener('click', tryAnotherFile);

    tryAgainButton.addEventListener('click', onTryAgainClick);
    tryAgainButton.addEventListener('keydown', closeErrorOnEnter);
    document.addEventListener('keydown', closeErrorOnEsc);
    document.addEventListener('click', onScreenClick);
    document.removeEventListener('keydown', closeEditorOnEsc);
  };

  var submitForm = function () {
    imgUploadForm.addEventListener('submit', function (evt) {
      window.backend.save(new FormData(imgUploadForm), showSuccessMessage, showErrorMessage);
      evt.preventDefault();
    });
  };

  formSubmitBtn.addEventListener('click', submitForm);

  var closeFormOnSubmit = function (evt) {
    window.util.isEnterEvent(evt, submitForm);
  };

  formSubmitBtn.addEventListener('keydown', closeFormOnSubmit);

})();
