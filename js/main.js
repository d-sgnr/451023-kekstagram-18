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

var commentTemplate = document.querySelector('.social__comment');

var getRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min) + min);
};

var getRandomElement = function (arr) {
  return arr[Math.floor(Math.random() * arr.length)];
};

var getRandomMessage = function (messages) {
  var firstSentenceIndex = getRandomNumber(0, messages.length);
  var firstSentence = messages[firstSentenceIndex];
  var tempMessages = messages.slice();
  tempMessages.splice(firstSentenceIndex, 1);
  var isSecondSentenceNeeded = Math.round(Math.random());
  var secondSentence = isSecondSentenceNeeded ? ' ' + getRandomElement(tempMessages) : '';
  return firstSentence + secondSentence;
};

var getRandomComments = function () {
  var comments = [];
  for (var i = 0; i < COMMENTS_QUANTITY; i++) {
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
      description: 'Описание фотографии' + ' №' + i,
      likes: getRandomNumber(LIKES_MIN, LIKES_MAX),
      comments: getRandomComments()
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

var getPhotos = function () {
  var picturesBlock = document.querySelector('.pictures');
  var fragment = document.createDocumentFragment();
  var photos = generatePhotos(PHOTOS_QUANTITY);
  for (var i = 0; i < PHOTOS_QUANTITY; i++) {
    fragment.appendChild(renderPhoto(photos[i]));
  }
  picturesBlock.appendChild(fragment);
};

getPhotos();

//

var renderBigPhoto = function () {
  var photos = generatePhotos(PHOTOS_QUANTITY);
  var photo = photos[getRandomNumber(1, PHOTOS_QUANTITY)];
  var bigPictureBlock = document.querySelector('.big-picture');
  var bigPictureImg = document.querySelector('.big-picture__img img');
  var photoDescription = document.querySelector('.social__caption');
  bigPictureBlock.classList.remove('hidden');
  photoDescription.textContent = photo.description;
  bigPictureImg.src = photo.url;
};

var renderComment = function (comment) {
  var commentElement = commentTemplate.cloneNode(true);
  commentElement.querySelector('.social__comment img').src = comment.avatar;
  commentElement.querySelector('.social__comment img').alt = comment.name;
  commentElement.querySelector('.social__comment p').textContent = comment.message;
  return commentElement;
};

var getComments = function () {
  var commentsBlock = document.querySelector('.social__comments');
  var fragment = document.createDocumentFragment();
  var comments = getRandomComments(COMMENTS_QUANTITY);
  for (var i = 0; i < COMMENTS_QUANTITY; i++) {
    fragment.appendChild(renderComment(comments[i]));
  }
  commentsBlock.appendChild(fragment);
};

var hideDefaultElements = function () {
  var commentsCountBlock = document.querySelector('.social__comment-count');
  var commentsLoader = document.querySelector('.comments-loader');
  var commentsList = document.querySelector('.social__comments');
  var comments = document.querySelectorAll('.social__comment');
  commentsCountBlock.classList.add('visually-hidden');
  commentsLoader.classList.add('visually-hidden');
  commentsList.removeChild(comments[0]);
  commentsList.removeChild(comments[1]);
};

hideDefaultElements();
renderBigPhoto();
getComments();
