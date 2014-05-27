crawler = angular.module('crawler', []);

crawler.controller('SiteCtrl',['$scope',  function($scope){
  $scope.newSite = {};

  socket.get('/site', function(sites) {
    $scope.sites = sites;
    $scope.$apply();
  });

  $scope.add = function(site){
    socket.post('/site', $scope.newSite, function(savedSite){
      $scope.sites.push(savedSite);
      $scope.newSite = {};
      $scope.$apply();
    })
  };

  $scope.remove = function(site){
    var index = $scope.sites.indexOf(site);

    socket.delete('/site/' + site.id, function(response){
      $scope.sites.splice(index, 1);
      $scope.$apply();
    });
  };

  $scope.update = function(site){
    var index = $scope.sites.indexOf(site);

    socket.put('/site/' + site.id, site, function(){
      $scope.sites[index].name = site.name;
      $scope.$apply();
    });

  };

  $scope._open = {};
  $scope.open = function(site){
    $scope._open = site;
  };

  $scope.asd = function(){
    console.log('asd')
  }
}]);

