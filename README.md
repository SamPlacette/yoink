# Yoink!

Yoink is a javascript lib enabling client apps running in the browser
to download arbitrary content (both text and binary) to the user's
file system.

## What it is

The main Yoink method accepts four parameters:

 * `data`: the content of the file to be downloaded
 * `encoding`: the encoding of the data; the only supported values
   are `undefined` and `"base64"`; defaults to `undefined` (unencoded)
 * `contentType`: the content-type of the downloaded file; should be a
   valid IANA media type, e.g., "image/png" or "text/plain"; defaults
   to "application/octet-stream"
 * `filename`: the desired name of the downloaded file; defaults to
   `"download"`

Example:

    require('yoink')({
      data: 'Hello World!',
      contentType: 'text/plain',
      filename: 'yoink.txt'
    })

It is also possible to query the user-agent for support at runtime.

Example:

    require('yoink').canYoink() // returns a Boolean value indicating support

See `test/index.js` for a working example.

## How it do

In most browsers, Yoink will create a hidden anchor element with a
dynamic data URL and programmatically click it to force a download.

In Microsoft browsers, Yoink will use Microsoft's proprietary
`msSaveBlob` API to initiate a download.

Yoink is a CommonJS module and may be embedded within a browser
using tools like Browserify or Webpack.

## Restrictions

Yoink does not work in IE versions 9 and below.

In Safari, the `filename` parameter is ignored and the downloaded
file will have a name of "Unknown" with no .extension.

## Development

    npm install
    npm start
    open http://localhost:9966
