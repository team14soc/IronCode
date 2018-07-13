/*
File: sqlfilecontent.js
Versione: 1.0
Autore: Sharon Della Libera
Registro Modifiche:
Sharon Della Libera, creazione file, 2018-06-27
Sharon Della Libera, creazione classe javafilecontent, 2018-06-27
Sharon Della Libera, versione ufficiale, 2018-06-28
Descrizione: la classe SqlFileContent implementa i metodi necessari
per generare i contenuti del file.
*/

var fileContent = require('./filecontent.js');

class SqlFileContent extends fileContent {
    constructor() {
        super();
    }

    /* Descrizione: il metodo crea l'intestazione del file
     Parametri: entity, entità, dati necessari per generare l'intestazione.
  */
    createHeader(entity) {
        return "CREATE TABLE " + entity.name + " ( \n" +
            "\tID int AUTO_INCREMENT PRIMARY KEY, \n";
    }

    /* Descrizione: il metodo gestisce la creazione degli array monodimensionali.
       Ogni volta che nello switch per generare il tipo nel metodo createAttributes
       si incontra un tipo array, viene invocato questo metodo. Si occupa di chiudere
       la tabella dell'entità padre in cui compare l'array e viene generata una seconda
       tabella contenente la FOREIGN KEY collegata all'entità iniziale.
       Parametri: attribute, attributo, dati necessari per avere l'attributo da
                  promuovere a "tabella"
                  parentTab, entità, dati necessari per avere il nome dell'entità padre
    */
    sqlReferenceTable(attribute, parentTab) {
        let refTable = this.closeFile();
	let type = attribute.type;
	var pos = type.lastIndexOf(']');
        type = type.substring(0,pos) + '' + type.substring(pos+1);
	pos = type.lastIndexOf('[');
	type = type.substring(0,pos) + '' + type.substring(pos+1);
        refTable +=
            "CREATE TABLE " + attribute.name + " ( \n" +
            "\tID int NOT NULL AUTO_INCREMENT, \n" +
            "\tValue " + type + ", \n" +
            "\t" + parentTab.name + "ID int , \n" +
            "\tPRIMARY KEY (ID), \n" +
            "\tFOREIGN KEY (" + parentTab.name + "ID) REFERENCES " + parentTab.name + "(ID)";
        return refTable;
    }

    /* Descrizione: il metodo crea gli attributi del file
       Parametri: entity, entità, dati necessari per generare gli attributi.
    */
    createAttributes(entity) {
        let string="";
        let attributes = entity.attributesArray;
        let refTable = "";

        for(let i in attributes) {
            let type = "";
            switch(attributes[i].type) {
                case "String":
                    type += "CHAR(256)";
                    break;
                case "int":
                case "double":
                case "float":
                    type += "NUMERIC(3,0)";
                    break;
                case "boolean":
                    type += "BIT";
                    break;
                case "Date":
                    type += "DATE";
                    break;

                //caso degli array da fare
                default:
                    refTable += this.sqlReferenceTable(attributes[i], entity);
            }

            if(type != "")
                string += "\t" + attributes[i].name + " " + type + ",\n";
        }

        var pos = string.lastIndexOf(',');
        string = string.substring(0,pos) + string.substring(pos+1);
        return string + refTable;
    }


    /* Descrizione: il metodo genera il codice per la chiusura del file.
           Parametri: nessuno.
    */
    closeFile() {
        return "); \n \n";
    }

}
module.exports = SqlFileContent;