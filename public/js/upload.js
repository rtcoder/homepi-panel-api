

/**
 *
 * @param {string} url
 * @param {File} file
 * @param {Object|null} body
 * @param {Object} [listeners]
 * @param {Function=} listeners.onError
 * @param {Function=} listeners.onAbort
 * @param {Function=} listeners.onLoad
 * @param {Function=} listeners.onLoadStart
 * @param {Function=} listeners.onLoadEnd
 * @param {Function=} listeners.onProgress
 * @param {Function=} listeners.onTimeout
 * @returns {XMLHttpRequest}
 */
function upload(url, file, body = null, listeners = {}) {
  const xhr = new XMLHttpRequest();

  xhr.open('POST', url, true);
  xhr.setRequestHeader('Accept', 'application/json')
  xhr.responseType = 'json';

  if (listeners.onError) {
    xhr.addEventListener('error', listeners.onError);
  }

  if (listeners.onAbort) {
    xhr.addEventListener('abort', listeners.onAbort);
  }

  if (listeners.onLoad) {
    xhr.addEventListener('load', listeners.onLoad);
  }

  if (listeners.onLoadStart) {
    xhr.addEventListener('loadstart', listeners.onLoadStart);
  }

  if (listeners.onLoadEnd) {
    xhr.addEventListener('loadend', listeners.onLoadEnd);
  }

  if (listeners.onTimeout) {
    xhr.addEventListener('timeout', listeners.onTimeout);
  }

  if (xhr.upload && listeners.onProgress) {
    xhr.upload.addEventListener('progress', listeners.onProgress);
  }

  const data = new FormData();
  data.append('file', file);
  const token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
  data.append('_token', token);

  if (body) {
    Object.keys(body).forEach(key => {
      if (body.hasOwnProperty(key)) {
        data.append(key, body[key]);
      }
    })
  }

  xhr.send(data);

  return xhr;
}