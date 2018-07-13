import {editorGraph} from "../editor.js";

//Funzione per generare il codice a partire dal diagramma corrente
export function sendData() {
    const request = new XMLHttpRequest();
    request.open("POST", "/code", true);
    request.setRequestHeader("Content-Type", "application/json");

    request.onreadystatechange = function () {
        if(request.readyState === 4 && request.status === 200) {
            const blob = new Blob([request.response], {type: "application/zip"});
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement("a");

            $("body").append(a);
            //TODO: Aggiungere style tramite CSS
            a.style = "display: none;";
            a.href = url;
            a.download = localStorage.getItem("projectName") + ".zip";
            a.click();

            window.URL.revokeObjectURL(url);
            a.remove();
        }
    };

    const data = JSON.stringify(editorGraph.graphEditor.toJSON());
    request.responseType = "arraybuffer";
    request.send(data);
}