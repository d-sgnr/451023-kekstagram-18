'use strict';

(function () {
  var successHandler = function () {

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
      if (loadedComments.length > 5) {
        loadMoreCommentsButton.classList.remove('visually-hidden');
      }
      var hiddenComments = loadedComments.slice(5);
      hiddenComments.forEach(function (el) {
        el.classList.add('visually-hidden');
      });
      var loadMoreComments = function () {
        var commentsToLoad = hiddenComments.splice(0, 5);
        commentsToLoad.forEach(function (el) {
          el.classList.remove('visually-hidden');
        });
        if (commentsToLoad.length <= 5) {
          loadMoreCommentsButton.classList.add('visually-hidden');
        }
      };
      loadMoreCommentsButton.addEventListener('click', loadMoreComments);
    };

    window.getData = function (photo) {
      var photoDescription = document.querySelector('.social__caption');
      var photoLikes = document.querySelector('.likes-count');
      photoDescription.textContent = photo.description;
      photoLikes.textContent = photo.likes;
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
