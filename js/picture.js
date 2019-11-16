'use strict';

(function () {
  var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
  var photoSort = document.querySelector('.img-filters');

  var renderPhoto = function (photo) {
    var pictureElement = pictureTemplate.cloneNode(true);
    pictureElement.querySelector('.picture__img').src = photo.url;
    pictureElement.querySelector('.picture__comments').textContent = photo.comments.length;
    pictureElement.querySelector('.picture__likes').textContent = photo.likes;
    pictureElement.querySelector('.picture__img').link = photo;
    return pictureElement;
  };

  var picturesBlock = document.querySelector('.pictures');

  var successHandler = function (photos) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < photos.length; i++) {
      fragment.appendChild(renderPhoto(photos[i]));
    }
    picturesBlock.appendChild(fragment);
    window.getPreviews();
    photoSort.classList.remove('img-filters--inactive');

    var photosArr = Array.from(photos);

    var randomizePhotos = window.debounce(function () {
      var loadedPhotos = document.querySelectorAll('.picture');

      loadedPhotos.forEach(function (el) {
        el.remove();
      });

      var newArr = photosArr.slice();

      newArr.sort(function () {
        return 0.5 - Math.random();
      });
      newArr.splice(10);
      for (i = 0; i < newArr.length; i++) {
        fragment.appendChild(renderPhoto(newArr[i]));
      }
      picturesBlock.appendChild(fragment);
      window.getPreviews();
    });

    var randomPhotosButton = document.getElementById('filter-random');
    var discussedPhotosButton = document.getElementById('filter-discussed');
    var popularPhotosButton = document.getElementById('filter-popular');

    var sortButtons = document.querySelectorAll('.img-filters__button');

    var activateSortButton = function () {
      sortButtons.forEach(function (el) {
        el.classList.remove('img-filters__button--active');
      });
      event.target.classList.add('img-filters__button--active');
    };

    sortButtons.forEach(function (el) {
      el.addEventListener('click', activateSortButton);
    });

    randomPhotosButton.addEventListener('click', randomizePhotos);

    var sortPhotosInDescendingOrder = window.debounce(function (arr) {

      var newArr = arr.slice();
      newArr.sort(function (a, b) {
        return a.comments.length > b.comments.length ? -1 : 1;
      });

      var loadedPhotos = document.querySelectorAll('.picture');
      loadedPhotos.forEach(function (el) {
        el.remove();
      });

      for (i = 0; i < newArr.length; i++) {
        fragment.appendChild(renderPhoto(newArr[i]));
      }
      picturesBlock.appendChild(fragment);
      window.getPreviews();
    });

    discussedPhotosButton.addEventListener('click', function () {
      sortPhotosInDescendingOrder(photosArr);
    });

    var getPopularPhotos = window.debounce(function () {
      var loadedPhotos = document.querySelectorAll('.picture');
      loadedPhotos.forEach(function (el) {
        el.remove();
      });
      for (i = 0; i < photos.length; i++) {
        fragment.appendChild(renderPhoto(photos[i]));
      }
      picturesBlock.appendChild(fragment);
      window.getPreviews();
    });

    popularPhotosButton.addEventListener('click', getPopularPhotos);
  };

  var errorHandler = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  window.backend.load(successHandler, errorHandler);

})();
