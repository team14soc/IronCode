import {editorGraph} from "../editor.js";

//Funzione per la creazione ed il download in locale del file JSON del diagramma corrente
export function saveDiagram() {
    //Aggiungo al diagramma la data attuale di esportazione
    editorGraph.graphEditor.set("graphExportTime", Date.now());

    //Genero il file Object-JSON e lo converto in String-JSON
    const jsonObject = editorGraph.graphEditor.toJSON();
    const jsonString = JSON.stringify(jsonObject, null, 2);

    //Creo un Blob contenente il JSON, ed un URL che punti ad esso
    const blob = new Blob([jsonString], {type: 'application/json'});
    const url = window.URL.createObjectURL(blob);

    //Creo un tag HTML "<a>" per il download del file JSON
    const a = document.createElement("a");
    $("body").append(a);
    //TODO: Aggiungere style tramite CSS
    a.style = "display: none;";
    a.href = url;
    a.download = localStorage.getItem("projectName") + ".json";
    a.click();

    window.URL.revokeObjectURL(url);
    a.remove();
}