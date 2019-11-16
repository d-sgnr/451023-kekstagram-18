'use strict';

(function () {

  window.getPreviews = function () {

    var bigPictureBlock = document.querySelector('.big-picture');

    var renderBigPhoto = function (photo) {
      var bigPictureImg = document.querySelector('.big-picture__img img');
      bigPictureBlock.classList.remove('hidden');
      bigPictureBlock.scrollTo(0, 0);
      bigPictureImg.src = photo;
    };

    var openBigPicture = function () {
      event.preventDefault();
      var oldComments = document.querySelectorAll('.social__comment');
      if (oldComments.length !== 0) {
        oldComments.forEach(function (el) {
          el.remove();
        });
      }

      var miniaturePicture = event.currentTarget.querySelector('.picture__img').src;

      var clickedPhoto = event.currentTarget.querySelector('.picture__img').link;

      hideDefaultElements();
      renderBigPhoto(miniaturePicture);
      window.getData(clickedPhoto);
      window.getComments(clickedPhoto);
      bigPictureBlock.classList.remove('hidden');
      document.addEventListener('keydown', closeBigPictureOnEsc);
      closeBigPictureButton.addEventListener('keydown', closeBigPictureOnEnter);
    };

    var onMiniPictureEnterPress = function (evt) {
      window.util.isEnterEvent(evt, openBigPicture);
    };

    var closeBigPictureButton = document.querySelector('.big-picture__cancel');

    var deleteBigPhoto = function () {
      var bigPictureImg = document.querySelector('.big-picture__img img');
      bigPictureImg.src = '';
    };

    var closeBigPicture = function () {
      bigPictureBlock.classList.add('hidden');
      document.removeEventListener('keydown', closeBigPictureOnEsc);
      closeBigPictureButton.removeEventListener('keydown', closeBigPictureOnEnter);
      deleteBigPhoto();
    };

    var closeBigPictureOnEsc = function (evt) {
      window.util.isEscEvent(evt, closeBigPicture);
    };

    var closeBigPictureOnEnter = function (evt) {
      window.util.isEnterEvent(evt, closeBigPicture);
    };

    var hideDefaultElements = function () {
      var commentsCountBlock = document.querySelector('.social__comment-count');
      var commentsLoader = document.querySelector('.comments-loader');
      commentsCountBlock.classList.add('visually-hidden');
      commentsLoader.classList.add('visually-hidden');
    };

    var miniPictures = document.querySelectorAll('.picture');

    miniPictures.forEach(function (el) {
      el.addEventListener('click', openBigPicture);
      el.addEventListener('keydown', onMiniPictureEnterPress);
    });

    closeBigPictureButton.addEventListener('click', function () {
      closeBigPicture();
    });
  };
})();
