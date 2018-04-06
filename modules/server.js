var http = require('http');
var handlers = require('./handlers')

function start() {
    function requestListner(request, response) {
        console.log('Request recieved'.blue);
        response.setHeader('Content-Type', 'text/plain; charset=utf-8');
        switch (request.url) {
            case '/':
            case '/start':
                handlers.welcome(request, response);
                break;
            case '/upload':
                handlers.upload(request, response);
                break;
            case '/show':
                handlers.show(request, response);
                break;  
            case '/csstemplates/start.css': 
            	handlers.loadcss(request, response);
                break;
            default:    
                handlers.error(request, response);
        }
    }
    http.createServer(requestListner).listen(9000);
    console.log('Launched'.green);
}
exports.start = start;