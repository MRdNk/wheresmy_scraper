var nodeio = require('node.io');
var Bus = require('./bus.js');

exports.job = new nodeio.Job({

  input: false,
  run: function () {

    var url = this.options.args[0];
    this.getHtml(url, function (err, $) {
      if (err) { this.exit(err); }

      var tr = $('.Section1 table tr');
      var busServices = [];
      var iRow = 1;
      
      for (iRow; iRow < tr.length; iRow++) {
        var bus = new Bus();

        var item = tr[iRow].children[1].children[0].children[0];

        var service   = getFullText (tr[iRow].children[0]);
        var routeName = getFullText (tr[iRow].children[1]);
        var operator  = getFullText (tr[iRow].children[2]);
        var area      = getFullText (tr[iRow].children[3]);

        bus.add(service, routeName, operator, area);

        busServices.push(bus);
      }

      this.emit(busServices);
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
