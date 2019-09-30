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

var PHOTOS_COUNT = 25;
var COMMENTS_COUNT = 12;
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
  return arr[Math.floor(Math.random() * arr.length)];
};

var getRandomMessage = function (arr) {
  var shuffledArray = arr.sort(function () {
    return 0.5 - Math.random();
  });
  var cutArray = shuffledArray.slice(0, getRandomNumber(1, 3));
  var randomMessage = '';
  if (cutArray.length > 1) {
    randomMessage = cutArray[0] + ' ' + cutArray[1];
  } else {
    randomMessage = cutArray[0];
  }
  return randomMessage;
};

var getRandomComments = function () {
  var comments = [];
  for (var i = 0; i < COMMENTS_COUNT; i++) {
    var commentItem = {
      avatar: 'img/avatar-' + getRandomNumber(AVATAR_MIN, AVATAR_MAX) + '.svg',
      message: getRandomMessage(COMMENTS_TEXT),
      name: getRandomString(AUTHORS_NAMES)
    };
    comments.push(commentItem);
  }
  var randomComments = [];
  var randomCommentsCount = getRandomNumber(1, 10);
  for (i = 0; i < randomCommentsCount; i++) {
    randomComments.push(comments[Math.floor(Math.random() * comments.length)]);
  }
  return randomComments;
};

var generatePhotos = function (photosCount) {
  var photos = [];
  for (var i = 1; i <= photosCount; i++) {
    var photosItem = {
      url: 'photos/' + i + '.jpg',
      description: 'Описание фотографии' + i,
      likes: getRandomNumber(LIKES_MIN, LIKES_MAX),
      comments: getRandomComments()
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
