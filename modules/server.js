var http = require('http');
var handlers = require('./handlers')
var gallery = require('./gallery');
var colors = require('colors');

function start() {
    function requestListner(request, response) {
        console.log(colors.blue(request.url + ' request recieved'));
        response.setHeader('Content-Type', 'text/plain; charset=utf-8');

        //gallery uploader
        var files = handlers.uploaded();
        files.forEach(function(element, index) {
            if (request.url == '/gallery/' + element) {
                handlers.show(request, response, element);
            }
        });
        switch (request.url) {
            case '/':
            case '/start':
                handlers.loadhtml(request, response, 'start');
                break;
            case '/upload':
                handlers.upload(request, response);
                break;
            case '/show':
                handlers.show(request, response);
                break;
            case '/css/start':
                handlers.loadcss(request, response, 'start');
                break;
            case '/css/upload':
                handlers.loadcss(request, response, 'uploadGalleryStyles');
                break;
            case '/gallery':
                gallery.start(request, response);
                break;
            case '/favicon.ico':
                handlers.favicon(request, response);
                break;
            default:
                if ((request.url).includes('/gallery/')) {

                } else {
                    handlers.error(request, response);
                }
                break;
        }
    }
    http.createServer(requestListner).listen(9000);
    console.log('Launched'.green);
}
exports.start = start;
