var nodeio = require('node.io');
var Bus = require('./bus.js');

exports.services = function (url, cb) {
  nodeio.scrape( function () {
    this.getHtml(url, function (err, $) {
      if (err) { console.log(err); }

      var tr = $('.Section1 table tr');
      var i = 1;
      var busServices = [];

      for (i; i < tr.length; i++) {
        var bus = new Bus();

        var service   = (tr[i].children[0].children[0].children[0].children[0].data);
        var routeName = (tr[i].children[1].children[0].children[0].children[0].data);
        var operator  = (tr[i].children[2].children[0].children[0].children[0].data);
        var area      = (tr[i].children[3].children[0].children[0].children[0].data);

        bus.add(service, routeName, operator, area);

        busServices.push(bus);
      }

      cb(null, busServices);

    });
  });
};