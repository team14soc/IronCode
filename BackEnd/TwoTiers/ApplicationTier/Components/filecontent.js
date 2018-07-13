/*
File: filecontent.js
Versione: 1.0
Autore: Mirko Gibin
Registro Modifiche:
Mirko Gibin, creazione file, 2018-06-27
Mirko Gibin, creazione classe JavaFile, 2018-06-27
Mirko Gibin, versione ufficiale, 2018-06-28
Descrizione: la classe FileContent è la classe base che gestisce
la creazione dei contentui per ogni entità.
E' implementata con un template method che ordina le istruzioni
da chiamare. I meotdi chiamati sono implementati diversamente nelle
classi derivate.
*/

class FileContent {
    constructor() {
        this.contents = "";
    }
    /* Descrizione: il metodo crea l'intestazione del file
       Parametri: entity, entità, dati necessari per generare l'intestazione.
    */
    createHeader(entity) {};

    /* Descrizione: il metodo crea gli attributi del file
       Parametri: entity, entità, dati necessari per generare la sezione
       riguardante gli attributi.
    */
    createAttributes(entity) {};

    /* Descrizione: il metodo crea i metodi Java del file Java. Sarà quindi
       implementato nel filejavacontent.js ma non nella parte SQL.
       Parametri: entity, entità, dati necessari per generare l'intestazione.
    */
    javaMethods(entity) {
        return "";
    };

    /* Descrizione: il metodo gestisce la creazione degli array monodimensionali
       nel codice SQL. Sarà quindi implementato solamente nella sezione SQL.
       Parametri: entity, entità, dati necessari per avere il nome dell'entità
                  attribute, attributo, dati necessari per avaere l'attributo da
                  promuovere a "tabella" in quanto ha tipo array.
    */
    sqlReferenceTable(entity, attribute) {};

    /* Descrizione: il metodo genera il codice per la chiusura del file.
       Parametri: nessuno.
   */
    closeFile() {};

    /* Descrizione: il metodo chiama in odine le operazioni da eseguire per
       costruire il contenuto del file.
       Parametri: entity, entità, dati necessari per avere il nome dell'entità.
   */
    templateMethod(entity) {
        this.contents = this.contents +
            this.createHeader(entity) +
            this.createAttributes(entity) +
            this.javaMethods(entity) +
            this.closeFile();
    }
}

module.exports = FileContent;