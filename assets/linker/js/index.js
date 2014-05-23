crawler = angular.module('crawler', []);

crawler.factory('siteFactory', function(){
  return {
    get: function(callback){ socket.get('/site', callback); }
  };
});

crawler.controller('SiteCtrl',['$scope', 'siteFactory', function($scope, siteFactory){
  $scope.newSite = {};

  siteFactory.get(function(sites) {
    $scope.sites = sites;
    $scope.$apply();
  });

  $scope.addSite = function(){
    socket.post('/site', $scope.newSite, function(savedSite){
      $scope.sites.push(savedSite);
      $scope.newSite = {};
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
    console.log('args')
    console.log(this)
    console.log(arguments)
    window.x = this
    window.y = arguments
    console.log('args')
    site.name = $event.target.value;
    socket.put('/site/' + site.id, site, function(){
      $scope.sites[index].name = site.name;
      $scope.$apply();
    });

  };

  $scope._openSite = {};
  $scope.openSite = function(site){
    $scope._openSite = site;
  };

  $scope.crawl = function($event, rule){
    var site = $scope._openSite;
    var index = site.crawlRules.indexOf(rule);
    site.crawlRules[index] = $event.target.innerHTML;

    socket.put('/site/' + site.id, site, function(){
      $scope.$apply();
    });

  };
}]);

