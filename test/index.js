var yoinkit = require('yoinkit')

document.getElementsByTagName('body')[0].innerHTML = [
  '<style type="text/css">',
    'label, textarea { display: block; }',
    'form { margin: 2em; }',
  '</style>',

  '<h1>Yoinkit!</h1>',
  '<p><strong>Can I Yoink it?</strong> <span id="can-yoinkit"></span></p>',

  '<button id="apply-text-values">Apply Text Values</button>',
  '<button id="apply-image-values">Apply Image Values</button>',
  
  '<form id="yoinkit-form">',
    '<label for="filename">Filename:<br/>',
      '<input id="filename" value="yoinkit.txt" />',
    '</label>',
    '<label for="content-type">Content Type:<br/>',
      '<input id="content-type" value="text/plain" />',
    '</label>',
    '<label for="encoding">Encoding (optional):<br/>',
      '<input id="encoding" value="" />',
    '</label>',
    '<label for="data">Data:',
      '<textarea id="data">Hello World!</textarea>',
    '</label>',
    '<button id="yoinkit">Yoinkit!</button>',
  '</form>'
].join('\n')

document.getElementById('can-yoinkit').innerText =
  yoinkit.canYoinkit() ? 'Yes you can!' : 'Bummer... no yoinkit here.'

var filenameField = document.getElementById('filename')
var contentTypeField = document.getElementById('content-type')
var encodingField = document.getElementById('encoding')
var dataField = document.getElementById('data')

document.getElementById('apply-text-values').addEventListener('click',
  function applyTextValues() {
    filenameField.value = 'yoinkit.txt'
    contentTypeField.value = 'text/plain'
    encodingField.value = ''
    dataField.value = 'Hello World!'
  }
)

document.getElementById('apply-image-values').addEventListener('click',
  function applyImageValues() {
    filenameField.value = 'yoinkit.png'
    contentTypeField.value = 'image/png'
    encodingField.value = 'base64'
    // From https://en.wikipedia.org/wiki/Data_URI_scheme
    dataField.value = 'iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbybl' +
      'AAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAA' +
      'BJRU5ErkJggg=='
  }
)

document.getElementById('yoinkit-form').addEventListener('submit',
  function submitYoinkitForm(event) {
    event.preventDefault()
    yoinkit({
      filename: filenameField.value,
      contentType: contentTypeField.value,
      encoding: encodingField.value,
      data: dataField.value
    })
    return false
  }
)
