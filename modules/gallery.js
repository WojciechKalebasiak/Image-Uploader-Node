 var fs = require('fs');
 var path = require('path');
 var color = require('colors');
 var files;

 //Setting event emmiter
 var EventEmitter = require('events').EventEmitter;
 var emitter = new EventEmitter();

 //Append to Gallery Event
 emitter.on('appendToGallery', function(data) {
     fs.appendFile(path.resolve(__dirname, '../templates/htmltemplates/gallery/gallery.html'), data, function(err) {
         if (err) throw err;
     });
 });

 function generate() {
     fs.writeFile(path.resolve(__dirname, '../templates/htmltemplates/gallery/gallery.html'), '', function(err) {
         if (err) throw err;
         console.log('Starting generate gallery...'.yellow);
         fs.readFile(path.resolve(__dirname, '../templates/htmltemplates/gallery/galleryheader.html'), 'utf-8', function(err, dataHeader) {
             if (err) throw err;
             emitter.emit('appendToGallery', dataHeader);
             console.log('Header append'.magenta);
             generateImages();
             fs.readFile(path.resolve(__dirname, '../templates/htmltemplates/gallery/galleryimages.html'), 'utf-8', function(err, dataImages) {
                 if (err) throw err;
                 emitter.emit('appendToGallery', dataImages);
                 console.log('Images append'.magenta);
                 fs.readFile(path.resolve(__dirname, '../templates/htmltemplates/gallery/galleryfooter.html'), 'utf-8', function(err, dataFooter) {
                     if (err) throw err;
                     emitter.emit('appendToGallery', dataFooter);
                     console.log('Gallery completed \n'.inverse);
                 });
             });
         });
     });
 }

 function start(request, response) {
     response.setHeader('Content-Type', 'text/html; charset=utf-8');
     response.setHeader('Cache-Control', 'private, no-cache, no-store, must-revalidate');
     response.setHeader('Expires', '-1');
     response.setHeader('Pragma', 'no-cache');
     fs.readFile('./templates/htmltemplates/gallery/gallery.html', 'utf-8', function(err, data) {
         if (err) throw err;
         response.write(data);
         response.end(console.log('GALLERY LOADED'.black.bgGreen));
     });
 }

 function generateImages() {
     var images = '';
     files = fs.readdirSync(path.resolve(__dirname, '../uploaded'));
     files.forEach(function(element, index) {
         images += '<a href="/gallery/' + element + '">' + '<img src="/gallery/' + element + '"' + '>' + '</a>' + '\n';
     });
     fs.writeFileSync(path.resolve(__dirname, '../templates/htmltemplates/gallery/galleryimages.html'), images);
     console.log('Gallery images generated'.green)
 }
 module.exports = {
     start: start,
     generate: generate
 }
