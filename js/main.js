'use strict';

var AUTHORS_NAMES = ['Артем', 'Иван', 'Виталий', 'Виктор', 'Руслан', 'Дмитрий'];
var COMMENTS_TEXT = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

var PHOTOS_QUANTITY = 25;
var COMMENTS_QUANTITY = 12;
var AVATAR_MIN = 1;
var AVATAR_MAX = 6;
var LIKES_MIN = 15;
var LIKES_MAX = 200;

var RESIZE_STEP = 25;
var RESIZE_MAX = 100;

var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

var commentTemplate = document.querySelector('#comment').content.querySelector('.social__comment');

var getRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min) + min);
};

var getRandomElement = function (arr) {
  return arr[Math.floor(Math.random() * arr.length)];
};

var getRandomMessage = function (messages) {
  var firstSentenceIndex = getRandomNumber(0, messages.length);
  var firstSentence = messages[firstSentenceIndex];
  var tempMessages = messages.slice();
  tempMessages.splice(firstSentenceIndex, 1);
  var isSecondSentenceNeeded = Math.round(Math.random());
  var secondSentence = isSecondSentenceNeeded ? ' ' + getRandomElement(tempMessages) : '';
  return firstSentence + secondSentence;
};

var getRandomComments = function () {
  var comments = [];
  for (var i = 0; i < COMMENTS_QUANTITY; i++) {
    var commentItem = {
      avatar: 'img/avatar-' + getRandomNumber(AVATAR_MIN, AVATAR_MAX) + '.svg',
      message: getRandomMessage(COMMENTS_TEXT),
      name: getRandomElement(AUTHORS_NAMES)
    };
    comments.push(commentItem);
  }
  return comments;
};

var generatePhotos = function (photosCount) {
  var photos = [];
  for (var i = 1; i <= photosCount; i++) {
    photos.push({
      url: 'photos/' + i + '.jpg',
      description: 'Описание фотографии' + ' №' + i,
      likes: getRandomNumber(LIKES_MIN, LIKES_MAX),
      comments: getRandomComments()
    });
  }
  return photos;
};

var renderPhoto = function (photo) {
  var pictureElement = pictureTemplate.cloneNode(true);
  pictureElement.querySelector('.picture__img').src = photo.url;
  pictureElement.querySelector('.picture__comments').textContent = photo.comments.length;
  pictureElement.querySelector('.picture__likes').textContent = photo.likes;
  return pictureElement;
};

var getPhotos = function () {
  var picturesBlock = document.querySelector('.pictures');
  var fragment = document.createDocumentFragment();
  var photos = generatePhotos(PHOTOS_QUANTITY);
  for (var i = 0; i < PHOTOS_QUANTITY; i++) {
    fragment.appendChild(renderPhoto(photos[i]));
  }
  picturesBlock.appendChild(fragment);
};

getPhotos();

//

var renderBigPhoto = function () {
  var photos = generatePhotos(PHOTOS_QUANTITY);
  var photo = photos[getRandomNumber(1, PHOTOS_QUANTITY)];
  var bigPictureBlock = document.querySelector('.big-picture');
  var bigPictureImg = document.querySelector('.big-picture__img img');
  var photoDescription = document.querySelector('.social__caption');
  bigPictureBlock.classList.remove('hidden');
  photoDescription.textContent = photo.description;
  bigPictureImg.src = photo.url;
};

var renderComment = function (comment) {
  var commentElement = commentTemplate.cloneNode(true);
  commentElement.querySelector('.social__comment img').src = comment.avatar;
  commentElement.querySelector('.social__comment img').alt = comment.name;
  commentElement.querySelector('.social__comment p').textContent = comment.message;
  return commentElement;
};

var getComments = function () {
  var commentsBlock = document.querySelector('.social__comments');
  var fragment = document.createDocumentFragment();
  var comments = getRandomComments(COMMENTS_QUANTITY);
  for (var i = 0; i < COMMENTS_QUANTITY; i++) {
    fragment.appendChild(renderComment(comments[i]));
  }
  commentsBlock.appendChild(fragment);
};

var hideDefaultElements = function () {
  var commentsCountBlock = document.querySelector('.social__comment-count');
  var commentsLoader = document.querySelector('.comments-loader');
  commentsCountBlock.classList.add('visually-hidden');
  commentsLoader.classList.add('visually-hidden');
};

var miniPicture = document.querySelector('.picture');

miniPicture.addEventListener('click', function () {
  hideDefaultElements();
  renderBigPhoto();
  getComments();
});

// Open photo editor

var imgUpload = document.querySelector('#upload-file');
var photoEditForm = document.querySelector('.img-upload__overlay');
var photoEditFormClose = document.querySelector('#upload-cancel');
var imgUploadForm = document.querySelector('.img-upload__form');

var effectSlider = document.querySelector('.img-upload__effect-level');

var closeEditorOnEsc = function (evt) {
  if (document.activeElement === hashTagsInput) {
    return null;
  } else {
    if (evt.keyCode === ESC_KEYCODE) {
      return closeEditor();
    }
  }
  return null;
};

var closeEditorOnEnter = function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    return closeEditor();
  }
  return null;
};

var openEditor = function () {
  photoEditForm.classList.remove('hidden');
  document.addEventListener('keydown', closeEditorOnEsc);
  photoEditFormClose.addEventListener('keydown', closeEditorOnEnter);
};

