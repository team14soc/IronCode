import {editorGraph} from "../editor.js";
let elementDC = null;
let totAttrs = 0;

export function editElement() {
    //Imposto all'evento double-clicked
    editorGraph.paperEditor.on("cell:pointerdblclick", function(cellView) {
        elementDC = cellView;

        $("#edit-tile").attr("class", "editing");
        $("#attributes-editable")[0].innerHTML = "";

        if(cellView.model.get("type") !== "link") {
            $("#attributes-editable").append('<div class="group">' +
                '<input id="elementName" type="text" name="elementName" size="8" required="required"/>' +
                '<span class="highlight"></span>' +
                '<span class="bar"></span>' +
                '<label for="elementName">Name</label></div>');

			if(cellView.model.get("elementType") !== "rd.Entity") {
				$("#attributes-editable").append('<div id="otherFields"></div>' +
					'<button class="material-button" id="confirmButton">OK</button>');
			}
			else {
				$("#attributes-editable").append('<div id="otherFields"></div>' +
					'<div id="attributes"></div>');
			}

            $("#confirmButton").click(function() {
                confirmAction();
            });

            $("#elementName").val(cellView.model.attr("label/text"));

            if(cellView.model.get("elementType") === "rd.Entity") {
                $("#otherFields").append('<div class="select">' +
                    '<select class="select-text" id="new-access" required="required">' +
                        '<option value="public">public</option>' +
                        '<option value="protected">protected</option>' +
                        '<option value="default">default</option>' +
                        '<option value="private">private</option>' +
                    '</select>' +
                    '<span class="select-highlight"></span>' +
                    '<span class="select-bar"></span>' +
                    '<label for="new-access" class="select-label">Access</label></div>');

                getAccess(cellView.model.get("access"));

                $("#otherFields").append('<label id="attribute-checkbox" for="new-is-singleton" class="material-checkbox">' +
						'<input id="new-is-singleton" name="new-is-singleton" type="checkbox" value="false"/>' +
						'<span>Singleton</span>' +
					'</label>');
					
                isSingleton(cellView.model.get("singleton"));

                $("#attributes")[0].innerHTML = "";
                totAttrs = 0;
                for(let i = 0; i < cellView.model.get("attributes").length; i++) {
                    showAttributes(i);
                    totAttrs++;
                }

                $("#attributes").append('<div id="add-new-attr">' +
                    '<button class="material-button" id="addAttrBtn" title="Add a new attribute">Add Attr.</button>' +
					'<button class="material-button" id="confirmButton">OK</button></div>');

                $("#addAttrBtn").click(function() {
                    addNewAttribute(totAttrs);
                });
				
				$("#confirmButton").click(function() {
					confirmAction();
				});
            }
        }
    });
}

function getAccess(elementAccess) {
    $("#new-access option[value=" + elementAccess + "]").attr("selected", "selected");
    $("#new-access option[value=" + elementAccess + "]").val(elementAccess);
}

function isSingleton(boolValue) {
    if(boolValue === "true") {
        $("#new-is-singleton").attr("checked", "checked");
        $("#new-is-singleton")[0].checked = true;
    }
}

