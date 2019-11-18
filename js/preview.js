'use strict';

(function () {

  var SCROLL_X = 0;
  var SCROLL_Y = 0;

  window.getPreviews = function () {

    var pageBody = document.body;

    var bigPictureBlock = document.querySelector('.big-picture');

    var renderBigPhoto = function (photo) {
      var bigPictureImg = document.querySelector('.big-picture__img img');
      bigPictureBlock.classList.remove('hidden');
      bigPictureBlock.scrollTo(SCROLL_X, SCROLL_Y);
      bigPictureImg.src = photo;
    };

    var openBigPicture = function () {
      pageBody.classList.add('modal-open');
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
      closePreviewButton.addEventListener('keydown', closeBigPictureOnEnter);
    };

    var onMiniPictureClick = function () {
      openBigPicture();
    };

    var onMiniPictureEnterPress = function (evt) {
      window.util.isEnterEvent(evt, openBigPicture);
    };

    var closePreviewButton = document.querySelector('.big-picture__cancel');

    var deleteBigPhoto = function () {
      var bigPictureImg = document.querySelector('.big-picture__img img');
      bigPictureImg.src = '';
    };

    var closeBigPicture = function () {
      pageBody.classList.remove('modal-open');
      pageBody.removeAttribute('class');
      bigPictureBlock.classList.add('hidden');
      document.removeEventListener('keydown', closeBigPictureOnEsc);
      closePreviewButton.removeEventListener('keydown', closeBigPictureOnEnter);
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
      el.addEventListener('click', onMiniPictureClick);
      el.addEventListener('keydown', onMiniPictureEnterPress);
    });

    var onPreviewCloseButtonClick = function () {
      closeBigPicture();
    };

    closePreviewButton.addEventListener('click', onPreviewCloseButtonClick);
  };
})();
