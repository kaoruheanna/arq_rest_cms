angular.module( 'app.soapApi', [] )

.service('soapApi', [
	'$http',
	function($http){
		
		var API_URL = 'http://localhost:9000';
		var x2js = new X2JS();

		var parseBodyToSend = function(body){
			var envelope = {
				body: body
			};
			var jsonObj = {
				envelope: envelope
			};
			return x2js.json2xml_str(jsonObj);
		};

		var makeRequest = function(method, args, successCallback, errorCallback){
			var body = {};
			body[method]= args;
			var xmlData = parseBodyToSend(body);
			$http({
				method: 'POST',
				url: API_URL,
				data: xmlData,
				headers: {
					'Content-Type': 'application/xml'
				}
			})
			.then(
				function(promise){
					var data = x2js.xml_str2json(promise.data);
					var res = data.root;
					console.log("res:",res);
					if(res.error || !res.success){
						errorCallback(res.error);
					} else {
						successCallback(res.data);
					}
				},
				function(response){
					console.log("data:",response.data);
					console.log("status:",response.status);
					console.log("headers:",response.headers);
					console.log("config:",response.config);
					console.log("statusText:",response.statusText);
					errorCallback("request-fail");
				}
			);
		};

		var materiasList = function(successCallback,errorCallback){
			makeRequest('materiasList','',successCallback,errorCallback);
		};

		var cursosForMateria = function(materiaId, successCallback, errorCallback){
			var args = {
				materiaId: materiaId
			};
			makeRequest('cursosList',args,successCallback,errorCallback);
		};

		var inscriptosCurso = function(cursoId, successCallback, errorCallback){
			var args = {
				cursoId: cursoId
			};
			makeRequest('getCurso',args,successCallback,errorCallback);
		};

		var candidatosCurso = function(materiaId, successCallback, errorCallback){
			var args = {
				materiaId: materiaId
			};
			makeRequest('getCandidatos',args,successCallback,errorCallback);
		};
		
		var desinscribir = function(inscripcionId, successCallback, errorCallback){
			var args = {
				inscripcionId: inscripcionId
			};
			makeRequest('desinscribir',args, successCallback,errorCallback);
		};

		var inscribir = function(cursoId, alumnoId, successCallback, errorCallback){
			var args = {
				cursoId: cursoId,
				alumnoId: alumnoId
			};
			makeRequest('inscribir',args, successCallback,errorCallback);
		};
		

		return {
			materiasList: materiasList,
			cursosForMateria: cursosForMateria,
			inscriptosCurso: inscriptosCurso,
			candidatosCurso: candidatosCurso,
			desinscribir: desinscribir,
			inscribir: inscribir
		};

	}
])

;

