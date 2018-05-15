function growingIo () {
  var _vds = _vds || [];
  window._vds = _vds;
  (function(){
    var key = getKey()
    _vds.push(['setAccountId', key]);
    _vds.push(['enableHT', true]);
    (function() {
      var vds = document.createElement('script');
      var libraryFile = 'assets.growingio.com/vds.js'
      vds.type='text/javascript';
      vds.async = true;
      vds.src = ('https:' == document.location.protocol ? 'https://' : 'http://') + libraryFile;
      var s = document.getElementsByTagName('script')[0];
      s.parentNode.insertBefore(vds, s);
    })();
    function getKey () {
      var baseUrl = window.location.origin || window.location.host
      if (baseUrl.indexOf('dev') > -1) {
        return 'a509b3f9badec11d'
      } else if (baseUrl.indexOf('t.dui.ai') > -1) {
        return 'a509b3f9badec11d'
      } else if (baseUrl.indexOf('beta') > -1) {
        return 'a509b3f9badec11d'
      } else if (baseUrl.indexOf('dui.ai') > -1) {
        return '8dbfb0987863dbc0'
      } else if (baseUrl.indexOf('172.16.') > -1) {
        return 'a509b3f9badec11d'
      } else {
        return 'a509b3f9badec11d'
      }
    }
  })();
}

export default {
    growingIo
}