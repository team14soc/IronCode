/*
File: javafilecontent.js
Versione: 1.0
Autore: Mirko Gibin
Registro Modifiche:
Mirko Gibin, creazione file, 2018-06-27
Mirko Gibin, creazione classe javafilecontent, 2018-06-27
Mirko Gibin, versione ufficiale, 2018-06-28
Descrizione: la classe JavaFileContent implementa i metodi necessari
per generare i contenuti del file.
*/

var fileContent = require('./filecontent.js');

class JavaFileContent extends fileContent {
    constructor() {
        super();
    }

    /* Descrizione: il metodo crea l'intestazione del file
      Parametri: entity, entità, dati necessari per generare l'intestazione.
   */
    createHeader(entity) {
        return entity.access + " class " + entity.name + " { \n";
    }

    /* Descrizione: il metodo crea gli attributi del file
       Parametri: entity, entità, dati necessari per generare gli attributi.
    */
    createAttributes(entity) {
        /*aggiunge il campo dati id per identificare univocamente l'oggetto e
          inserisce il metodo per la connessione al database*/
        let string="/*ATTRIBUTES*/\n" +
            "\tprivate int id;\n" +
            "\tprivate static stm = new Connection().createStatement();\n";
        let attributes = entity.attributesArray;
        attributes.forEach(function(i){
            string= string+ "\t" + i.access + " " + i.type + " " + i.name + ";\n";
        });
        return string;
    }

    /* Descrizione: il metodo genera il metodo get per l'attributo.
       Parametri: name, string, nome dell'attributo
                  type, string, tipo dell'attributo.
   */
    getMethods (name, type){
        return  "\t" + type + " get" + name +
                "() { \n \t \t return " + name + ";\n\t} \n";
    }

    /* Descrizione: il metodo genera il metodo set per l'attributo.
       Parametri: name, string, nome dell'attributo
                  type, string, tipo dell'attributo.
   */
    setMethods(name, type){
        return "\tvoid set" + name +
               "(" + type + " val) {\n \t \t" + name + " = val;\n\t} \n";
    }

    /* Descrizione: il metodo genera il metodo per l'inserimento di un oggetto
       dell'entità in un record del database.
       Parametri: entity, entità, dati dell'entità da inserire
                  attributes, attibuto , attributi per inserire il record.
   */
    createMethod(entity, attributes) {
        /* Viene inizializzato l'id della classe prelevando dal database l'ultimo
           valore ID presente nella tabella, a cui si somma 1. In questo modo il campo
           id della classe Java coninciderà con il campo ID del database.
        * */
        var id = "id = 1 + stm.executeQuery(SELECT id FROM" + entity +
                  "Order by id DESC limit 1).getInt(ID);";
        var sqlQuery = "\"INSERT INTO " + entity + " VALUES(\"";
        for(let i in attributes){
            sqlQuery = sqlQuery + " + " + attributes[i].name + " + \", \"";
        }
        var pos = sqlQuery.lastIndexOf(',');
        sqlQuery = sqlQuery.substring(0,pos) + ')' + sqlQuery.substring(pos+1);
        var javaMethod = "\tvoid create() { \n \t" + id + "\n \tstmt.executeUpdate(" + sqlQuery +
                         "); \n \t}\n";
        return javaMethod;
    }

    /* Descrizione: il metodo genera il metodo per la lettura di un oggetto
       dell'entità in un record del database.
       Parametri: entity, entità, dati dell'entità da leggere.
   */
    readMethod(entity) {
        var sqlQuery = "" + "\"SELECT * " + "FROM " + entity + " WHERE ID = \" + id";
        var javaMethod = "\tvoid read() { \n \tstmt.executeQuery(" +
                          sqlQuery + "); \n \t}\n";
        return javaMethod;
    }

    /* Descrizione: il metodo genera il metodo per l'aggiornamento di un oggetto
       dell'entità di un record del database.
       Parametri: entity, entità, dati dell'entità da inserire
                  attributes, attibuto , attributi per aggiornare il record.
   */
    updateMethod(entity, attributes) {
        var sqlQuery = "" +
            "\"UPDATE " + entity + " SET " +
            "";
        for(let i in attributes){
            sqlQuery = sqlQuery + attributes[i].name + " = \" + " +
                       attributes[i].name + " + \", \" + \"";
        }
        var pos = sqlQuery.lastIndexOf(',');
        sqlQuery = sqlQuery.substring(0,pos) + " WHERE ID = \" + id";
        var javaMethod = "\tvoid update() { \n \t stmt.executeUpdate(" +
                          sqlQuery + "); \n \t}\n";
        return javaMethod;
    }

    /* Descrizione: il metodo genera il metodo per l'eliminazione di un oggetto
       dell'entità in un record del database.
       Parametri: entity, entità, dati dell'entità da eliminare.
   */
    deleteMethod(entity) {
        var sqlQuery = "" + "\"DELETE * " + "FROM " + entity + " WHERE ID = \" + id";
        var javaMethod = "\tvoid delete() { \n \tstmt.executeQuery(" +
            sqlQuery + "); \n \t}\n";
        return javaMethod;
    }

    /* Descrizione: il metodo crea i metodi Java del file Java. In particolare i
       metodi set e get per ogni attributo e i metodi di interaizone col database.
       Parametri: entity, entità, dati necessari per generare l'intestazione.
    */
    javaMethods(entity) {
        let get="/*GETTERS*/\n", set="/*SETTERS*/\n";
        //non va bene il for each perche ha il this sballato
        let attributes = entity.attributesArray;
        for(let i in entity.attributesArray){
            get= get + this.getMethods(attributes[i].name, attributes[i].type) + "\n";
            set= set + this.setMethods(attributes[i].name, attributes[i].type) + "\n";
        }
        var crud = "/*CRUD*/\n"+
            this.createMethod(entity.name, attributes) + "\n" +
            this.readMethod(entity.name) + "\n" +
            this.updateMethod(entity.name, attributes) + "\n" +
            this.deleteMethod(entity.name);
        return "\n" + set + get + crud;
    }

    /* Descrizione: il metodo genera il codice per la chiusura del file.
       Parametri: nessuno.
   */
    closeFile(){
        return "}";
    }
}

module.exports = JavaFileContent;