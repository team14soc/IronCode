/*
File: javafile.js
Versione: 1.0
Autore: Mirko Gibin
Registro Modifiche:
Mirko Gibin, creazione file, 2018-06-26
Mirko Gibin, creazione classe JavaFile, 2018-06-26
Mirko Gibin, versione ufficiale, 2018-06-28
Descrizione: la classe JavaFile crea il file.java
a partire dal nome dell'entità
*/

var file = require('./file.js');
var fs = require('fs');

class JavaFile extends file {
    constructor(fileName) {
        super();
        var fileJava = fileName+".java";
        fs.open(fileJava, 'w', function(err,file) {
            if (err) {
                throw err;
            }
        })
        this.file = {path: './' + fileJava, name: fileJava};
    }
}

module.exports=JavaFile;