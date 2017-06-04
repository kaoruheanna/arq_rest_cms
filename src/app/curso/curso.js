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
            //materiaId: null,
            //cursoId: null,
            link: null
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
        $state.go('curso', { cursoId: model.id });
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
                $scope.inscriptos = data.inscriptos;
            }, function(err){
                console.log("fallo!!!");
            }
        );
    };

    fetchData();

    $scope.destroy = function(model){
        soapApi.desinscribir(model.remove,
            function(data){
                fetchData();
            }, function(err){
                console.log("fallo!!!");
            }
        );
    };

    $scope.add = function(){
        //$state.go('inscribir', { materiaId: $state.params.materiaId, cursoId: $state.params.cursoId, link: link });
        $state.go('inscribir', { link: link });
    };
})

.controller( 'InscribirCtrl', function CursoController( $scope, soapApi, $state ) {
    $scope.candidatos = [];
    $scope.alumnoId = null;
    var addUrl = null;

    var fetchData = function(){
        soapApi.candidatosCurso(
            //$state.params.materiaId,
            //$state.params.cursoId,
            $state.params.link,
            function(data){
                $scope.candidatos = data.candidatos;
                addUrl = data.add;
            }, function(err){
                console.log("fallo!!!");
            }
        );
    };

    fetchData();

    $scope.submit = function(){
        soapApi.inscribir(
            addUrl,
            $scope.alumnoId,
            function(data){
                $state.go( $state.previous.name, $state.previous.params );
            }, function(err){
                console.log("fallo!");
            }
        );
        console.log("alumno: ",$scope.alumnoId);
    };
})

;

