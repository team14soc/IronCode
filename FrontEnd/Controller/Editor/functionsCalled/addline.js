import {editElement} from "../setEvents/editelement.js";
import {editorGraph} from "../editor.js";

//Funzione per l'aggiunta di un elemento: Linea di Associazione
export function addLine() {
    //Inizializzo due variabili per tenere traccia dell'elemento "source" della linea di associazione
    let isFirstElement = true;
    let idSourceElement = null;

    //Aggiungo l'evento "pointerclick" all'elemento, in modo da invocare la funzione per la creazione della linea di
    // associazione
    editorGraph.paperEditor.on("cell:pointerclick", function(cellView) {
        //Se è l'elemento "source" (il primo) allora salvo il suo ID e aspetto che l'utente scelga l'elemento
        // "target" (il secondo)
        if(isFirstElement) {
            idSourceElement = cellView.model.id;
            isFirstElement = false;
        }
        else {
            //Creo la linea di associazione che collega i due elementi indicati dall'utente
            const link = new joint.dia.Link({
                source: {id: idSourceElement},
                target: {id: cellView.model.id}
            });

            //Aggiungo la linea di associazione al diagramma
            link.addTo(editorGraph.graphEditor);
            //Reset dell'evento collegato al paper
            editorGraph.paperEditor.off();

            //Reimposto l'evento double-clicked standard
            editElement();
        }
    });
}