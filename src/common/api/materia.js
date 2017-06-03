angular.module( 'api.materia', [ 'app.api'] )

.service('materiaApi',function(api){

	this.list = function(successCallback,errorCallback){
		api.getRequest('/materia',successCallback,errorCallback);
	};

	this.cursosForMateria = function(materiaId, successCallback, errorCallback){
		var url = '/materia/'+materiaId+'/curso';
		api.getRequest(url,successCallback,errorCallback);
	};

	this.inscriptosCurso = function(materiaId, cursoId, successCallback, errorCallback){
		var url = '/materia/'+materiaId+'/curso/'+cursoId;
		api.getRequest(url,successCallback,errorCallback);
	};

	this.desinscribir = function(materiaId, cursoId, inscripcionId, successCallback, errorCallback){
		var url = '/materia/'+materiaId+'/curso/'+cursoId+'/inscripcion/'+inscripcionId;
		api.deleteRequest(url,successCallback,errorCallback);	
	};

	this.candidatosCurso = function(materiaId, cursoId, successCallback, errorCallback){
		var url = '/materia/'+materiaId+'/curso/'+cursoId+'/inscripcion';
		api.getRequest(url,successCallback,errorCallback);
	};
	
	this.inscribir = function(materiaId, cursoId, alumnoId, successCallback, errorCallback){
		var url = '/materia/'+materiaId+'/curso/'+cursoId+'/inscripcion';
		var data = {
			alumnoId: alumnoId,
			cursoId: cursoId
		};
		api.postRequest(url, data, successCallback,errorCallback);
	};

});