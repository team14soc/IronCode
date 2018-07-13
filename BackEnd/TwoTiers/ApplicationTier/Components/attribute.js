/*
File: attribute.js
Versione: 1.0
Autore: Sharon Della Libera
Registro Modifiche:
Sharon Della Libera, creazione file, 2018-06-25
Sharon Della Libera, creazione classe Attribute, 2018-06-25
Sharon Della Libera, versione ufficiale, 2018-06-28
Descrizione: la classe Attribute si occupa di creare un oggetto "attributo"
composto dal nome, dalla visibilità e dal tipo
*/

class Attribute {
    constructor(attributes) {
        this.access = attributes.access;
        this.name = attributes.name;
        this.type = attributes.type;
    }
}

module.exports = Attribute;