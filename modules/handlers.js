var fs = require('fs');
var formidable = require('formidable');
var colors = require('colors');
var path = require('path');
var uuid = require('uuid');
var name;

function upload(request, response) {
    console.log('Start uploading image...'.yellow);
    var form = new formidable.IncomingForm();
    form.parse(request, function(err, fields, files) {
        var tmpName = fields.title || uuid.v4();
        fs.renameSync(files.upload.path, path.resolve(__dirname, '../uploaded/' + tmpName));
        name = tmpName;
        console.log(colors.green('Image ' + name + ' uploaded \n'));
    });
    loadhtml(request, response, 'upload');
}

function loadhtml(request, response, template) {
    response.setHeader('Content-Type', 'text/html; charset=utf-8');
    fs.readFile(path.resolve(__dirname, '../templates/htmltemplates/' + template + '.html'), 'utf-8', function(err, htmlData) {
        if (err) throw err;
        response.write(htmlData);
        response.end();
    });
}

function loadcss(request, response, template) {
    response.setHeader('Content-Type', 'text/css; charset=utf-8');
    fs.readFile(path.resolve(__dirname, '../templates/csstemplates/' + template + '.css'), 'utf-8', function(err, cssData) {
        if (err) throw err;
        response.write(cssData);
        response.end();
    });
}

function favicon(request, response) {
    fs.readFile(path.resolve(__dirname, '../favicon/favicon.png'), 'binary', function(err, file) {
        if (err) throw err;
        response.setHeader('Content-Type', 'image/png');
        response.write(file, 'binary');
        response.end();
    });
}

function error(request, response) {
    console.log('Error'.red);
    response.write('There was some error');
    response.end();
}

function show(request, response, fileName = name) {
    fs.readFile(path.resolve(__dirname, '../uploaded/' + fileName), 'binary', function(err, file) {
        if (err) throw err;
        response.setHeader('Content-Type', 'image/png');
        response.write(file, 'binary');
        response.end();
    });
}

function uploaded() {
    var files = fs.readdirSync('./uploaded');
    return files;
}
module.exports = {
    upload: upload,
    loadhtml: loadhtml,
    error: error,
    show: show,
    uploaded: uploaded,
    loadcss: loadcss,
    favicon: favicon
}