function showAttributes(indexAttr) {
    $("#attributes").append('<div class="attr-number"" id="attr-number-' + indexAttr + '"></div>');
    $("#attr-number-" + indexAttr).append('<div id="attributes-access-' + indexAttr + '">' +
        '<div class="select">' +
			'<select class="select-text" id="attr-access-' + indexAttr + '" required="required">' +
				'<option value="public">public</option>' +
				'<option value="protected">protected</option>' +
				'<option value="default">default</option>' +
				'<option value="private">private</option>' +
			'</select>' +
			'<span class="select-highlight"></span>' +
			'<span class="select-bar"></span>' +
			'<label for="attr-access-' + indexAttr + '" class="select-label">Access</label></div>');

    const attrAccess = elementDC.model.get("attributes")[indexAttr]["access"];
    $("#attr-access-" + indexAttr + " option[value=" + attrAccess + "]").attr("selected", "selected");
    $("#attr-access-" + indexAttr + " option[value=" + attrAccess + "]").val(attrAccess);

    $("#attr-number-" + indexAttr).append('<div class="attr-type" id="attributes-type-' + indexAttr + '">' +
        '<div class="select">' +
			'<select class="select-text" id="attr-type-' + indexAttr + '" required="required">' +
				'<optgroup label="Base types:">' +
				'<option value="boolean">boolean</option>' +
				'<option value="int">int</option>' +
				'<option value="float">float</option>' +
				'<option value="double">double</option>' +
				'<option value="String">String</option>' +
				'<option value="Date">Date</option>' +
				'</optgroup>' +
				'<optgroup label="Array types:">' +
				'<option value="boolean[]">boolean[]</option>' +
				'<option value="int[]">int[]</option>' +
				'<option value="float[]">float[]</option>' +
				'<option value="double[]">double[]</option>' +
				'<option value="String[]">String[]</option>' +
				'<option value="Date[]">Date[]</option>' +
			'</select>' +
			'<span class="select-highlight"></span>' +
			'<span class="select-bar"></span>' +
			'<label for="attr-type-' + indexAttr + '" class="select-label">Type</label></div>');

    const attrType = elementDC.model.get("attributes")[indexAttr]["type"];
    if(attrType.substr(attrType.length - 2) !== "[]") {
        $("#attr-type-" + indexAttr + " option[value=" + attrType + "]").attr("selected", "selected");
        $("#attr-type-" + indexAttr + " option[value=" + attrType + "]").val(attrType);
    }
    else {
        $("#attr-type-" + indexAttr + " option[value=" + attrType.slice(0, -2) + "\\[\\]]").attr("selected", "selected");
        $("#attr-type-" + indexAttr + " option[value=" + attrType.slice(0, -2) + "\\[\\]]").val(attrType);
    }

    $("#attr-number-" + indexAttr).append('<div class="attr-name" id="attributes-name-' + indexAttr + '">' +
		'<div class="group">' +
			'<input id="attr-name-' + indexAttr + '" type="text" name="attr-name-' + indexAttr + '" size="8" required="required"/>' +
			'<span class="highlight"></span>' +
			'<span class="bar"></span>' +
			'<label for="attr-name-' + indexAttr + '">Name</label>' +
		'</div></div>');

    $("#attr-name-" + indexAttr).val(elementDC.model.get("attributes")[indexAttr]["name"]);

    $("#attr-number-" + indexAttr).append('<div id="attr-remove-' + indexAttr + '">' +
        '<button class="removeAttrBtn material-button" title="Remove this attribute">Remove</button></div>');

    $("#attr-remove-" + indexAttr + " .removeAttrBtn").click(function() {
        const parentId = $(this).parent().attr("id");
        const realIndexAttr = parentId.slice(12, parentId.length);
        removeAttribute(realIndexAttr);
    });
}

