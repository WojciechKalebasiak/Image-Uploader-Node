var fs = require('fs');
var path = require('path');
var color = require('colors');
var files;

function start(request, response) {
    generate();
    var gallery = fs.readFileSync('./templates/htmltemplates/gallery/gallery.html', 'utf-8');
    response.setHeader('Content-Type', 'text/html; charset=utf-8');
    response.setHeader('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    response.setHeader('Expires', '-1');
    response.setHeader('Pragma', 'no-cache');
    response.write(gallery);
    response.end();
}

function generate() {
    fs.writeFileSync(path.resolve(__dirname, '../templates/htmltemplates/gallery/gallery.html'), '');
    generateImages();
    var header = fs.readFileSync('./templates/htmltemplates/gallery/galleryheader.html', 'utf-8');
    fs.appendFileSync('./templates/htmltemplates/gallery/gallery.html', header);
    var images = fs.readFileSync('./templates/htmltemplates/gallery/galleryimages.html', 'utf-8');
    fs.appendFileSync('./templates/htmltemplates/gallery/gallery.html', images);
    var footer = fs.readFileSync('./templates/htmltemplates/gallery/galleryfooter.html', 'utf-8');
    fs.appendFileSync('./templates/htmltemplates/gallery/gallery.html', footer);
    console.log('Gallery upadated'.green);
}

function generateImages() {
    var images = '';
    files = fs.readdirSync(path.resolve(__dirname, '../uploaded'));
    files.forEach(function(element, index) {
        images += '<a href="/gallery/' + element + '">' + '<img src="/gallery/' + element + '"' + '>' + '</a>' + '\n';
    });
    fs.writeFileSync('./templates/htmltemplates/gallery/galleryimages.html', images);
   console.log('Images generated'.green)
}
module.exports = {
    start: start,
    generate: generate
}