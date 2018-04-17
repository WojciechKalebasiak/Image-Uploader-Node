 // Including necessary modules
 var fs = require('fs');
 var path = require('path');
 var color = require('colors');
 var pug = require('pug');
 var files;

 //Generating and rendering gallery html using PUG template engine
 function start(request, response) {
     response.setHeader('Content-Type', 'text/html; charset=utf-8');
     response.setHeader('Cache-Control', 'private, no-cache, no-store, must-revalidate');
     response.setHeader('Expires', '-1');
     response.setHeader('Pragma', 'no-cache');
     files = fs.readdirSync(path.resolve(__dirname, '../uploaded'));
     var compiledPug = pug.compileFile(path.resolve(__dirname, '../templates/htmltemplates/gallery.pug'));
     fs.writeFile(path.resolve(__dirname, '../templates/htmltemplates/gallery.html'), compiledPug({ images: files }), function(err) {
         if (err) throw err;
         console.log('Gallery generated'.rainbow);
         fs.readFile(path.resolve(__dirname, '../templates/htmltemplates/gallery.html'), 'utf-8', function(err, data) {
             if (err) throw err;
             response.write(data);
             response.end(console.log('GALLERY LOADED'.black.bgGreen));
         });
     });
 }
 //Exporting modules
 module.exports = {
     start: start,
 }
