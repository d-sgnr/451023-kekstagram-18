'use strict';

(function () {
  var AUTHORS_NAMES = ['Артем', 'Иван', 'Виталий', 'Виктор', 'Руслан', 'Дмитрий'];
  var COMMENTS_TEXT = [
    'Всё отлично!',
    'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
  ];
  var COMMENTS_QUANTITY = 12;
  var AVATAR_MIN = 1;
  var AVATAR_MAX = 6;

  var commentTemplate = document.querySelector('#comment').content.querySelector('.social__comment');

  var getRandomMessage = function (messages) {
    var firstSentenceIndex = window.randomize.number(0, messages.length);
    var firstSentence = messages[firstSentenceIndex];
    var tempMessages = messages.slice();
    tempMessages.splice(firstSentenceIndex, 1);
    var isSecondSentenceNeeded = Math.round(Math.random());
    var secondSentence = isSecondSentenceNeeded ? ' ' + window.randomize.element(tempMessages) : '';
    return firstSentence + secondSentence;
  };

  var renderComment = function (comment) {
    var commentElement = commentTemplate.cloneNode(true);
    commentElement.querySelector('.social__comment img').src = comment.avatar;
    commentElement.querySelector('.social__comment img').alt = comment.name;
    commentElement.querySelector('.social__comment p').textContent = comment.message;
    return commentElement;
  };

  window.getRandomComments = function () {
    var comments = [];
    for (var i = 0; i < COMMENTS_QUANTITY; i++) {
      var commentItem = {
        avatar: 'img/avatar-' + window.randomize.number(AVATAR_MIN, AVATAR_MAX) + '.svg',
        message: getRandomMessage(COMMENTS_TEXT),
        name: window.randomize.element(AUTHORS_NAMES)
      };
      comments.push(commentItem);
    }
    return comments;
  };

  window.getComments = function () {
    var commentsBlock = document.querySelector('.social__comments');
    var fragment = document.createDocumentFragment();
    var comments = window.getRandomComments(COMMENTS_QUANTITY);
    for (var i = 0; i < COMMENTS_QUANTITY; i++) {
      fragment.appendChild(renderComment(comments[i]));
    }
    commentsBlock.appendChild(fragment);
  };
})();
