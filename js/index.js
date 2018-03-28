"use strict";

if (window.File && window.FileReader && window.FileList && window.Blob) {
  console.log('HTML5 File API поддерживается в вашем браузере');
} else {
  alert('HTML5 File API не поддерживается данным браузером');
}

var browseBtn = document.querySelector('#browse-btn'),
    mediaInput = document.querySelector('#main-media-input');
browseBtn.addEventListener('click', function () {
  mediaInput.click();
});
var files,
    fileStack = [];

function fileHandler(e) {
  files = e.target.files;

  for (var f, i = 0; f = files[i]; i++) {
    if (!f.type.match('image.*')) {
      alert('К конвертации допускаются только изображения');
      return false;
    }

    var reader = new FileReader();

    reader.onload = function (img) {
      return function (e) {
        var filePreview = document.createElement('div');
        filePreview.classList.add('col-md-4');
        filePreview.classList.add('preview-container');
        filePreview.innerHTML = ["\n                <img data-id=\"".concat(img.name, "\" class=\"img-preview\" src=\"").concat(e.target.result, "\" />\n                ")].join('');
        document.querySelector('.result-area').insertBefore(filePreview, null);
        fileStack.push(img);
        var baseHolder = document.createElement('input');
        baseHolder.classList.add('base-holder');
        baseHolder.setAttribute('data-id', img.name);
        baseHolder.value = e.target.result;
        filePreview.insertBefore(baseHolder, null);
      };
    }(f);

    reader.readAsDataURL(f);
    var small = document.querySelector('small');
    small.style.display = 'none';
  }
}

document.querySelector('#main-media-input').addEventListener('change', fileHandler, false);