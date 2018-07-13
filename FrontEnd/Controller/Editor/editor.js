import {GraphElement} from "../../Model/Editor/scripts/Graph/graphelement.js";
import {GraphEditor} from "../../Model/Editor/scripts/Graph/grapheditor.js";
export const elementsGraph = new GraphElement();
export const editorGraph = new GraphEditor();

import {dragAndDrop} from "./setEvents/draganddrop.js";
import {editElement} from "./setEvents/editelement.js";
import {zoom} from "./setEvents/zoom.js";

import {addLine} from "./functionsCalled/addline.js";
import {saveDiagram} from "./functionsCalled/savediagram.js";
import {sendData} from "./functionsCalled/senddata.js";
import {closeEditTile} from "./setEvents/editelement.js";
import {removeElement} from "./setEvents/editelement.js";

$(document).ready(function() {
    //Event for refresh, close tab/browser and insert new URL:
    window.onbeforeunload = stopWorking;

    //Add events "onclick":
    $("#addLineButton").click(function() {
        addLine();
    });
    $(".homeButton").click(function() {
        goBackHomePage();
    });
    $(".saveButton").click(function() {
        saveDiagram();
    });
    $(".codeButton").click(function() {
        sendData();
    });
    $("#closeEditButton").click(function() {
        closeEditTile();
    });
    $("#removeElementButton").click(function() {
        removeElement();
    });

    //Other events:
    dragAndDrop();
    editElement();
    zoom();

    //Imposto il titolo in base al nome del progetto
    $("title")[0].textContent = localStorage.getItem("projectName") + " - IronWorks";
    $("#title h1")[0].textContent = localStorage.getItem("projectName") + " - IronWorks";

    //Se ho caricato un vecchio progetto lo converto in un "Object-JSON" ed aggiorno l'editor
    if(localStorage.getItem("projectObject")) {
        editorGraph.graphEditor.fromJSON(JSON.parse(localStorage.getItem("projectObject")));
    }
});


function stopWorking() {
    //localStorage.removeItem("projectName");
    localStorage.removeItem("projectObject");

    //return "Are you sure?";
}

function goBackHomePage() {
    if(confirm("Are you sure you want to go back to HomePage?\nIf you confirm, you'll lose all your work done.")) {
        localStorage.removeItem("projectName");
        localStorage.removeItem("projectObject");

        window.location = "../FirstPages/HomePage/homepage.html";
    }
}