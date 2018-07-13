/*
File: applicationcontroller.js
Versione: 1.0
Autore: Francesco Sacchetto
Registro Modifiche:
Frnacesco Sacchetto, creazione file, 2018-06-21
Mirko Gibin, creazione classe ApplicationController, 2018-06-25
Mirko Gibin, modifica costruttore classe, 2018-06-28
Mirko Gibin, versione ufficiale, 2018-06-28
Descrizione: la classe Application Controller funge da controller per interagire
con i componenti del back-end.
*/

var jsonParser = require("./Components/jsonparser.js");
var javaFactory = require("./Components/javafactory.js");
var sqlFactory = require("./Components/sqlfactory.js");

class ApplicationController {
    constructor() {}
    /* Descrizione: il metodo crea l'istanza della classe jsonParser (singleton) che
       si occupa di rendere la struttura del file contentente le informazioni del diagramma
       maneggevole.
       Parametri: data, oggetto, dati contenuti nel file JSON parsati per essere accessibili.
    */
    parsing(data) {
        let jsonStructure = new jsonParser(data);
    }
    /* Descrizione: il metodo istanzia le factory per la creazione dei file necessari (Java e SQL)
       e concatena i file java e SQL in un unico array che viene restituito.
       Parametri: nessuno.
    */
    getCode() {
        let factoryJava = new javaFactory();
        let factorySql = new sqlFactory();
        return factoryJava.file.concat(factorySql.file);
    }
}

module.exports = ApplicationController;