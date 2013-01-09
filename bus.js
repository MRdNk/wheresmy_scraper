
function Bus () {
  var that = this;

  that.service = null;
  that.operator = null;
  that.area = null;
  that.routeName = null;

  return that;

}

Bus.prototype.add = function (service, routeName, operator, area) {
  this.service = service;
  this.routeName = routeName;
  this.operator = operator;
  this.area = area;
};

Bus.prototype.setService = function (service) {
  this.service = service;
};

Bus.prototype.setRouteName = function (routeName) {
  this.routeName = routeName;
};

module.exports = Bus;