function addNewAttribute(indexAttr) {
    totAttrs++;
    $("#add-new-attr").remove();

    $("#attributes").append('<div class="attr-number" id="attr-number-' + indexAttr + '"></div>');
    $("#attr-number-" + indexAttr).append('<div id="attributes-access-' + indexAttr + '">' +
        '<div class="select">' +
			'<select class="select-text" id="attr-access-' + indexAttr + '" required="required">' +
				'<option value="" disabled="disabled" selected="selected"></option>' +
				'<option value="public">public</option>' +
				'<option value="protected">protected</option>' +
				'<option value="default">default</option>' +
				'<option value="private">private</option>' +
			'</select>' +
			'<span class="select-highlight"></span>' +
			'<span class="select-bar"></span>' +
			'<label for="attr-access-' + indexAttr + '" class="select-label">Access</label></div>');

    $("#attr-number-" + indexAttr).append('<div class="attr-type" id="attributes-type-' + indexAttr + '">' +
        '<div class="select">' +
			'<select class="select-text" id="attr-type-' + indexAttr + '" required="required">' +
				'<option value="" disabled="disabled" selected="selected"></option>' +
				'<optgroup label="Base types:">' +
				'<option value="boolean">boolean</option>' +
				'<option value="int">int</option>' +
				'<option value="float">float</option>' +
				'<option value="double">double</option>' +
				'<option value="String">String</option>' +
				'<option value="Date">Date</option>' +
				'</optgroup>' +
				'<optgroup label="Array types:">' +
				'<option value="boolean[]">boolean[]</option>' +
				'<option value="int[]">int[]</option>' +
				'<option value="float[]">float[]</option>' +
				'<option value="double[]">double[]</option>' +
				'<option value="String[]">String[]</option>' +
				'<option value="Date[]">Date[]</option>' +
			'</select>' +
			'<span class="select-highlight"></span>' +
			'<span class="select-bar"></span>' +
			'<label for="attr-type-' + indexAttr + '" class="select-label">Type</label></div>');

    $("#attr-number-" + indexAttr).append('<div class="attr-name" id="attributes-name-' + indexAttr + '">' +
        '<div class="group">' +
			'<input id="attr-name-' + indexAttr + '" type="text" name="attr-name-' + indexAttr + '" size="8" required="required"/>' +
			'<span class="highlight"></span>' +
			'<span class="bar"></span>' +
			'<label for="attr-name-' + indexAttr + '">Name</label>' +
		'</div></div>');

    $("#attr-number-" + indexAttr).append('<div id="attr-remove-' + indexAttr + '">' +
        '<button class="removeAttrBtn material-button" title="Remove this attribute">Remove</button></div>');

    $("#attr-remove-" + indexAttr + " .removeAttrBtn").click(function() {
        const parentId = $(this).parent().attr("id");
        const realIndexAttr = parentId.slice(12, parentId.length);
        removeAttribute(realIndexAttr);
    });

    $("#attributes").append('<div id="add-new-attr">' +
        '<button class="material-button" id="addAttrBtn" title="Add a new attribute">Add Attr.</button>' +
		'<button class="material-button" id="confirmButton">OK</button></div>');

    $("#addAttrBtn").click(function() {
        addNewAttribute(totAttrs);
    });

	$("#confirmButton").click(function() {
        confirmAction();
    });
}

function removeAttribute(lastIndexAttr) {
    $("#attr-number-" + lastIndexAttr).remove();
}

function confirmAction() {
    elementDC.model.attr("label/text", $("#elementName").val());

    if(elementDC.model.get("elementType") === "rd.Entity") {
        elementDC.model.set("access", $("select#new-access option:checked").val());

        if($("#new-is-singleton")[0].checked) {
            elementDC.model.set("singleton", "true");
        }
        else {
            elementDC.model.set("singleton", "false");
        }

        elementDC.model.set("attributes", []);
        const arrayAttrs = $("#attributes").children();

        for(let i = 0; i < arrayAttrs.length-1; i++) {
            const indexAttr = arrayAttrs[i].getAttribute("id").slice(12, arrayAttrs[i].getAttribute("id").length);

            const tmpAccess = $("select#attr-access-" + indexAttr + " option:checked").val();
            const tmpType = $("select#attr-type-" + indexAttr + " option:checked").val();
            const tmpName = $("#attr-name-" + indexAttr).val();

            if((tmpAccess !== "") && (tmpType !== "") && (tmpName !== "")) {
                let tmpArray = {};
                tmpArray["access"] = tmpAccess;
                tmpArray["type"] = tmpType;
                tmpArray["name"] = tmpName;

                elementDC.model.get("attributes").push(tmpArray);
            }
        }

        $("#add-new-attr").remove();
    }

    closeEditTile();
}



export function closeEditTile() {
    $("#edit-tile").attr("class", "no-editing");

    if(elementDC.model.get("elementType") === "rd.Entity") {
        $("#otherFields")[0].innerHTML = "";
    }
}

export function removeElement() {
    if(confirm("Are you sure you want to delete this element?"))
        elementDC.model.remove();

    closeEditTile();
}