function getHomePage() {
    window.location = "../Model/FirstPages/HomePage/homepage.html";
}

function newProject() {
    window.location = "../NewProject/newproject.html";
}

function createNewProject() {
    localStorage.setItem("projectName", $("#projectName").val());
    window.location = "../../Editor/editor.html";
}

function loadProject() {
    //Controllo che il browser supporti le API degli oggetti "FileReader"
    if(typeof window.FileReader !== "function") {
        alert("FileReader API isn't supported on this browser yet.");
        return;
    }

    //Controllo che l'utente abbia selezionato un file da caricare, e che non ci siano stati altri problemi con tale file
    const input = $("#inputDia")[0];
    if(!input) {
        alert("Sorry, we couldn't find any input file object.");
        return;
    }
    else if(!input.files) {
        alert("This browser doesn't seem to support the \"file property\" for input file.");
        return;
    }
    else if(!input.files[0]) {
        alert("Please select a file before perform the request to load a project.");
        return;
    }
    else {
        //Variabile contenente il file caricato
        let file = input.files[0];
        //Salvo in "localStorage" il nome del progetto caricato
        localStorage.setItem("projectName", file.name.slice(0, -5));

        //Nuovo oggetto "FileReader"
        let fileReadObj = new FileReader();
        //Setto all'evento "onload" dell'oggetto "FileReader" la chiamata alla funzione "toObjectJSON(event)"
        fileReadObj.onload = toObjectJSON;
        //Invoco il metodo "readAsText(file)" sulla variabile contenente il file caricato,
        // invocando così la funzione collegata all'evento "onload" dell'oggetto "FileReader"
        fileReadObj.readAsText(file);

        //Funzione di supporto per la funzione "loadProject()" da collegare all'evento "onload" dell'oggetto "FileReader"
        function toObjectJSON(event) {
            //Verifico che il contenuto del file caricato sia uno "String-JSON" valido
            const jsonObject = validateJSON(event.target.result);

            //Se è uno "String-JSON" valido lo salvo in "localStorage", altrimenti segnalo all'utente l'errore
            if(jsonObject) {
                localStorage.setItem("projectObject", event.target.result);
                window.location = "../../Editor/editor.html";
            }
            else {
                alert("Sorry, uploaded input file isn't a valid JSON file.");
            }
        }
    }
}

//Funzione che controlla che il parametro in ingresso sia uno "String-JSON",
// se è così lo ritorna convertito in un "Object-JSON", altrimenti ritorna "null"
function validateJSON(jsonString) {
    //Tento la conversione da "String-JSON" a "Object-JSON", se riesco ritorno un valido "Object-JSON",
    // altrimenti viene sollevata un'eccezione
    try {
        return JSON.parse(jsonString);
    }
    //Catturo l'eccezione in caso di conversione andata male, e ritorno "null"
    catch(exception) {
        return null;
    }
}