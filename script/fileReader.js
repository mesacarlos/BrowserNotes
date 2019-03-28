/**
 * Loads note from WebStorage
 */
function loadStorage(){
	pendingEncryptedJson = window.localStorage.encryptedJsonString;
	pwdPrompt();
}

/**
 * Loads from file
 */
function loadFile(o){
	var fr = new FileReader();
	fr.onloadend = function(e){
		pendingEncryptedJson = e.target.result;
		pwdPrompt();
	};
	fr.readAsText(o.files[0]);
}

/**
 * Loads from URL (data GET parameter)
 */
function loadURL(){
	pendingEncryptedJson = getParameterByName("data");
	pwdPrompt();
}