var closeEditor = function () {
  photoEditForm.classList.add('hidden');
  imgUploadForm.reset();
  document.removeEventListener('keydown', closeEditorOnEsc);
  photoEditFormClose.removeEventListener('keydown', closeEditorOnEnter);
};

imgUpload.addEventListener('change', function () {
  openEditor();
});

photoEditFormClose.addEventListener('click', function () {
  closeEditor();
});

// Photo Scaler

var photoScaleSmaller = document.querySelector('.scale__control--smaller');
var photoScaleBigger = document.querySelector('.scale__control--bigger');
var photoScaleValue = document.querySelector('.scale__control--value');
var photoUploadPreview = document.querySelector('.img-upload__preview');

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
  photoUploadPreview.style.transform = 'scale(' + percentNumber / 100 + ')';
  photoScaleValue.value = percentNumber + '%';
};

photoScaleSmaller.addEventListener('click', function () {
  changePreviewSize(RESIZE_STEP);
});

photoScaleBigger.addEventListener('click', function () {
  changePreviewSize(RESIZE_MAX);
});

//

var EFFECT_LINE_WIDTH = 453;
var HEAT_FILTER_MIN = 1;
var HEAT_FILTER_MAX = 3;
var PHOBOS_FILTER_MIN = 0;
var PHOBOS_FILTER_MAX = 3;
var MAX_HASHTAGS_QTY = 5;
var MAX_HASHTAGS_LENGTH = 20;
var MAX_DESCR_LENGTH = 140;

var effectLevelPin = document.querySelector('.effect-level__pin');
var effectLevelDeapth = document.querySelector('.effect-level__depth');

// Filter Picker

var radioPreviews = document.querySelectorAll('.effects__radio');
var radioPreviewsArray = Array.prototype.slice.call(radioPreviews);
var filterClassPrefix = 'effects__preview--';
var photoUploadPreviewClass = 'img-upload__preview';

var imgFilter = document.querySelector('.img-upload__preview');

if (imgFilter.classList.length === 1) {
  effectSlider.classList.add('hidden');
}

radioPreviewsArray.forEach(function (el) {
  el.addEventListener('click', function () {
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

    effectLevelPin.style.left = EFFECT_LINE_WIDTH + 'px';
    effectLevelDeapth.style.width = EFFECT_LINE_WIDTH + 'px';
  });
});

// Hashtags

var hashTagsInput = document.querySelector('.text__hashtags');
var descriptionInput = document.querySelector('.text__description');

var hasDuplicates = function (arr) {
  return arr.some(function (item, index) {
    return arr.indexOf(item.toLowerCase()) !== index;
  });
};

var validateHashtags = function () {
  var hashTags = hashTagsInput.value.split(' ');
  for (var i = 0; i < hashTags.length; i++) {
    if (hashTags[i].charAt(0) !== '#') {
      hashTagsInput.setCustomValidity('Хэш-тег должен начинаться с символа # (решётка)');
    }
    if (hashTags[i] === '#') {
      hashTagsInput.setCustomValidity('Хэш-тег не может состоять только из одной решётки');
    }
    if (hashTags[i].charAt(0) !== '#') {
      hashTagsInput.setCustomValidity('Хэш-тег должен начинаться с решётки');
    }
    if (hashTags.length > MAX_HASHTAGS_QTY) {
      hashTagsInput.setCustomValidity('Нельзя указывать больше ' + MAX_HASHTAGS_QTY + ' хэш-тегов');
    }
    if (hashTags[i].length > MAX_HASHTAGS_LENGTH) {
      hashTagsInput.setCustomValidity('Максимальная длина одного хэш-тега не более ' + MAX_HASHTAGS_LENGTH + ' символов, включая решётку');
    }
    if ((hashTags[i].match(/#/g)).length > 1) {
      hashTagsInput.setCustomValidity('Хэш-теги должны разделяться пробелами');
    }
    if (hasDuplicates(hashTags)) {
      hashTagsInput.setCustomValidity('Один и тот же хэш-тег не может быть использован дважды');
    }
  }
  return hashTagsInput.reportValidity();
};

var validateDescription = function () {
  if (descriptionInput.value.length > MAX_DESCR_LENGTH) {
    descriptionInput.setCustomValidity('Длина комментария не может составлять больше ' + MAX_DESCR_LENGTH + ' символов');
  }
  return descriptionInput.reportValidity();
};

hashTagsInput.addEventListener('change', function () {
  validateHashtags();
});

descriptionInput.addEventListener('change', function () {
  validateDescription();
});

// Filter Slider

var getDefaultSlider = function () {
  effectLevelPin.style.left = EFFECT_LINE_WIDTH + 'px';
  effectLevelDeapth.style.width = EFFECT_LINE_WIDTH + 'px';
};

getDefaultSlider();

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


effectLevelPin.addEventListener('mousedown', function (evt) {
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

    effectLevelPin.style.left = (effectLevelPin.offsetLeft - shift.x) + 'px';
    var effectLevelPinPosition = parseInt(effectLevelPin.style.left, 10);
    var filterNumber = effectLevelPinPosition * 100 / EFFECT_LINE_WIDTH;

    if (effectLevelPinPosition >= EFFECT_LINE_WIDTH) {
      effectLevelPin.style.left = EFFECT_LINE_WIDTH + 'px';
    }

    if (effectLevelPinPosition < 1) {
      effectLevelPin.style.left = 0;
    }

    effectLevelDeapth.style.width = effectLevelPin.style.left;
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

  var onMouseUp = function (upEvt) {
    upEvt.preventDefault();

    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  };

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
});
