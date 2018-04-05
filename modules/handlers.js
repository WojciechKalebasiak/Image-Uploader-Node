var fs = require('fs');
var formidable = require('formidable');
var colors = require('colors');

function upload(request, response) {
    console.log('Start uploading'.yellow);
    var form = new formidable.IncomingForm();
    form.parse(request, function(err, fields, files) {
        fs.renameSync(files.upload.path, './uploaded/' + fields.title);
        response.setHeader('Content-Type', 'text/html; charset=utf-8');
        response.write('<h1>recieved img</h1>');
        response.write('<img src="/show"/>');
        response.end();

    })
}

function welcome(request, response) {
    console.log('Welcome'.green);
    response.setHeader('Content-Type', 'text/html; charset=utf-8');
    fs.readFile('./templates/htmltemplates/start.html', 'utf-8', function(err, htmlData) {
        if (err) throw err;
        response.write(htmlData);
        response.end();
    });
}

function loadcss(request, response) {
    response.setHeader('Content-Type', 'text/css; charset=utf-8');
    fs.readFile('./templates/csstemplates/start.css', 'utf-8', function(err, cssData) {
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

function show(request, response) {
    fs.readFile('./uploaded/me', 'binary', function(err, file) {
        response.setHeader('Content-Type', 'image/png');
        response.write(file, 'binary');
        response.end();
    });
}
module.exports = {
    upload: upload,
    welcome: welcome,
    error: error,
    show: show,
    loadcss: loadcss

}