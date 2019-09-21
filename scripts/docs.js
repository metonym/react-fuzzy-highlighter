const shell = require('shelljs');

shell.rm('-rf', 'docs');
shell.cd('examples');
shell.exec('yarn build --public-url . -d ../docs --no-source-maps');
