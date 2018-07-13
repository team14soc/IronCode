/*
File: entity.js
Versione: 1.0
Autore: Sharon Della Libera
Registro Modifiche:
Sharon Della Libera, creazione file, 2018-06-25
Sharon Della Libera, creazione classe Entity, 2018-06-25
Sharon Della Libera, versione ufficiale, 2018-06-28
Descrizione: la classe Entity si occupa di creare un oggetto entità
costituito dal nome, dalla visibilità e dall'array di attributi.
*/

var attributeClass = require("./attribute.js");
class Entity {
    constructor(entity) {
        this.access = entity.access;
        this.name = entity.attrs.label.text;
        this.attributesArray = new Array();
        while(entity.attributes.length > 0) {
            var attribute = entity.attributes.shift();
            this.attributesArray.push(new attributeClass(attribute));
        }
    }
}

module.exports = Entity;