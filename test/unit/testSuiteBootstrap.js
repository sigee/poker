var globals = require('./globals.json');

function defineGlobal(path) {
    return path.split('.').reduce(function (obj, name) {
        obj[name] = obj[name] || {};
        return obj[name];
    }, global);
}

function unsetGlobal(path) {
    var namepaths = path.split('.').map(function (name, index, whole) {
        return whole.slice(0, index).concat(name).join('.')
    }).reverse();

    for (var i = 0; i < namepaths.length; i++) {
        var namepathChunks = namepaths[i].split('.');
        var key = namepathChunks.slice(-1);
        var object = namepathChunks.slice(0, -1).reduce(function (obj, key) {
            return obj[key];
        }, global);

        delete object[key];

        if (Object.keys(object).length > 0) {
            break;
        }
    }
}

globals.forEach(defineGlobal);
global.window = global;
global.defineGlobal = defineGlobal;
global.unsetGlobal = unsetGlobal;

afterEach(function () {
    globals.forEach(unsetGlobal);
    globals.forEach(defineGlobal);
});