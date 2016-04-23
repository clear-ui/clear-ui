// All test files must be placed in dir '__test__' or have name '__test__.js'
var context = require.context('./src', true, /__test__/)
context.keys().forEach(context)
