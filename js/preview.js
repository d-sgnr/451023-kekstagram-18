'use strict';

(function () {
  var PHOTOS_QUANTITY = 25;

  var miniPictures = document.querySelectorAll('.picture');

  var openBigPicture = function () {
    event.preventDefault();
    var miniaturePicture = event.currentTarget.querySelector('.picture__img').src;
    hideDefaultElements();
    renderBigPhoto(miniaturePicture);
    window.getComments();
    bigPictureBlock.classList.remove('hidden');
    document.addEventListener('keydown', closeBigPictureOnEsc);
    closeBigPictureButton.addEventListener('keydown', closeBigPictureOnEnter);
  };

  var onMiniPictureClicked = function () {
    openBigPicture();
  };

  var onMiniPictureEnterPress = function (evt) {
    window.util.isEnterEvent(evt, openBigPicture);
  };

  var closeBigPictureButton = document.querySelector('.big-picture__cancel');

  var closeBigPicture = function () {
    bigPictureBlock.classList.add('hidden');
    document.removeEventListener('keydown', closeBigPictureOnEsc);
    closeBigPictureButton.removeEventListener('keydown', closeBigPictureOnEnter);
  };

  var closeBigPictureOnEsc = function (evt) {
    window.util.isEscEvent(evt, closeBigPicture);
  };

  var closeBigPictureOnEnter = function (evt) {
    window.util.isEnterEvent(evt);
  };

  var bigPictureBlock = document.querySelector('.big-picture');

  var renderBigPhoto = function (miniature) {
    var photos = window.generatePhotos(PHOTOS_QUANTITY);
    var photo = photos[window.randomize.number(1, PHOTOS_QUANTITY)];
    var bigPictureImg = document.querySelector('.big-picture__img img');
    var photoDescription = document.querySelector('.social__caption');
    bigPictureBlock.classList.remove('hidden');
    photoDescription.textContent = photo.description;
    bigPictureImg.src = miniature;
  };

  var hideDefaultElements = function () {
    var commentsCountBlock = document.querySelector('.social__comment-count');
    var commentsLoader = document.querySelector('.comments-loader');
    commentsCountBlock.classList.add('visually-hidden');
    commentsLoader.classList.add('visually-hidden');
  };

  miniPictures.forEach(function (el) {
    el.addEventListener('click', onMiniPictureClicked);
    el.addEventListener('keydown', onMiniPictureEnterPress);
  });

  closeBigPictureButton.addEventListener('click', function () {
    closeBigPicture();
  });
})();
