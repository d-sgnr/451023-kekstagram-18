'use strict';

(function () {
  var PHOTOS_QUANTITY = 25;
  var LIKES_MIN = 15;
  var LIKES_MAX = 200;

  var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

  window.generatePhotos = function (photosCount) {
    var photos = [];
    for (var i = 1; i <= photosCount; i++) {
      photos.push({
        url: 'photos/' + i + '.jpg',
        description: 'Описание фотографии' + ' №' + i,
        likes: window.randomize.number(LIKES_MIN, LIKES_MAX),
        comments: window.getRandomComments()
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

  var picturesBlock = document.querySelector('.pictures');

  var getPhotos = function () {
    var fragment = document.createDocumentFragment();
    var photos = window.generatePhotos(PHOTOS_QUANTITY);
    for (var i = 0; i < PHOTOS_QUANTITY; i++) {
      fragment.appendChild(renderPhoto(photos[i]));
    }
    picturesBlock.appendChild(fragment);
  };

  getPhotos();
})();
