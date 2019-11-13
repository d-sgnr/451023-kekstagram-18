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
  var hashTagsInput = document.querySelector('.text__hashtags');
  var formSubmitBtn = document.querySelector('.img-upload__submit');

  var errorTemplate = document.querySelector('#error').content.querySelector('.error');

  var successTemplate = document.querySelector('#success').content.querySelector('.success');

  var successMessage = successTemplate.cloneNode(true);
  var errorMessage = errorTemplate.cloneNode(true);

  var closeEditorOnEsc = function (evt) {
    if (document.activeElement === hashTagsInput) {
      return null;
    } else {
      window.util.isEscEvent(evt, closeEditor);
    }
    return null;
  };

  var hasDuplicates = function (arr) {
    return arr.some(function (item, index) {
      return arr.indexOf(item.toLowerCase()) !== index;
    });
  };

  var validateHashtags = function () {
    var hashTags = hashTagsInput.value.split(' ');
    for (var i = 0; i < hashTags.length; i++) {
      if (hashTags[i] === '') {
        hashTagsInput.setCustomValidity('');
      } else if (hashTags[i].charAt(0) !== '#') {
        hashTagsInput.setCustomValidity('Хэш-тег должен начинаться с решётки');
      } else if (hashTags[i] === '#') {
        hashTagsInput.setCustomValidity('Хэш-тег не может состоять только из одной решётки');
      } else if (hashTags.length > MAX_HASHTAGS_QTY) {
        hashTagsInput.setCustomValidity('Нельзя указывать больше ' + MAX_HASHTAGS_QTY + ' хэш-тегов');
      } else if (hashTags[i].length > MAX_HASHTAGS_LENGTH) {
        hashTagsInput.setCustomValidity('Максимальная длина одного хэш-тега не более ' + MAX_HASHTAGS_LENGTH + ' символов, включая решётку');
      } else if ((hashTags[i].match(/#/g)).length > 1) {
        hashTagsInput.setCustomValidity('Хэш-теги должны разделяться пробелами');
      } else if (hasDuplicates(hashTags)) {
        hashTagsInput.setCustomValidity('Один и тот же хэш-тег не может быть использован дважды');
      } else {
        hashTagsInput.setCustomValidity('');
      }
    }
    return hashTagsInput.reportValidity();
  };

  var openEditor = function () {
    photoEditForm.classList.remove('hidden');
    document.addEventListener('keydown', closeEditorOnEsc);
    photoEditFormClose.addEventListener('keydown', closeEditorOnEnter);
  };

  var closeEditor = function () {
    photoEditForm.classList.add('hidden');
    // imgUploadForm.reset();
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

  photoScaleSmaller.addEventListener('click', function () {
    changePreviewSize(RESIZE_STEP);
  });

  photoScaleBigger.addEventListener('click', function () {
    changePreviewSize(RESIZE_MAX);
  });

  hashTagsInput.addEventListener('change', function () {
    validateHashtags();
  });

  imgUpload.addEventListener('change', function () {
    openEditor();
  });

  photoEditFormClose.addEventListener('click', function () {
    closeEditor();
  });

  var closeSuccess = function () {
    var successWindow = document.querySelector('.success');
    var closeSuccessMessage = function () {
      successWindow.remove();
    };
    var closeSuccessMessageOnEnter = function (evt) {
      window.util.isEnterEvent(evt, closeSuccessMessage);
    };
    var successButton = document.querySelector('.success__button');
    successButton.addEventListener('click', closeSuccessMessage);
    successButton.addEventListener('keydown', closeSuccessMessageOnEnter);
  };

  var showSuccessMessage = function () {
    closeEditor();
    var fragment = document.createDocumentFragment();
    fragment.appendChild(successMessage);
    pageMain.appendChild(fragment);
    closeSuccess();
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

    var tryPublishAgain = function () {
      errorWindow.remove();
      formSubmitBtn.click();
    };

    tryAnotherFileButton.addEventListener('click', tryAnotherFile);

    tryAgainButton.addEventListener('click', tryPublishAgain);
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
