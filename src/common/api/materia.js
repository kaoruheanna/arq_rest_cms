angular.module( 'api.materia', [ 'app.api'] )

.service('materiaApi',function(api){

	this.list = function(successCallback,errorCallback){
		api.getRequest('/materia',successCallback,errorCallback);
	};
	/*

	this.getInfoLocal = function(localId,successCallback,errorCallback){
		var url = '/api.php/locales/'+localId;
		api.requestWithAuthenticate(null,url,successCallback,errorCallback);
	};

	this.getTipoComidas = function(successCallback,errorCallback){
		var url = '/api.php/locales/tipocomidas';
		api.requestWithAuthenticate(null,url,successCallback,errorCallback);
	}

	this.addLocal = function(params,successCallback,errorCallback){
		var url = '/api.php/locales/add';
		api.requestWithAuthenticate(params,url,successCallback,errorCallback);
	}

	this.getComentariosForLocal = function(localId,page,successCallback,errorCallback){
		var url = '/api.php/locales/'+ localId +'/comments';
		var params = {
			'page' : page
		};
		api.requestWithAuthenticate(params,url,successCallback,errorCallback);
	}

	this.publishLocal = function(params,localId,successCallback,errorCallback){
		var url = '/api.php/locales/'+localId+'/comment';
		api.requestWithAuthenticate(params,url,successCallback,errorCallback);			
	}

	this.checkinLocal = function(localId,successCallback,errorCallback){
		var url = '/api.php/locales/'+localId+'/checkin';
		api.requestWithAuthenticate(null,url,successCallback,errorCallback);
	}

	this.checkoutLocal = function(localId,successCallback,errorCallback){
		var url = '/api.php/locales/'+localId+'/checkout';
		api.requestWithAuthenticate(null,url,successCallback,errorCallback);
	}

	// ciudad -> estado -> municipip -> colonia	
	this.getAddressesForCP = function(cp,successCallback,errorCallback){
		var url = '/api.php/locales/addresses';
		var params = {
			'cp' : cp
		};
		api.requestWithAuthenticate(params,url,
			function(data){
				if (!data){
					errorCallback('inexistent');
					return;
				}
				var ciudades = {};
				data.forEach(function(item){
					var nombreCiudad = item.nombre_ciudad.value;
					var nombreEstado = item.nombre_estado.value;
					var nombreMunicipio = item.nombre_municipio.value;
					var nombreColonia = item.nombre_colonia.value;

					var ciudad = ciudades.hasOwnProperty(nombreCiudad) ? ciudades[nombreCiudad] : {};
					ciudades[nombreCiudad] = ciudad;

					var estado = ciudad.hasOwnProperty(nombreEstado) ? ciudad[nombreEstado] : {};
					ciudad[nombreEstado] = estado;

					var municipio = estado.hasOwnProperty(nombreMunicipio) ? estado[nombreMunicipio] : [];
					estado[nombreMunicipio] = municipio;

					municipio.push(nombreColonia);
				});
				successCallback(ciudades);
			},
			errorCallback);			
	}
	*/
});