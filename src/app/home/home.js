/**
 * Each section of the site has its own module. It probably also has
 * submodules, though this boilerplate is too simple to demonstrate it. Within
 * `src/app/home`, however, could exist several additional folders representing
 * additional modules that would then be listed as dependencies of this one.
 * For example, a `note` section could have the submodules `note.create`,
 * `note.delete`, `note.edit`, etc.
 *
 * Regardless, so long as dependencies are managed correctly, the build process
 * will automatically take take of the rest.
 *
 * The dependencies block here is also where component dependencies should be
 * specified, as shown below.
 */
angular.module( 'ngBoilerplate.home', [
    'ui.router',
    'api.materia'
])

/**
 * Each section or module of the site can also have its own routes. AngularJS
 * will handle ensuring they are all available at run-time, but splitting it
 * this way makes each module more "self-contained".
 */
.config(function config( $stateProvider ) {
    $stateProvider.state( 'home', {
        url: '/home',
        views: {
            "main": {
                controller: 'HomeCtrl',
                templateUrl: 'home/home.tpl.html'
            }
        },
        data:{ pageTitle: 'Home' }
    });
})

/**
 * And of course we define a controller for our route.
 */
.controller( 'HomeCtrl', function HomeController( $scope, materiaApi ) {
    
    $scope.models = [];
    materiaApi.list(function(data){
        $scope.models = data;
    }, function(err){
        console.log("fallo!!!");
    });

    /*
    $scope.getAlltickersForActivo = function(params,callback){
          session.getAuthorizationHeader(function(err,token){
           if(err){
            callback(err);
            return;
           }
            $http({
              method: 'GET',
              url: config.apiUrl+'/activo/ticker',
              params: params,
              headers: {
             'Authorization': token
            }
          })
          .then(
            function(promise){
              var res = promise.data;
              if(res.error){
                callback(res.error);
              } else {
                callback(null, res.data, res.page, res.lastPage);
              }
          },
          callback
          );
        });
       };
    */
})

;

