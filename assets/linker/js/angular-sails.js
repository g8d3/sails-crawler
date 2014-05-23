angularSails = function(angularApp, sailsSocket){
  angularApp.factory('socket', function(){
    return {
      socket: sailsSocket
    }
  });
};
