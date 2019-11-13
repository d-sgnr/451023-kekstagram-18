'use strict';

(function () {
  var successHandler = function (photos) {

    var commentTemplate = document.querySelector('#comment').content.querySelector('.social__comment');

    var renderComment = function (comment) {
      var commentElement = commentTemplate.cloneNode(true);
      commentElement.querySelector('.social__comment img').src = comment.avatar;
      commentElement.querySelector('.social__comment img').alt = comment.name;
      commentElement.querySelector('.social__comment p').textContent = comment.message;
      return commentElement;
    };

    window.getComments = function (index) {
      var commentsBlock = document.querySelector('.social__comments');
      var fragment = document.createDocumentFragment();
      for (var i = 0; i < photos[index].comments.length; i++) {
        fragment.appendChild(renderComment(photos[index].comments[i]));
      }
      commentsBlock.appendChild(fragment);
    };

    window.getData = function (index) {
      var photoDescription = document.querySelector('.social__caption');
      var photoLikes = document.querySelector('.likes-count');
      photoDescription.textContent = photos[index].description;
      photoLikes.textContent = photos[index].likes;
    };
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
