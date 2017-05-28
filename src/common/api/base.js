angular.module( 'app.api', [] )

.service('api', [
	'$http',
	function($http){
		
		var API_URL = 'http://localhost:9000';

		var getRequest = function(url, successCallback, errorCallback){
			$http({
				method: 'GET',
				url: API_URL+url ,
				headers: {
					'Content-Type': 'application/json'
				}
			})
			.then(
				function(promise){
					var res = promise.data;
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

		var deleteRequest = function(url, successCallback, errorCallback){
			$http({
				method: 'DELETE',
				url: API_URL+url ,
				headers: {
					'Content-Type': 'application/json'
				}
			})
			.then(
				function(promise){
					var res = promise.data;
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

		return {
			getRequest: getRequest,
			deleteRequest: deleteRequest
		};

	}
])

;