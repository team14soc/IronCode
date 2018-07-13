import {elementsGraph} from "../editor.js";
import {editorGraph} from "../editor.js";

export function dragAndDrop() {
    //"Drag & Drop" degli elementi
    elementsGraph.paperElement.on("cell:pointerdown", function(cellView, e, x, y) {
        //TODO: Sistemare tramite CSS il seguente:
        $("body").append('<div id="invisiblePaper" style="position:fixed;' +
            ' z-index:100; opacity:.2;"></div>');

        //Creo il graph "invisibile" che serve per spostare gli elementi da un paper all'altro
        const invisibleGraph = new joint.dia.Graph;
        const invisiblePaper = new joint.dia.Paper({
            el: $("#invisiblePaper"),
            model: invisibleGraph,
            interactive: false,
            height: cellView.model.attributes.size.height+3,
            width: cellView.model.attributes.size.width,
			background: {
                color: '#E3F2FD'
            }
        });

        //Faccio la clone dell'elemento che voglio spostare
        const invisibleShape = cellView.model.clone();
        //Salvo la posizione
        const pos = cellView.model.position();
        const offset = {
            x: x - pos.x,
            y: y - pos.y
        };

        //Aggiungo nel paper invisibile la copia dell'elemento
        invisibleShape.position(0, 0);
        invisibleGraph.addCell(invisibleShape);

        //Cambio la posizione del paper invisibile
        $("#invisiblePaper").offset({
            left: e.pageX - offset.x,
            top: e.pageY - offset.y
        });

        //Quando muovo il mouse muovo anche il paper invisibile e il suo contenuto
        $("body").on("mousemove.inv", function(e) {
            $("#invisiblePaper").offset({
                left: e.pageX - offset.x,
                top: e.pageY - offset.y
            });
        });
        //Al mouse-up il mio elemento si colloca
        $("body").on("mouseup.inv", function(e) {
            const x = e.pageX;
            const y = e.pageY;
            const target = editorGraph.paperEditor.$el.offset();

            //Se è dentro il foglio allora faccio la copia dell'elemento invisibile e lo piazzo dove voglio
            if(x > target.left && x < target.left + editorGraph.paperEditor.$el.width() && y > target.top && y < target.top + editorGraph.paperEditor.$el.height()) {
                const element = invisibleShape.clone();
                const type = element.attr("label/text");
                let color = "#000000";

                if(type === "Actor") {
                    color = $("#actorColor").val();
                    element.attr('image/xlinkHref', 'data:image/svg+xml;utf8,' + encodeURIComponent('<svg ' +
                        'xmlns="http://www.w3.org/2000/svg" version="1.1" width="46px" height="91px">' +
                        '<g transform="translate(0.5,0.5)">' +
                        '<ellipse cx="22.25" cy="11.5" rx="11.25" ry="11.25" fill="transparent" stroke="' +
                        color + '" pointer-events="none"/>' +
                        '<path d="M 22.5 22.5 L 22.5 60 M 22.5 30 L 0 30 M 22.5 30 L 45 30 M 22.5 60 L 0 90 ' +
                        'M 22.5 60 L 45 90" fill="none" stroke="' + color + '" stroke-miterlimit="10" ' +
                        'pointer-events="none"/>' +
                        '</g></svg>'));
                    let name = $("#actorName").val();
                    if(name !== "") {
                        element.attr("label/text", name);
                    }
                    else {
                        element.attr("label/text", "Actor");
                    }
                } else if(type === "Boundary") {
                    color = $("#boundaryColor").val();
                    element.attr('image/xlinkHref', 'data:image/svg+xml;utf8,' + encodeURIComponent('<svg ' +
                        'xmlns="http://www.w3.org/2000/svg" version="1.1" width="98px" height="81px">' +
                        '<g transform="translate(0.5,0.5)">' +
                        '<path d="M 0 20 L 0 60" fill="none" stroke="' + color + '" stroke-miterlimit="10" ' +
                        'pointer-events="none"/>' +
                        '<path d="M 0 40 L 16.67 40" fill="none" stroke="' + color + '" stroke-miterlimit="10" ' +
                        'pointer-events="none"/>' +
                        '<ellipse cx="57" cy="40" rx="40" ry="40" fill="transparent" stroke="' + color + '" ' +
                        'pointer-events="none"/>' +
                        '</g></svg>'));
                    let name = $("#boundaryName").val();
                    if(name !== "") {
                        element.attr("label/text", name);
                    }
                    else {
                        element.attr("label/text", "Boundary");
                    }
                } else if(type === "Control") {
                    color = $("#controlColor").val();
                    element.attr('image/xlinkHref', 'data:image/svg+xml;utf8,' + encodeURIComponent('<svg ' +
                        'xmlns="http://www.w3.org/2000/svg" version="1.1" width="81px" height="92px">' +
                        '<g transform="translate(0.5,0.5)">' +
                        '<path d="M 29.63 12.38 L 49.38 0" fill="none" stroke="' + color + '" stroke-miterlimit="10" ' +
                        'pointer-events="none"/>' +
                        '<ellipse cx="40" cy="51" rx="39.5" ry="39.375" fill="transparent" stroke="' + color + '" ' +
                        'pointer-events="none"/>' +
                        '<path d="M 29.63 12.38 L 49.38 22.5" fill="none" stroke="' + color + '" stroke-miterlimit="10" ' +
                        'pointer-events="none"/>' +
                        '</g></svg>'));
                    let name = $("#controlName").val();
                    if(name !== "") {
                        element.attr("label/text", name);
                    }
                    else {
                        element.attr("label/text", "Control");
                    }
                } else if(type === "Entity") {
                    color = $("#entityColor").val();
                    element.attr('image/xlinkHref', 'data:image/svg+xml;utf8,' + encodeURIComponent('<svg ' +
                        'xmlns="http://www.w3.org/2000/svg" version="1.1" width="81px" height="81px">' +
                        '<g transform="translate(0.5,0.5)">' +
                        '<ellipse cx="40" cy="40" rx="40" ry="40" fill="transparent" stroke="' + color + '" ' +
                        'pointer-events="none"/>' +
                        '<path d="M 10 80 L 70 80" fill="none" stroke="' + color + '" stroke-miterlimit="10" ' +
                        'pointer-events="none"/>' +
                        '</g></svg>'));
                    let name = $("#entityName").val();
                    if(name !== "") {
                        element.attr("label/text", name);
                    }
                    else {
                        element.attr("label/text", "Entity");
                    }

                    //Tipo di accesso all'elemento Entità indicato
					if($("select#access option:checked").val() === "")
                        element.set("access", "default");
					else
						element.set("access", $("select#access option:checked").val());

                    //L'elemento entità indicato è marcato o no come Singleton
                    if($("#is-singleton")[0].checked)
                        element.set("singleton", "true");
                    else
                        element.set("singleton", "false");
                }

                element.position(x - target.left - offset.x, y - target.top - offset.y);
                editorGraph.graphEditor.addCell(element);

                //Ripristino valori di default degli elementi dopo l'inserimento
                $("#actorName").val("");
				$("#actorName").blur();
                $("#boundaryName").val("");
				$("#boundaryName").blur();
                $("#controlName").val("");
				$("#controlName").blur();
                $("#entityName").val("");
				$("#entityName").blur();
                $("#actorColor").val("#000000");
                $("#actorColor").blur();
                $("#boundaryColor").val("#000000");
                $("#boundaryColor").blur();
                $("#controlColor").val("#000000");
                $("#controlColor").blur();
                $("#entityColor").val("#000000");
                $("#entityColor").blur();
                $("#access").val("");
				$("#access").blur();
                $("#is-singleton")[0].checked = false;
            }

            //Cancello quello che ho creato
            $("body").off("mousemove.inv").off("mouseup.inv");
            invisibleShape.remove();
            $("#invisiblePaper").remove();
        });
    });
}