var nodeio = require('node.io');
var Bus = require('./bus.js');


var Link = function (url, direction) {
  var that = this;
  return {
    url : url,
    direction: direction
  };
};
Link.prototype.addDirection = function(url, direction) {
  this.url = url;
  this.direction = direction;
};

exports.job = new nodeio.Job({

  input: false,
  run: function () {

    var url = this.options.args[0];
    this.getHtml(url, function (err, $) {
      if (err) { this.exit(err); }

      var tr = $('table tr');
      var iNoOfROws = tr.length;
      var iRow = 1;
      var serviceLinks = [];

      for (iRow; iRow < iNoOfROws; iRow ++) {
        if (getFullText(tr[iRow].children[0]) == 1) {
          var link = new Link();
          var serviceUrl = tr[iRow].children[2].children[0].attribs.href;
          // var serviceUrl = tr[iRow].children[2].children[0];
          var direction = tr[iRow].children[2].children[0].children[0].data;
          serviceLinks.push (serviceUrl, direction);
        }
      }
/*      if(iRow === iNoOfROws) {
        cb(null, serviceLinks);
      }*/

      this.emit(serviceLinks);
    });
  }

});

function getFullText (obj) {

  var fullText = '';
  if(typeof obj.children != "undefined") {
    var iNoOfChildren = obj.children.length;
    var i = 0;

    for(i; i < iNoOfChildren; i++) {
      if (obj.children[i].type === 'text') {
        fullText += obj.children[i].data.replace('\n', "");
      } else if (obj.children[i].type === 'tag') {
        fullText += getFullText(obj.children[i]);
      }
    }
  }
  fullText = fullText.replace(/&#8211;/g, '-');
  return fullText;
}
