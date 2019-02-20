/*
Encriptador v2.0.1
https://github.com/SrCharlystar
(c) 2018-2019 SrCharlystar. All rights reserved.
*/
var jsonFile; //Decrypted JSON file
var index; //Index of note in JSON file
var pwd;
var lang;

/**
 * Language phrases and variable initialization
 * Also, check for possible notes in the URL. If set, load saved note and ask for password.
 */
function startup(){
	index = 0;
	jsonFile = new Object();
	jsonFile.version = 1;
	jsonFile.notes = new Array();
	jsonFile.notes[index] = new Object();
	setLanguage("en_US");
	
	if(window.location.search){
		loadURL();
	}
}

/**
 * Asks for password and saves it into pwd variable.
 */
function pwdPrompt(isRetry){
	if(isRetry)
		pwd = prompt(lang.pwd_ask_retry);
	else
		pwd = prompt(lang.pwd_ask);
}

/**
 * Change/set password
 */
function chPwd(){
	var pwd1 = prompt(lang.pwd_change);
	var pwd2 = prompt(lang.pwd_change_confirm);
	if(pwd1 != pwd2){
		showInfo(lang.pwd_change_error);
		return;
	}
	pwd = pwd1;
	showInfo(this.lang.pwd_change_correct);
}

/**
 * Receives unencrypted note and return it encrypted.
 * If password was not set, ask user for it.
 */
function encrypt(unencryptedObj){
	if(!pwd)
		chPwd();
	reflectChangesOnJson(); //Make sure json file is updated
	var jsonString = JSON.stringify(unencryptedObj, null, 4);
	return CryptoJS.AES.encrypt(jsonString, pwd);
}

/**
 * Receives encrypted note and returns it decrypted.
 * If password is incorrect (exception catched or empty string) prompt it again.
 */
function decrypt(encryptedJson){
	try {
		var result = CryptoJS.AES.decrypt(encryptedJson, pwd).toString(CryptoJS.enc.Utf8);
		if(result == "")
			throw "Not valid";
		return JSON.parse(result);
	} catch (e) {
		pwdPrompt(true);
		return decrypt(encryptedJson);
	}
}

/**
 * Get current note title
 */
function getTitle(){
	return document.getElementById("title").innerText;
}

/**
 * Get current note content
 */
function getText(){
	return document.getElementById("main").innerText;
}

/**
 * Update document language
 */
