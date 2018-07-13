import {GraphRD} from "./graph.js";

export class GraphEditor extends GraphRD {
    constructor() {
        //Variabile per la creazione del diagramma relativo all'editor
        const superObj = super();
        this.graphEditor = superObj.graphRD;

        //Variabile per la creazione del foglio contenente l'editor
        this.paperEditor = new joint.dia.Paper({
            //Collego il foglio all'elemento corretto della struttura HTML, e aggiungo il diagramma correlato
            el: $('#editor'),
            model: this.graphEditor,
            //Dimensioni del foglio
            width: '100%',
            height: $('#diagrams').height(),
            //Opzioni per visualizzare la griglia del foglio, ed imporre la dimensione minima di spostamento degli elementi in essa
            gridSize: 10,
            drawGrid: true,
            //Colore di sfondo del foglio
            background: {
                color: '#E3F2FD'
            },
            //Rendo il foglio interattivo ai comandi utente
            interactive: true,
			//Le linee di associazione non possono essere pendenti
			linkPinning: false
        });
    }
}