angular.module( 'api.materia', [ 'app.api'] )

.service('materiaApi',function(api){

	this.list = function(successCallback,errorCallback){
		api.getRequest('/materia',successCallback,errorCallback);
	};

	this.cursosForMateria = function(link, successCallback, errorCallback){
		api.getRequest(link,successCallback,errorCallback);
	};

	this.inscriptosCurso = function(link, successCallback, errorCallback){
		api.getRequest(link,successCallback,errorCallback);
	};

	this.desinscribir = function(remove, successCallback, errorCallback){
		api.deleteRequest(remove,successCallback,errorCallback);	
	};

	this.candidatosCurso = function(link, successCallback, errorCallback){
		api.getRequest(link,successCallback,errorCallback);
	};
	
	this.inscribir = function(add, alumnoId, successCallback, errorCallback){
		var data = {
			alumnoId: alumnoId
		};
		api.postRequest(add, data, successCallback,errorCallback);
	};

});