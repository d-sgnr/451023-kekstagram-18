'use strict';

var AUTHORS_NAMES = ['Артем', 'Иван', 'Виталий', 'Виктор', 'Руслан', 'Руслан'];
var COMMENTS_TEXT = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

var PHOTOS_COUNT = 25;
var COMMENTS_COUNT = 12;
var PHOTO_MIN = 1;
var PHOTO_MAX = 25;
var AVATAR_MIN = 1;
var AVATAR_MAX = 6;
var LIKES_MIN = 15;
var LIKES_MAX = 200;

var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

var getRandomNumber = function (min, max) {
  var randomNumber = Math.floor(Math.random() * (max - min) + min);
  return randomNumber;
};

var getRandomString = function (arr) {
  var randomString = arr[Math.floor(Math.random() * arr.length)];
  return randomString;
};

var makeComments = function (commentsCount) {
  var comments = [];
  for (var i = 0; i < commentsCount; i++) {
    var commentItem = {
      avatar: 'img/avatar-' + getRandomNumber(AVATAR_MIN, AVATAR_MAX) + '.svg',
      message: getRandomString(COMMENTS_TEXT),
      name: getRandomString(AUTHORS_NAMES)
    };
    comments.push(commentItem);
  }
  return comments;
};

var getRandomComments = function (arr) {
  var randomComments = [];
  var randomCommentsCount = getRandomNumber(1, 10);
  for (var i = 0; i < randomCommentsCount; i++) {
    randomComments.push(arr[Math.floor(Math.random() * arr.length)]);
  }
  return randomComments;
};

var generatePhotos = function (photosCount) {
  var photos = [];
  for (var i = 0; i < photosCount; i++) {
    var comments = makeComments(COMMENTS_COUNT);
    var photosItem = {
      url: 'photos/' + getRandomNumber(PHOTO_MIN, PHOTO_MAX) + '.jpg',
      description: 'Описание фотографии',
      likes: getRandomNumber(LIKES_MIN, LIKES_MAX),
      comments: getRandomComments(comments)
    };
    photos.push(photosItem);
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
  var photos = generatePhotos(PHOTOS_COUNT);
  for (var i = 0; i < PHOTOS_COUNT; i++) {
    fragment.appendChild(renderPhoto(photos[i]));
  }
  return picturesBlock.appendChild(fragment);
};

getPhotos();
