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
  var commentInput = document.querySelector('.text__description');

  var errorTemplate = document.querySelector('#error').content.querySelector('.error');

  var successTemplate = document.querySelector('#success').content.querySelector('.success');

  var successMessage = successTemplate.cloneNode(true);
  var errorMessage = errorTemplate.cloneNode(true);

  var closeEditorOnEsc = function (evt) {
    if (document.activeElement === hashtagsInput || document.activeElement === commentInput) {
      return null;
    }

    return window.util.isEscEvent(evt, closeEditor);
  };

  var hasDuplicates = function (arr) {
    var object = {};
    var result = [];

    arr.forEach(function (item) {
      if (!object[item.toLowerCase()]) {
        object[item.toLowerCase()] = 0;
      }
      object[item.toLowerCase()] += 1;
    });

    for (var prop in object) {
      if (object[prop] >= 2) {
        result.push(prop);
      }
    }

    return result.length !== 0;
  };

  var validateHashtags = function () {
    if (hashtagsInput.value !== '') {
      var hashTags = hashtagsInput.value.split(' ');
      hashTags.forEach(function (el) {
        if (hashTags[0] === '' || el.charAt(0) !== '#') {
          hashtagsInput.setCustomValidity('Хэш-тег должен начинаться с решётки');
        } else if (el === '#') {
          hashtagsInput.setCustomValidity('Хэш-тег не может состоять только из одной решётки');
        } else if (hashTags.length > MAX_HASHTAGS_QTY) {
          hashtagsInput.setCustomValidity('Нельзя указывать больше ' + MAX_HASHTAGS_QTY + ' хэш-тегов');
        } else if (el.length > MAX_HASHTAGS_LENGTH) {
          hashtagsInput.setCustomValidity('Максимальная длина одного хэш-тега не более ' + MAX_HASHTAGS_LENGTH + ' символов, включая решётку');
        } else if ((el.match(/#/g)).length > 1) {
          hashtagsInput.setCustomValidity('Хэш-теги должны разделяться пробелами');
        } else if (hasDuplicates(hashTags)) {
          hashtagsInput.setCustomValidity('Один и тот же хэш-тег не может быть использован дважды');
        } else {
          hashtagsInput.setCustomValidity('');
        }
      });
      if (!hashtagsInput.checkValidity()) {
        hashtagsInput.style.boxShadow = '0px 0px 4px 4px red';
      } else {
        hashtagsInput.style.boxShadow = '';
      }
    } else {
      hashtagsInput.style.boxShadow = '';
      hashtagsInput.setCustomValidity('');
    }
    return hashtagsInput.reportValidity();
  };

  var onEditorEscPress = function (evt) {
    closeEditorOnEsc(evt);
  };

  var onCloseEnterPress = function (evt) {
    closeEditorOnEnter(evt);
  };

  var openEditor = function () {
    window.getDefaultFilter();
    photoEditForm.classList.remove('hidden');
    document.addEventListener('keydown', onEditorEscPress);
    photoEditFormClose.addEventListener('keydown', onCloseEnterPress);
  };

  var closeEditor = function () {
    photoEditForm.classList.add('hidden');
    imgUploadForm.reset();
    hashtagsInput.style.boxShadow = '';
    photoUpload.style.transform = '';
    document.removeEventListener('keydown', onEditorEscPress);
    photoEditFormClose.removeEventListener('keydown', onCloseEnterPress);
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

  hashtagsInput.addEventListener('input', onHashtagsInputChange);

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
      successWindow.remove();
      document.removeEventListener('click', onFreeSpaceClick);
      document.removeEventListener('keydown', onEscPress);
      successButton.removeEventListener('click', onSuccessButtonClick);
      successButton.removeEventListener('keydown', onEnterPress);
    };

    var closeSuccessOnClick = function (evt) {
      var notClickable = document.querySelector('.success__inner');
      if (evt.target !== notClickable) {
        closeSuccess();
      }
    };

    var successButton = document.querySelector('.success__button');

    var onSuccessButtonClick = function (evt) {
      closeSuccess(evt);
    };

    var onFreeSpaceClick = function (evt) {
      closeSuccessOnClick(evt);
    };

    var onEscPress = function (evt) {
      closeSuccessOnEsc(evt);
    };

    var onEnterPress = function (evt) {
      closeSuccessOnEnter(evt);
    };

    var closeSuccessOnEsc = function (evt) {
      window.util.isEscEvent(evt, closeSuccess);
    };

    var closeSuccessOnEnter = function (evt) {
      window.util.isEnterEvent(evt, closeSuccess);
    };

    successButton.addEventListener('click', onSuccessButtonClick);
    successButton.addEventListener('keydown', onEnterPress);
    document.addEventListener('click', onFreeSpaceClick);
    document.addEventListener('keydown', onEscPress);
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

    var onTryAnotherFileClick = function () {
      tryAnotherFile();
    };

    var onTryAgainClick = function (evt) {
      closeError(evt);
    };

    var onEscPress = function (evt) {
      closeErrorOnEsc(evt);
    };

    var onEnterPress = function (evt) {
      closeErrorOnEnter(evt);
    };

    var closeError = function () {
      errorWindow.remove();
      document.removeEventListener('click', onFreeSpaceClick);
      document.removeEventListener('keydown', onEscPress);
      document.addEventListener('keydown', onEditorEscPress);
      tryAgainButton.removeEventListener('click', onTryAgainClick);
      tryAgainButton.removeEventListener('keydown', onEnterPress);
      tryAnotherFileButton.removeEventListener('click', onTryAnotherFileClick);
    };

    var closeErrorOnClick = function (evt) {
      var notClickable = document.querySelector('.error__inner');
      if (evt.target !== notClickable) {
        closeError();
      }
    };

    var onFreeSpaceClick = function (evt) {
      closeErrorOnClick(evt);
    };

    var closeErrorOnEsc = function (evt) {
      window.util.isEscEvent(evt, closeError);
    };

    var closeErrorOnEnter = function (evt) {
      window.util.isEnterEvent(evt, closeError);
    };

    tryAnotherFileButton.addEventListener('click', onTryAnotherFileClick);
    tryAgainButton.addEventListener('click', onTryAgainClick);
    tryAgainButton.addEventListener('keydown', onEnterPress);
    document.addEventListener('keydown', onEscPress);
    document.addEventListener('click', onFreeSpaceClick);
    document.removeEventListener('keydown', onEditorEscPress);
  };

  var submitForm = function (evt) {
    evt.preventDefault();
    evt.stopImmediatePropagation();
    if (validateHashtags()) {
      window.backend.save(new FormData(imgUploadForm), showSuccessMessage, showErrorMessage);
    }
    return validateHashtags();
  };

  var onFormButtonClick = function (evt) {
    submitForm(evt);
  };

  formSubmitBtn.addEventListener('click', onFormButtonClick);

})();
