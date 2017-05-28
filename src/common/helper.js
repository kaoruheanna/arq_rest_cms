angular.module( 'cafci.balanceEntidadFactory', [ ] )

.factory('balanceEntidadFactory', [
	function(){
		var balance = {};

		function addBalance(interfaz){
			balance = interfaz;
		}


		function getBalance(i){
			return balance;
		}

		function removeBalance(){
			balance = {};
		}
		 
		return {
			addBalance: addBalance,
			getBalance: getBalance,
			removeBalance: removeBalance
		};
	}
])

;