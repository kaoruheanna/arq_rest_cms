angular.module( 'ngBoilerplate.curso', [
    'ui.router',
    'api.materia'
])

/**
 * Each section or module of the site can also have its own routes. AngularJS
 * will handle ensuring they are all available at run-time, but splitting it
 * this way makes each module more "self-contained".
 */
.config(function config( $stateProvider ) {
    $stateProvider.state( 'materia', {
        //url: '/materia/{parent_id:[0-9]+}/curso',
        url: '/materia',
        views: {
            "main": {
                controller: 'CursoCtrl',
                templateUrl: 'curso/curso.tpl.html'
            }
        },
        params: {
            materiaId: null
        },
        data:{ pageTitle: 'Curso' }
    });
})

/**
 * And of course we define a controller for our route.
 */
.controller( 'CursoCtrl', function CursoController( $scope, materiaApi, $state ) {
    $scope.models = [];
    materiaApi.cursosForMateria(
        $state.params.materiaId,
        function(data){
            $scope.models = data;
        }, function(err){
            console.log("fallo!!!");
        }
    );
})

;

