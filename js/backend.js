'use strict';

(function () {
  var STATUS_OK = 200;
  var TIMEOUT_GET = 10000;
  var TIMEOUT_POST = 0;
  var METHOD_GET = 'GET';
  var METHOD_POST = 'POST';
  var URL_GET = 'https://js.dump.academy/kekstagram/data';
  var URL_POST = 'https://js.dump.academy/kekstagram';

  var xhrSet = function (onSuccess, onError, method, url, timeout, datum) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {
      if (xhr.status === STATUS_OK) {
        onSuccess(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });
    xhr.timeout = timeout; // 10s
    xhr.open(method, url);
    xhr.send(datum);
  };

  window.backend = {
    load: function (onSuccess, onError) {
      xhrSet(onSuccess, onError, METHOD_GET, URL_GET, TIMEOUT_GET);
    },
    save: function (datum, onSuccess, onError) {
      xhrSet(onSuccess, onError, METHOD_POST, URL_POST, TIMEOUT_POST, datum);
    }
  };
})();
