var http = require('http');
var handlers = require('./handlers')
var gallery = require('./gallery');
var files = handlers.uploaded();

function start() {
    function requestListner(request, response) {
        console.log('Request recieved'.blue);
        response.setHeader('Content-Type', 'text/plain; charset=utf-8');

        //gallery uploader
        files.forEach(function(element, index) {
            if (request.url == '/gallery/' + element) {
                handlers.show(request, response, element);
            }
        });
        switch (request.url) {
            case '/':
            case '/start':
                handlers.loadhtml(request, response, 'start');
                gallery.generate();
                break;
            case '/upload':
                handlers.upload(request, response);
                gallery.generate();
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