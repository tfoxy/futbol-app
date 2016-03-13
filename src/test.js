const moduleContext = require.context('./app', true, /\.module\.js$/);
moduleContext.keys().forEach(moduleContext);

const testsContext = require.context('./app', true, /\.spec\.js$/);
testsContext.keys().forEach(testsContext);
