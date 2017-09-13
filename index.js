#!/usr/bin/env node --harmony

let program = require('commander');
let chalk = require('chalk');
let scanPath = '';
let pwd = process.cwd();

let fs = require('fs');
let pathLib = require('path');

// anaylyze arguments
program
    .arguments('<targetDir>')
    .action(function(targetDir) {
        scanPath = targetDir;
    })
    .option('-f, --file [file]', 'the file name generated. Defaut to bower.json')
    .option('-p, --path [path]', 'the path of the generated file. Defaut to the current woring directory')
    .parse(process.argv);

if ('undefined' === scanPath || '' === scanPath) {
    console.error(chalk.red(`<targetDir> must be specified. see bowerfg --help.`));
    process.exit(1);
}

program.file = undefined === program.file ? 'bower_list.txt' : program.file;
program.file = `${undefined === program.path ? pwd : program.path}/${program.file}`;

// traverse the target directory
// Windows?
let win32 = process.platform === 'win32';
// Normalize \\ paths to / paths.
function unixifyPath(filepath) {
    if (win32) {
        return filepath.replace(/\\/g, '/');
    } else {
        return filepath;
    }
};

// Recurse into a directory, executing callback for each file.
function walk(rootdir, callback, subdir) {
    var abspath = subdir ? pathLib.join(rootdir, subdir) : rootdir;
    fs.readdirSync(abspath).forEach(function(filename) {
        var filepath = pathLib.join(abspath, filename);
        if (fs.statSync(filepath).isDirectory()) {
            walk(rootdir, callback, unixifyPath(pathLib.join(subdir || '', filename || '')));
        } else {
            callback(unixifyPath(filepath), rootdir, subdir, filename);
        }
    });
};

if (fs.existsSync(program.file)) {
	fs.unlinkSync(program.file);
}

walk(scanPath, function(filepath, rootdir, subdir, filename) {
    if ('.bower.json' === filename) {
        fs.readFile(filepath, (err, data) => {
            if (err) throw err;
            let jsonData = JSON.parse(data);


            fs.appendFile(program.file, `${jsonData.name}: ${jsonData.version}\n`, (err) => {
                if (err) throw err;
            });
        });
    }
});