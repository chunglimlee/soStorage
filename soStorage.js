// key to value concept similar to Local Storage (native indexedDB; inherited the advantages for advance data types as value, persistency and large storage)

let soStorage = {

	// user interfaces
	
	get: function(name, action) {	// get a specific key by the name

		return this.command('get', name, undefined, action);
	},

	list : function(action) {	// list of all keys with their respective values

		return this.command('list', undefined, undefined, action);
	},
	
	match: function(option, action) {	// match a range of keys and list their respective values (using indexedDB option syntax)

		return this.command('match', option, undefined, action);
	},	

	set: function(name, value, action) {	// set a key with value

		return this.command('set', name, value, action);
	},
	
	remove: function(name, action) {	// remove a key

		return this.command('remove', name, undefined, action);
	},
	
	clear: function(action) {	// clear all keys

		return this.command('clear', undefined, undefined, action);
	}	
};





// automatically runs and creates a "soStorage" database in indexedDB with a store called "entry" (when it does not already exist)

soStorage.open = function() {

	var connection = indexedDB.open('soStorage');
	var db;

	connection.onupgradeneeded = function(event) {

		db = event.target.result;
		db.createObjectStore('entry', {keyPath: "name"});
		db.close();
	};
}();





// main access to database based on a command and its related parameters (this supports callback, promise...then and async...await)
	
soStorage.command = function(command, parameter1, parameter2, parameter3) {

	var result_ready = new Promise(function(resolve, reject) {	

		var connection = indexedDB.open('soStorage');

		connection.onsuccess = function(event) {	
		
			var db = event.target.result;


			// set the corresponding indexedDB query based on the specified command
			
			if (command === 'get')
				var query = db.transaction('entry', 'readonly').objectStore('entry').get(parameter1);

			else if (command === 'list')
				var query = db.transaction('entry', 'readonly').objectStore('entry').getAll();

			else if (command === 'match')
				var query = db.transaction('entry', 'readonly').objectStore('entry').getAll(parameter1);

			else if (command === 'set')
				var query = db.transaction('entry', 'readwrite').objectStore('entry').put({name: parameter1, value: parameter2});

			else if (command === 'remove')			
				var query = db.transaction('entry', 'readwrite').objectStore('entry').delete(parameter1);

			else if (command === 'clear')			
				var query = db.transaction('entry', 'readwrite').objectStore('entry').clear();
				

						
			query.onsuccess = function(event) {
				
				var result = event.target.result;


				// attempt to return and access result
				
				try {

					if (command === 'get')
						resolve(result.value);
					else
						resolve(result);
				}
				
				catch(error) {	// this is for command 'get'
					
					console.log('soStorage: (' + command + ') has no results');
				}							



				// attempt to run the specified callback function
				
				try {
				
					if (parameter3 !== undefined && result !== undefined) {
					
						if (command === 'get')
							parameter3(result.value);
						else
							parameter3(result);
							
					}
				}
				
				catch(error) {
				
					console.log('soStorage: (' + command + ') callback fails');
				}
				
				
				db.close();
			}
		}

		connection.onerror = function(event) {
		
			console.log(action, 'failed', event);
		}
	});
	
	return result_ready;
}
