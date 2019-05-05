/**
 * Update document language
 */
function setLanguage(locale){
	//Used to check if title/content changed
	var oldLang = lang;
	// This saves user preference in localStorage to
	// persist locale across windows (and sessions)
	window.localStorage.userLocale = locale;
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
			  "password_not_provided": "Password is not set. Please type a password and retry.",
			  "pwd_ask": "Please type your password.",
			  "pwd_change": "Please type your new password.",
			  "pwd_change_confirm": "Confirm your password",
			  "pwd_change_error": "Passwords do not match so password was not changed.",
			  "pwd_change_correct": "Done. Save your note to finish password change.",
			  "get_parameters_set": "Done. Remember to save page to bookmarks!",
			  "encrypted_note": "Encrypted Note",
			  "auto_encode_toggle": "Automatic link generation was set to ",
			  "saved": "Saved.",
			  "ok_modal": "OK",
			  "password_modal": "Password",
			  "file_loaded": "File loaded successfully.",
			  "save_storage": "Save to WebStorage",
			  "load_storage": "Load from WebStorage",
			  "note": "Note",
			  "add_note": "Add note",
			  "delete_note": "Delete note"
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
			  "password_not_provided": "No has introducido contraseña. Inserta una e inténtalo de nuevo.",
			  "pwd_ask": "Por favor, introduce la contraseña.",
			  "pwd_change": "Escribe tu nueva contraseña",
			  "pwd_change_confirm": "Confirma tu contraseña",
			  "pwd_change_error": "Las contraseñas no coinciden por lo que tu contraseña no ha sido cambiada.",
			  "pwd_change_correct": "Hecho. Guarda la nota para guardar la nueva contraseña.",
			  "get_parameters_set": "Hecho. Recuerda guardar la página en marcadores o descargar el fichero.",
			  "encrypted_note": "Nota encriptada",
			  "auto_encode_toggle": "La generacion automatica de enlaces ha sido cambiada a ",
			  "saved": "Guardado.",
			  "ok_modal": "Aceptar",
			  "password_modal": "Contraseña",
			  "file_loaded": "Archivo cargado con éxito.",
			  "save_storage": "Guardar WebStorage",
			  "load_storage": "Leer WebStorage",
			  "note": "Nota",
			  "add_note": "Añadir nota",
			  "delete_note": "Borrar nota"
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
	document.getElementById("modalSetPasswordButton").textContent = lang.ok_modal;
	document.getElementById("modalChangePasswordButton").textContent = lang.ok_modal;
	document.getElementById("modalSetPasswordTitle").textContent = lang.password_modal;
	document.getElementById("modalSetPasswordInput").placeholder = lang.password_modal;
	document.getElementById("modalSetPasswordDescription").textContent = lang.pwd_ask;
	document.getElementById("modalChangePasswordTitle").textContent = lang.password_modal;
	document.getElementById("modalChangePasswordInput1").placeholder = lang.password_modal;
	document.getElementById("modalChangePasswordInput2").placeholder = lang.pwd_change_confirm;
	document.getElementById("note-dropdown").textContent = lang.note;
	document.getElementById("addNote").textContent = lang.add_note;
	document.getElementById("deleteNote").textContent = lang.delete_note;
	if(!oldLang || oldLang.note_title == getTitle())
		document.getElementById("title").innerText = lang.note_title;
	if(!oldLang || oldLang.note_content == getText())
		document.getElementById("main").innerText = lang.note_content;
}