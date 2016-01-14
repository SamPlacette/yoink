var window = require('window-shim')

/**
 * Downloads content to the user's file system.
 * @param {object} params
 * @param {string} [params.filename="download"] - name of the downloaded file
 * Note, the filename may not be honored in some browsers (e.g., Safari).
 * @param {string} [params.contentType="application/octet-stream"] -
 * IANA media type.
 * @param {string} [params.encoding] - Encoding type, e.g. "base64"
 * @param {string} params.data - contents of file to be downloaded
 * @throws {Error} - Will throw an error if `yoink` is not supported
 * on the current user-agent
 */
var yoink = function yoink (params) {
  if (! yoink.canYoink()) {
    throw new Error('This user-agent does not support downloading dynamic data')
  }

  var filename = params.filename || 'download'
  var contentType = params.contentType || 'application/octet-stream'
  var encoding = params.encoding || null
  var data = params.data

  // Prefer to use `msSaveBlob` if available because
  // A) The utility is designed for precisely this use case, and
  // B) Common browsers which support `msSaveBlob` (MSIE and MS Edge)
  //    do not support the data URL method.
  if (window.navigator.msSaveBlob) {
    var blobSource
    if (encoding == 'base64') {
      // In order to support non-text content types like images,
      // we must convert the data to binary and then create
      // a `Blob` object with the appropriate content-type.
      // See technique discussed in more detail at
      // http://stackoverflow.com/questions/16245767/creating-a-blob-from-a-base64-string-in-javascript/16245768#16245768
      var byteString = atob(data)
      var byteNumbers = new Array(byteString.length)
      console.log('byteString.length', byteString.length)
      console.log('byteNumbers.length', byteNumbers.length)
      for (var index = 0; index < byteNumbers.length; index++) {
        byteNumbers[index] = byteString.charCodeAt(index)
      }
      var byteArray = new Uint8Array(byteNumbers)
      blobSource = [byteArray]
    }
    else {
      blobSource = [data]
    }
    var blob = new Blob(blobSource, {type: contentType})
    window.navigator.msSaveBlob(blob, filename)
  }
  else {
    // Create link to specified data.
    var anchor = window.document.createElement('a')

    if ('download' in anchor) {
      anchor.download = filename
    } else {
      // Some user-agents do not support the download attribute.
      // For these user-agents, the media type of the URL
      // must be a type which the user-agent will
      // download instead of opening within a new tab.
      // "application/octet-stream" is a commonly used MIME type
      // for this purpose, but Safari will not download this
      // content-type. The "attachment" type forces a download.
      contentType = 'attachment/octet-stream'
    }
    anchor.href = 'data:' +
      contentType + (encoding ? (';' + encoding) : '') + ',' +
      data
    anchor.innerText = filename

    // Programmatically click the link, then remove it.
    var body = window.document.getElementsByTagName('body')[0]
    body.appendChild(anchor)
    if (anchor.click) {
      anchor.click()
    }
    else {
      var clickEvent = document.createEvent('HTMLEvents');
      clickEvent.initEvent('click', true, true); 
      anchor.dispatchEvent(clickEvent);
    }
    body.removeChild(anchor)
  }
}

/**
 * @return {boolean} - if `yoink` lib is supported on this user-agent
 */
yoink.canYoink = function canYoink () {
  // Only scenario where we cannot yoink is when
  // user is on a version of IE which does not support the
  // `msSaveBlob` API.
  return ! (
    window &&
    window.navigator &&
    window.navigator.userAgent &&
    window.navigator.userAgent.match(/MSIE/) &&
    (! window.navigator.msSaveBlob)
  )
}

module.exports = yoink
