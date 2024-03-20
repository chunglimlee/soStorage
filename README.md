# soStorage
soStorage is a small single file and a zero dependent JavaScript library that provides an offline Local Storage alike in browsers with native indexedDB's data storage advantages.
It aims to be simple to use with supports to callbacks, promises, and async/await.

### Importing the library into projects
<script src="soStorage.js"></script>

### API
Uses a name to value system.

Please note that each domain has its own unique set of name to value.  It is a security feature inherited from indexedDB to ensure that there is no Cross-Origin Resource Sharing CORS.

For the followings,
```
"name" is a string.

"value" is any native JavaScript data types.

"callback_function" is optional.  It is a user provided function that it will be called upon the completion of the API commands.
```

Get a value by name

`soStorage.get(name, callback_function);`

Set a value by name

`soStorage.set(name, value, callback_function);`

Get a list of all available pairs (name to value)

`soStorage.list(callback_function)`

remove a value by name

`soStorage.remove(name, callback_function);`

clear all pairs (name to value)

`soStorage.clear(callback_function);`

### Callback style usage

```
soStorage.get('item', function(result) {

  // do something with the "result"
  console.log(result);

});
```

### Promise style usage

```
soStorage.get('item').then(function(result) {

  // do something with the "result"
  console.log(result);

});
```

### Async/Await style usage

```
async function myFunction() {

  var result = await soStorage.get('item');

  // do something with the "result"
  console.log(result);

});
```
