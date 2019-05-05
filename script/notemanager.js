/**
 * Initializes note
 */
function initializeNotes(){
	index = 0;
	jsonFile = new Object();
	jsonFile.version = 1;
	jsonFile.notes = new Array();
	jsonFile.notes[index] = new Object();
	
	//Set default phrases
	document.getElementById("title").innerText = lang.note_title;
	document.getElementById("main").innerText = lang.note_content;
	reflectChangesOnJson();
}

/**
 * Add a note to document
 */
function addNote(){
	//1. Save actual note before unloading it from view
	reflectChangesOnJson();
	
	//2. Create new note and show it
	index = jsonFile.notes.length;
	jsonFile.notes[index] = new Object();
	document.getElementById("title").innerText = lang.note_title;
	document.getElementById("main").innerText = lang.note_content;
	
	//3. Update jsonFile and add it to menu (navbar)
	reflectChangesOnJson();
	updateNotesList();
}

/**
 * Delete a note from document
 */
function deleteNote(){
	jsonFile.notes.splice(index, 1); //Delete note from object
	index = jsonFile.notes.length - 1; //Point to last note in array
	if(index == -1){
		initializeNotes(); //Reinitialize notes as they are all deleted
	}else{
		updateVisibleNote(); //Show the last note
	}
	updateNotesList();
}

/**
 * Update notes from dropdown at navbar
 */
function updateNotesList(){
	//Delete all notes in dropdown
	$('.notemenuitem').remove();
	
	//Add all other notes
	for(var i = 0; i < jsonFile.notes.length; i++){
		$('#noteslist').append('<a class="dropdown-item notemenuitem" href="#" onclick="openNote(' + i + ')">' + jsonFile.notes[i].title + '</a>');
	}
}

/**
 * Opens a note
 */
function openNote(noteToView){
	reflectChangesOnJson();
	index = noteToView;
	updateVisibleNote();
}