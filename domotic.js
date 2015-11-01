module.exports = {
  gpio : require('pi-gpio'),

  config : {},
  watches : [],

  init : function () {
    var that = this;
    for (item in this.config) {
      this.gpio.close(this.config[item].pin);
      this.gpio.open(this.config[item].pin, this.config[item].mode, function() {
        if (that.config[item].mode == 'output') {
          that.set(item, that.config[item].state);
        }
      });
    }
  },

  set : function (item, state, callback) {
    if (this.config[item].mode == "output") {
      var that = this;
      this.gpio.write(this.config[item].pin, state, function () {
        that.config[item].state = state;
        if (callback) callback.call();
      });
    }
  },

  watch : function (pin, state, code, callback) {
    var that = this;
    this.watches[code] = setTimeout(function () {
      that.gpio.read(pin, function(err, value) {
        if (value = state && callback) callback.call();
      });
    }, 50);
  },

  unwatch : function (code, callback) {
    clearInterval(this.watches[code]);
    this.watches[code] = null;
    if (callback) callback.call();
  }
};