function setLanguage(locale){
	var oldLang = lang; //Used to check if title/content changed
	//Set dialog phrases
	switch(locale){
		case "en_US":
			lang = {
			  "title": "Encrypted note",
			  "note_title": "Untitled note",
			  "note_content": "Hello, World!",
			  "save_to_file": "Save to file",
			  "file": "File",
			  "language": "Language",
			  "load_file": "Load file",
			  "change_password": "Change password",
			  "generate_link": "Generate link",
			  "pwd_ask": "Please type your password.",
			  "pwd_ask_retry": "Password is not correct!\nPlease insert your password.",
			  "pwd_change": "Please type your new password.",
			  "pwd_change_confirm": "Please confirm your password.",
			  "pwd_change_error": "Passwords do not match so password was not changed.",
			  "pwd_change_correct": "Done. Save your note to finish password change.",
			  "get_parameters_set": "Done. Remember to save page to bookmarks!",
			  "encrypted_note": "Encrypted Note",
			  "auto_encode_toggle": "Automatic link generation was set to ",
			  "saved": "Saved.",
			  "file_loaded": "File loaded successfully.",
			  "save_storage": "Save to WebStorage",
			  "load_storage": "Load from WebStorage"
			}
			break;
		case "es_ES":
			lang = {
			  "title": "Nota encriptada",
			  "note_title": "Nota sin título",
			  "note_content": "¡Hola mundo!",
			  "save_to_file": "Guardar a archivo",
			  "file": "Archivo",
			  "language": "Idioma",
			  "load_file": "Cargar archivo",
			  "change_password": "Cambiar contraseña",
			  "generate_link": "Generar enlace",
			  "pwd_ask": "Por favor, introduce la contraseña.",
			  "pwd_ask_retry": "La contraseña no es correcta.\nPor favor, introduce la contraseña.",
			  "pwd_change": "Escribe tu nueva contraseña",
			  "pwd_change_confirm": "Confirma tu contraseña.",
			  "pwd_change_error": "Las contraseñas no coinciden por lo que tu contraseña no ha sido cambiada.",
			  "pwd_change_correct": "Hecho. Guarda la nota para guardar la nueva contraseña.",
			  "get_parameters_set": "Hecho. Recuerda guardar la página en marcadores o descargar el fichero.",
			  "encrypted_note": "Nota encriptada",
			  "auto_encode_toggle": "La generacion automatica de enlaces ha sido cambiada a ",
			  "saved": "Guardado.",
			  "file_loaded": "Archivo cargado con éxito.",
			  "save_storage": "Guardar WebStorage",
			  "load_storage": "Leer WebStorage"
			}
			break;
		default:
			console.error("No language set");
	}
	//Set navbar phrases
	document.title = lang.title;
	document.getElementById("save").textContent = lang.save_to_file;
	document.getElementById("load").textContent = lang.load_file;
	document.getElementById("chpwd").textContent = lang.change_password;
	document.getElementById("glinkbtn").textContent = lang.generate_link;
	document.getElementById("savestorage").textContent = lang.save_storage;
	document.getElementById("loadstorage").textContent = lang.load_storage;
	document.getElementById("file-dropdown").textContent = lang.file;
	document.getElementById("lang-dropdown").textContent = lang.language;
	if(!oldLang || oldLang.note_title == getTitle())
		document.getElementById("title").innerText = lang.note_title;
	if(!oldLang || oldLang.note_content == getText())
		document.getElementById("main").innerText = lang.note_content;
}

/**
 * Show info to user
 */
function showInfo(text){
	if(text != "")
		document.getElementById("info").innerHTML = text;
}

/**
 * Fired when a key is pressed. Reflects text changes to JSON file
 */
function reflectChangesOnJson(){
	jsonFile.notes[index].title = getTitle();
	jsonFile.notes[index].content = getText();
}

/**
 * Reflects JSON file in screen.
 */
function updateVisibleNote(){
	document.getElementById("title").innerText = jsonFile.notes[index].title;
	document.getElementById("main").innerText = jsonFile.notes[index].content;
}

//DOWN HERE SAVING FUNCTIONS

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
 * Saves to URL and reports user
 */
function saveToLink(){
	setLink();
	showInfo(lang.get_parameters_set);
}

/**
 * Updates address bar link
 * Called only when a save WITHOUT REPORTING to the user is needed.
 */
function setLink(){
	var encryptedNoteResult = encrypt(jsonFile);
	
	window.history.pushState('', lang.encrypted_note, '?data=' + encryptedNoteResult);
}

//DOWN HERE LOADING FUNCTIONS
	
/**
 * Loads note from WebStorage
 */
function loadStorage(){
	jsonFile = decrypt(window.localStorage.encryptedJsonString);
	updateVisibleNote();
	showInfo(lang.file_loaded);
}

/**
 * Loads from file
 */
function loadFile(o){
	var fr = new FileReader();
	fr.onloadend = function(e){
		jsonFile = decrypt(e.target.result)
		updateVisibleNote();
		showInfo(lang.file_loaded);
	};
	fr.readAsText(o.files[0]);
}

/**
 *
 */
function loadURL(){
	var encJsonFile = getParameterByName("data");
	jsonFile = decrypt(encJsonFile);
	updateVisibleNote();
}

//EXTRA FUNCTIONS

function getParameterByName(name) {
	var url = window.location.href;
	name = name.replace(/[\[\]]/g, '\\$&');
	var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
		results = regex.exec(url);
	if (!results) return null;
	if (!results[2]) return '';
	return decodeURIComponent(results[2]);
}

function download(filename, text) {
	var element = document.createElement('a');
	element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
	element.setAttribute('download', filename);
	element.style.display = 'none';
	document.body.appendChild(element);
	element.click();
	document.body.removeChild(element);
}