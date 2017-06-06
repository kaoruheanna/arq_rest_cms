angular.module( 'ngBoilerplate.curso', [
    'ui.router',
    'app.soapApi'
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
            cursoId: null,
            materiaId: null
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
.controller( 'MateriaCtrl', function MateriaController( $scope, soapApi, $state ) {
    $scope.models = [];
    soapApi.cursosForMateria(
        $state.params.materiaId,
        function(data){
            $scope.models = data;
        }, function(err){
            console.log("fallo!!!");
        }
    );

    $scope.edit = function(model){
        $state.go('curso', { cursoId: model.id, materiaId: model.materiaId });
    };
})

.controller( 'CursoCtrl', function CursoController( $scope, soapApi, $state ) {
    $scope.inscriptos = [];
    $scope.curso = null;
    
    var fetchData = function(){
        soapApi.inscriptosCurso(
            $state.params.cursoId,
            function(data){
                $scope.curso = data.curso;
                if (data.inscriptos){
                    $scope.inscriptos = Array.isArray(data.inscriptos) ? data.inscriptos : [data.inscriptos];    
                }
            }, function(err){
                console.log("fallo!!!");
            }
        );
    };

    fetchData();

    $scope.destroy = function(model){
        soapApi.desinscribir(model.id,
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

.controller( 'InscribirCtrl', function CursoController( $scope, soapApi, $state ) {
    $scope.candidatos = [];
    $scope.alumnoId = null;
    
    var fetchData = function(){
        soapApi.candidatosCurso(
            $state.params.materiaId,
            function(data){
                if (data.candidatos){
                    $scope.candidatos = Array.isArray(data.candidatos) ? data.candidatos : [data.candidatos];    
                }
            }, function(err){
                console.log("fallo!!!");
            }
        );
    };

    fetchData();

    $scope.submit = function(){
        soapApi.inscribir(
            $state.params.cursoId,
            $scope.alumnoId,
            function(data){
                $state.go( $state.previous.name, $state.previous.params );
            }, function(err){
                console.log("fallo!");
            }
        );
    };
})

;

