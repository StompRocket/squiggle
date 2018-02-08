console.log('Squiggle Init')
console.log('v0.1.1')
var chars = {
  ':n': 'ñ',
  ':a': 'à',
  ':e': 'é',
  ':i': 'í',
  ':o': 'ó',
  ':u': 'ú'
}
var getLocation = function(href) {
  var l = document.createElement("a");
  l.href = href;
  return l;
};

function getCaretPosition(editableDiv) {
  var caretPos = 0,
    sel, range
  if (window.getSelection) {
    sel = window.getSelection()
    if (sel.rangeCount) {
      range = sel.getRangeAt(0)
      if (range.commonAncestorContainer.parentNode == editableDiv) {
        caretPos = range.endOffset
      }
    }
  } else if (document.selection && document.selection.createRange) {
    range = document.selection.createRange()
    if (range.parentElement() == editableDiv) {
      var tempEl = document.createElement('span')
      editableDiv.insertBefore(tempEl, editableDiv.firstChild)
      var tempRange = range.duplicate()
      tempRange.moveToElementText(tempEl)
      tempRange.setEndPoint('EndToEnd', range)
      caretPos = tempRange.text.length
    }
  }
  return caretPos
}
String.prototype.allReplace = function(obj) {
  var retStr = this
  for (var x in obj) {
    retStr = retStr.replace(new RegExp(x, 'g'), obj[x])
  }
  return retStr
}
$(document).ready(function() {
  console.log('ready');
  $(':text, [type=search], textarea').keyup(function() {
    let current = $(this).val()
    //console.log(current)

    $(this).val(current.allReplace(chars))
  })
})

/*
$('[contenteditable="true"]').keyup(function() {

  console.log('Content Editble keydown')
  let current = this.innerHTML
  console.log(current)
  console.log('cursor pos ' + getCaretPosition(this))
  var caret = getCaretPosition(this); // insert caret after the 10th character say
  this.innerHTML = current.allReplace(chars)


})

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log(sender.tab ?
      "from a content script:" + sender.tab.url :
      "from the extension");
    if (request.message == "parse") {
      console.log(window.location.href)
      let url = String(window.location.href)
      let location = getLocation(url)
      console.log(location.hostname);
      if (location.hostname != 'graphitewriter.com' && location.hostname != 'docs.google.com') {
        console.log('parsing');
        let current = $('body')[0].innerHTML
        $('body')[0].innerHTML = current.allReplace(chars)
        sendResponse({
          message: "done"
        });
        $.alert({
          columnClass: 'small',
          title: 'Squiggle',
          content: 'yay! your document has been parsed!',
          type: 'green',
          boxWidth: '30%',
          useBootstrap: false,
          typeAnimated: true
        });
      } else {
        console.log('error');
        $.alert({
          columnClass: 'small',
          title: 'Error 😭',
          content: 'Uh oh, it looks like this is an unsupported domain. ',
          boxWidth: '30%',
          useBootstrap: false,
          type: 'red'
        });
        sendResponse({
          message: 'error',
          errorMessage: 'blacklisted domain'
        });
      }


    }
  });
  */