'use strict';

(function () {

  var COMMENTS_FIRST_ITEM = 0;
  var COMMENTS_SHOW_QTY = 5;
  var ERROR_CONTAINER = 'div';
  var ERROR_POSITION = 'absolute';
  var ERROR_LEFT = 0;
  var ERROR_RIGHT = 0;
  var ERROR_FONT_SIZE = '30px';
  var ERROR_STYLE = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';

  var onPhotosLoad = function () {

    var commentTemplate = document.querySelector('#comment').content.querySelector('.social__comment');

    var renderComment = function (comment) {
      var commentElement = commentTemplate.cloneNode(true);
      commentElement.querySelector('.social__comment img').src = comment.avatar;
      commentElement.querySelector('.social__comment img').alt = comment.name;
      commentElement.querySelector('.social__comment p').textContent = comment.message;
      return commentElement;
    };

    window.getComments = function (photo) {
      var commentsBlock = document.querySelector('.social__comments');
      var fragment = document.createDocumentFragment();
      for (var i = 0; i < photo.comments.length; i++) {
        fragment.appendChild(renderComment(photo.comments[i]));
      }
      commentsBlock.appendChild(fragment);
      var loadedComments = Array.from(document.querySelectorAll('.social__comment'));
      var loadMoreCommentsButton = document.querySelector('.social__comments-loader');
      if (loadedComments.length > COMMENTS_SHOW_QTY) {
        loadMoreCommentsButton.classList.remove('visually-hidden');
      }
      var hiddenComments = loadedComments.slice(COMMENTS_SHOW_QTY);
      hiddenComments.forEach(function (el) {
        el.classList.add('visually-hidden');
      });
      var loadMoreComments = function () {
        var commentsToLoad = hiddenComments.splice(COMMENTS_FIRST_ITEM, COMMENTS_SHOW_QTY);
        commentsToLoad.forEach(function (el) {
          el.classList.remove('visually-hidden');
        });
        if (commentsToLoad.length < COMMENTS_SHOW_QTY - 1) {
          loadMoreCommentsButton.classList.add('visually-hidden');
        }
      };
      var onMoreCommentsClick = function () {
        loadMoreComments();
      };
      loadMoreCommentsButton.addEventListener('click', onMoreCommentsClick);
    };

    window.getData = function (photo) {
      var photoDescription = document.querySelector('.social__caption');
      var photoLikes = document.querySelector('.likes-count');
      photoDescription.textContent = photo.description;
      photoLikes.textContent = photo.likes;
    };
  };

  var onPhotosLoadError = function (errorMessage) {
    var node = document.createElement(ERROR_CONTAINER);
    node.style = ERROR_STYLE;
    node.style.position = ERROR_POSITION;
    node.style.left = ERROR_LEFT;
    node.style.right = ERROR_RIGHT;
    node.style.fontSize = ERROR_FONT_SIZE;

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  window.backend.load(onPhotosLoad, onPhotosLoadError);

})();
