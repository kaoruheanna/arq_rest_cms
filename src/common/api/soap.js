angular.module( 'app.soapApi', [] )

.service('soapApi', [
	'$http',
	function($http){
		
		var API_URL = 'http://localhost:9000';

		var makeRequest = function(url, successCallback, errorCallback){
			var x2js = new X2JS();
			var kao = {
				body: {
					nombre: 'Kaoruuuu',
					apellido: 'Heannaaaa'	
				}
			};
			var xmlData = x2js.json2xml_str( kao );
			//console.log("json:",jsonObj);


			//var data = '<body><nombre>Kaoru martin</nombre><apellido>heanna</apellido></body>';
			$http({
				method: 'POST',
				url: API_URL+url,
				data: xmlData,
				headers: {
					'Content-Type': 'application/xml'
				}
			})
			.then(
				function(promise){
					console.log("promise:",promise);
					var res = x2js.xml_str2json(promise.data);
					console.log("mande nombre:",res.root.name);
					console.log("mande Surname:",res.root.Surname);
					console.log("res:",res);
					/*
					var res = promise.data;
					if(res.error || !res.success){
						errorCallback(res.error);
					} else {
						successCallback(res.data);
					}
					*/
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

		return {
			makeRequest: makeRequest
		};

	}
])

;

