var nodeio = require('node.io');
exports.job = new nodeio.Job({

  input: false,
  run: function () {

    var url = this.options.args[0];
    this.getHtml(url, function (err, $) {
      if (err) { this.exit(err); }

      var stopRefs = [];
    var table = $('div#centreblock table');
    

    table.children.each(function (data) {
      var row = data.children[1].children;

      if(row[0].type === 'tag') {
        stopRefs.push (row[0].children[0].data);
      } else if (typeof row[1] === 'undefined') {
        // heading row
      } else {
        stopRefs.push (row[1].children[0].data);
      }

      // console.log('each naptan');
    });
      this.emit(stopRefs);
      // this.emit(rows);
    });
  }

});
