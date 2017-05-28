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
        url: '/materia',
        views: {
            "main": {
                controller: 'MateriaCtrl',
                templateUrl: 'curso/materia.tpl.html'
            }
        },
        params: {
            materiaId: null
        },
        data:{ pageTitle: 'Materia' }
    });

    $stateProvider.state( 'curso', {
        url: '/curso',
        views: {
            "main": {
                controller: 'CursoCtrl',
                templateUrl: 'curso/curso.tpl.html'
            }
        },
        params: {
            materiaId: null,
            cursoId: null
        },
        data:{ pageTitle: 'Curso' }
    });

    $stateProvider.state( 'inscribir', {
        url: '/inscribir',
        views: {
            "main": {
                controller: 'InscribirCtrl',
                templateUrl: 'curso/inscribir.tpl.html'
            }
        },
        params: {
            materiaId: null,
            cursoId: null
        },
        data:{ pageTitle: 'Inscribir' }
    });
})

/**
 * And of course we define a controller for our route.
 */
.controller( 'MateriaCtrl', function MateriaController( $scope, materiaApi, $state ) {
    $scope.models = [];
    materiaApi.cursosForMateria(
        $state.params.materiaId,
        function(data){
            $scope.models = data;
        }, function(err){
            console.log("fallo!!!");
        }
    );

    $scope.edit = function(model){
        $state.go('curso', { materiaId: $state.params.materiaId, cursoId: model.id });
    };
})

.controller( 'CursoCtrl', function CursoController( $scope, materiaApi, $state ) {
    $scope.models = [];

    var fetchData = function(){
        materiaApi.inscriptosCurso(
            $state.params.materiaId,
            $state.params.cursoId,
            function(data){
                console.log("data:",data);
                $scope.models = data;
            }, function(err){
                console.log("fallo!!!");
            }
        );
    };

    fetchData();

    $scope.destroy = function(model){
        materiaApi.desinscribir($state.params.materiaId,$state.params.cursoId, model.id,
            function(data){
                fetchData();
            }, function(err){
                console.log("fallo!!!");
            }
        );
    };

    $scope.add = function(){
        $state.go('inscribir', { materiaId: $state.params.materiaId, cursoId: $state.params.cursoId });
    };
})

.controller( 'InscribirCtrl', function CursoController( $scope, materiaApi, $state ) {
    $scope.candidatos = [];
    $scope.alumnoId = null;

    var fetchData = function(){
        materiaApi.candidatosCurso(
            $state.params.materiaId,
            $state.params.cursoId,
            function(data){
                console.log("data:",data);
                $scope.candidatos = data;
            }, function(err){
                console.log("fallo!!!");
            }
        );
    };

    fetchData();

    $scope.submit = function(){
        materiaApi.inscribir(
            $state.params.materiaId,
            $state.params.cursoId,
            $scope.alumnoId,
            function(data){
                $state.go('curso', { materiaId: $state.params.materiaId, cursoId: $state.params.cursoId });
            }, function(err){
                console.log("fallo!");
            }
        );
        console.log("alumno: ",$scope.alumnoId);
    };
})

;

