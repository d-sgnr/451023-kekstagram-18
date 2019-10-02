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

var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

var getRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min) + min);
};

var getRandomElement = function (arr) {
  return arr[Math.floor(Math.random() * arr.length)];
};

var getRandomMessage = function (messages) {
  var firstSentenceIndex = getRandomNumber(0, messages.length);
  var firstSentence = messages[firstSentenceIndex];
  messages.splice(firstSentenceIndex, 1);
  var isSecondSentenceNeeded = Boolean(Math.round(Math.random()));
  var secondSentence = isSecondSentenceNeeded ? ' ' + getRandomElement(messages) : '';
  return firstSentence + secondSentence;
};

var getRandomComments = function () {
  var comments = [];
  for (var i = 0; i < 5; i++) {
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
      description: 'Описание фотографии' + i,
      likes: getRandomNumber(LIKES_MIN, LIKES_MAX),
      comments: getRandomComments()
    })
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
  console.log(photos);
  for (var i = 0; i < PHOTOS_QUANTITY; i++) {
    fragment.appendChild(renderPhoto(photos[i]));
  }
  picturesBlock.appendChild(fragment);
};

getPhotos();
