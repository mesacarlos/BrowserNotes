/**
 * Saves note into WebStorage
 */
function saveStorage(){
	var encryptedNoteResult = encrypt(jsonFile);
	
	window.localStorage.encryptedJsonString = encryptedNoteResult;
	showInfo(lang.saved);
}

/**
 * Saves note to a file
 */
function saveFile(){
	var encryptedNoteResult = encrypt(jsonFile);
	
	download(getTitle() + "-encrypted.AESjson", encryptedNoteResult)
	showInfo(lang.saved);
}

/**
 * Saves to URL
 */
function saveToLink(){
	var encryptedNoteResult = encrypt(jsonFile);
	window.history.pushState('', lang.encrypted_note, '?data=' + encryptedNoteResult);
	showInfo(lang.get_parameters_set);
}