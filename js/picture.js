'use strict';

(function () {
  var RANDOM_PHOTO_QTY = 10;

  var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

  var photoSort = document.querySelector('.img-filters');

  var renderPhoto = function (photo) {
    var pictureElement = pictureTemplate.cloneNode(true);
    var pictureImg = pictureElement.querySelector('.picture__img');
    var pictureLikes = pictureElement.querySelector('.picture__likes');
    var pictureComments = pictureElement.querySelector('.picture__comments');
    pictureImg.src = photo.url;
    pictureComments.textContent = photo.comments.length;
    pictureLikes.textContent = photo.likes;
    pictureImg.link = photo;
    return pictureElement;
  };

  var picturesBlock = document.querySelector('.pictures');

  var onPhotosLoad = function (photos) {
    var fragment = document.createDocumentFragment();
    photos.forEach(function (el) {
      fragment.appendChild(renderPhoto(el));
      picturesBlock.appendChild(fragment);
    });
    window.getPreviews();
    photoSort.classList.remove('img-filters--inactive');

    var photosArr = Array.from(photos);

    var randomizePhotos = window.debounce(function () {
      var loadedPhotos = document.querySelectorAll('.picture');

      loadedPhotos.forEach(function (el) {
        el.remove();
      });

      var photosToShow = photosArr.slice();

      photosToShow.sort(function () {
        return 0.5 - Math.random();
      });
      photosToShow.splice(RANDOM_PHOTO_QTY);
      photosToShow.forEach(function (el) {
        fragment.appendChild(renderPhoto(el));
        picturesBlock.appendChild(fragment);
      });
      window.getPreviews();
    });

    var randomPhotosButton = document.querySelector('#filter-random');
    var discussedPhotosButton = document.querySelector('#filter-discussed');
    var popularPhotosButton = document.querySelector('#filter-popular');

    var sortButtons = document.querySelectorAll('.img-filters__button');

    var activateSortButton = function (evt) {
      var activeSortButton = document.querySelector('.img-filters__button--active');
      activeSortButton.classList.remove('img-filters__button--active');
      evt.target.classList.add('img-filters__button--active');
    };

    var onSortButtonClick = function (evt) {
      activateSortButton(evt);
    };

    sortButtons.forEach(function (el) {
      el.addEventListener('click', onSortButtonClick);
    });

    var onRandomizeButtonClick = function () {
      randomizePhotos();
    };

    randomPhotosButton.addEventListener('click', onRandomizeButtonClick);

    var sortPhotosInDescendingOrder = window.debounce(function (arr) {

      var photosToShow = arr.slice();
      photosToShow.sort(function (a, b) {
        return a.comments.length > b.comments.length ? -1 : 1;
      });

      var loadedPhotos = document.querySelectorAll('.picture');
      loadedPhotos.forEach(function (el) {
        el.remove();
      });

      for (var i = 0; i < photosToShow.length; i++) {
        fragment.appendChild(renderPhoto(photosToShow[i]));
      }
      picturesBlock.appendChild(fragment);
      window.getPreviews();
    });

    var onDiscussedButtonClick = function () {
      sortPhotosInDescendingOrder(photosArr);
    };

    discussedPhotosButton.addEventListener('click', onDiscussedButtonClick);

    var getPopularPhotos = window.debounce(function () {
      var loadedPhotos = document.querySelectorAll('.picture');
      loadedPhotos.forEach(function (el) {
        el.remove();
      });
      photos.forEach(function (el) {
        fragment.appendChild(renderPhoto(el));
        picturesBlock.appendChild(fragment);
      });
      window.getPreviews();
    });

    var onPopularButtonClick = function () {
      getPopularPhotos();
    };

    popularPhotosButton.addEventListener('click', onPopularButtonClick);
  };

  var onPhotosLoadError = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  window.backend.load(onPhotosLoad, onPhotosLoadError);

})();
