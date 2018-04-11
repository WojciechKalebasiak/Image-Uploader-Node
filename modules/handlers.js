var fs = require('fs');
var formidable = require('formidable');
var colors = require('colors');
var gallery = require('./gallery')
var name;

function upload(request, response) {
    console.log('Start uploading'.yellow);
    var form = new formidable.IncomingForm();
    form.parse(request, function(err, fields, files) {
        fs.renameSync(files.upload.path, './uploaded/' + fields.title);
        name = fields.title;
    });
    loadhtml(request, response, 'upload');
}

function loadhtml(request, response, template) {
    response.setHeader('Content-Type', 'text/html; charset=utf-8');
    fs.readFile('./templates/htmltemplates/' + template + '.html', 'utf-8', function(err, htmlData) {
        if (err) throw err;
        response.write(htmlData);
        response.end();
    });
}

function loadcss(request, response, template) {
    response.setHeader('Content-Type', 'text/css; charset=utf-8');
    fs.readFile('./templates/csstemplates/' + template + '.css', 'utf-8', function(err, cssData) {
        if (err) throw err;
        response.write(cssData);
        response.end();
    });
}

function error(request, response) {
    console.log('Error'.red)
    response.write('There was some error');
    response.end();
}

function show(request, response, fileName = name) {
    fs.readFile('./uploaded/' + fileName, 'binary', function(err, file) {
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
    loadcss: loadcss
}