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

      var pics = document.querySelectorAll('.picture');
      var arrayElem = [];

      var getIndex = function () {
        for (var i = 0; i < pics.length; i++) {
          arrayElem.push(pics[i]);
          var index = arrayElem.indexOf(event.currentTarget);
        }
        return index;
      };

      hideDefaultElements();
      renderBigPhoto(miniaturePicture);
      window.getData(getIndex());
      window.getComments(getIndex());
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
      deleteBigPhoto();
    };

    var closeBigPictureOnEnter = function (evt) {
      window.util.isEnterEvent(evt);
      deleteBigPhoto();
    };

    var hideDefaultElements = function () {
      var commentsCountBlock = document.querySelector('.social__comment-count');
      var commentsLoader = document.querySelector('.comments-loader');
      commentsCountBlock.classList.add('visually-hidden');
      commentsLoader.classList.add('visually-hidden');
    };

    var miniPictures = document.querySelectorAll('.picture');

    miniPictures.forEach(function (el) {
      el.addEventListener('click', onMiniPictureClicked);
      el.addEventListener('keydown', onMiniPictureEnterPress);
    });

    closeBigPictureButton.addEventListener('click', function () {
      closeBigPicture();
    });
  };
  // window.backend.load(getMiniatures);
  // // window.xhr.addEventListener('load', getMiniatures);
})();
