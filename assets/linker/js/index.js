crawler = angular.module('crawler', []);

crawler.controller('SiteCtrl',['$scope', '$http', function($scope, $http){
  $scope.site = {};

  $http.get('/site').success(function(sites) {
    $scope.sites = sites;
  });

  $scope.addSite = function(){
    socket.post('/site', $scope.site, function(savedSite){
      $scope.sites.push(savedSite);
      $scope.site = {};
      $scope.$apply();
    })
  };

  $scope.removeSite = function(site){
    var index = $scope.sites.indexOf(site);

    socket.delete('/site/' + site.id, function(response){
      $scope.sites.splice(index, 1);
      $scope.$apply();
    });
  };

  $scope.updateSite = function($event, site){
    var index = $scope.sites.indexOf(site);
    site.name = $event.target.innerHTML;
    socket.put('/site/' + site.id, site, function(){
      $scope.sites[index].name = site.name;
      $scope.$apply();
    });

  };

}]);

