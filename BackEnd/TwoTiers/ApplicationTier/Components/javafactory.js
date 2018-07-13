/*
File: javafactory.js
Versione: 1.0
Autore: Mirko Gibin
Registro Modifiche:
Mirko Gibin, creazione file, 2018-06-25
Mirko Gibin, creazione classe JavaFactory, 2018-06-26
Mirko Gibin, implementazione metodi della classe, 2018-06-28
Mirko Gibin, versione ufficiale, 2018-06-28
Descrizione: la classe JavaFactory estende la factory base.
Crea l'array di file Java prelevando le entità dall'istanza
singleton della classe jsonParser.
Per ogni entità crea il file e i contenuti.
*/

var factory = require('./factory.js');
var jsonParser = require('./jsonparser.js');
var fs = require('fs');
var javaFile = require('./javafile.js');
var javaContents = require('./javafilecontent.js');

class JavaFactory extends factory {
    constructor(){
        super();
        //per ogni entità è necesssario creare il file e i contenuti
        for(let i in jsonParser.entityArray){
            var f = this.createFile(jsonParser.entityArray[i].name);
            console.log(f);
            //aggiunge i contenuti al file
            fs.appendFile(f.name, this.createContent(jsonParser.entityArray[i]));
            //aggiunge il file all'array
            this.file.push(f);
        }
    }
    /* Descrizione: il metodo crea il file .java che ospiterà il codice.
       Parametri: fileName, stringa, nome del file da creare.
    */
    createFile(fileName) {
        return new javaFile(fileName).file;
    }
    /* Descrizione: il metodo crea il codice da inserire nel file.java,
       sottoforma di stringa che ritona per essere iniettata nel file.
       Parametri: entity, entità, l'entità da utilizzare per generare i contenuti.
       Con contentuto si intende la classe Java generata dai dati dell'entità.
    */
    createContent(entity) {
        var jc = new javaContents();
        jc.templateMethod(entity);
        return jc.contents;
    }
}

module.exports=JavaFactory;