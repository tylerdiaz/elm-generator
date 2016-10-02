#!/usr/bin/env node

// maybe sourcePath as an argument?
var mkdirp = require('mkdirp');
var fs = require('fs');
var handlebars = require('handlebars');

var argv = require('yargs')
      .usage('Usage: $0 <component path/name>')
      .default('generator', 'Component')
      .demand(1)
      .argv;

var startPath = argv.path || process.cwd();
var componentPath = startPath + "/" + argv._[0];

function filePathToElmNamespace(filepath){
  return filepath.replace(/\/*$/, "").replace('/', '.');
}

mkdirp(componentPath, function (err) {
  if (err) {
    console.error(err);
  } else {
      var blueprintPath = __dirname + "/blueprints/" + argv.generator;
      var blueprints = fs.readdirSync(blueprintPath)

      for(var i = 0; i < blueprints.length; i++) {
        var data = fs.readFileSync(blueprintPath + "/" + blueprints[i], 'utf8')
        var template = handlebars.compile(data)
        try {
          fs.accessSync(componentPath + "/" + blueprints[i], fs.F_OK);
        } catch (e) {
          console.log('generating '+ componentPath + "/" + blueprints[i])
          fs.writeFileSync(
            componentPath + "/" + blueprints[i],
            template({"ComponentWithNamespace" : filePathToElmNamespace(argv._[0]) })
          );
        }
      }
  }
});

console.log("Job done.");
