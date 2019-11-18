'use strict';

(function () {

  window.randomize = {
    number: function (min, max) {
      return Math.floor(Math.random() * (max - min) + min);
    },
    element: function (arr) {
      return arr[Math.floor(Math.random() * arr.length)];
    }
  };

})();
