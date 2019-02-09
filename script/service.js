/*
Encriptador v2.0.1
https://github.com/SrCharlystar
(c) 2018-2019 SrCharlystar. All rights reserved.
*/
class Encriptador{
	startup(){
		//Language phrases and variable initialization
		this.encryptedTitle;
		this.encryptedContent;
		this.pwd;
		this.autosave = false;
		this.lang;
		this.setLanguage("en_US");
		//Check for possible notes in the URL. If set, load saved note and ask for password.
		if(window.location.search){
			this.encryptedTitle = this.getParameterByName("t");
			this.encryptedContent = this.getParameterByName("d");
			this.pwdPrompt();
		}
	}

	/**
	 * Asks for passwd
	 */
	pwdPrompt(){
		//Ask for password and decrypt content
		this.pwd = prompt(this.lang.pwd_ask);
		this.decrypt();
		var tmp = this.getText();
		//Check for incorrect password and prompt again
		while(tmp == ""){
			this.pwd = prompt(this.lang.pwd_ask_retry);
			this.decrypt();
			tmp = this.getText();
		}
	}

	/**
	 * Encrypts note
	 * If password was not set, ask user for it.
	 */
	encrypt(){
		if(!this.pwd)
			this.chPwd();
		this.encryptedTitle = CryptoJS.AES.encrypt(this.getTitle(), this.pwd);
		this.encryptedContent = CryptoJS.AES.encrypt(this.getText(), this.pwd);
	}

	/**
	 * Decrypts note and updates document.
	 * If password is incorrect (exception catched) prompt it again
	 */
	decrypt(){
		try {
			document.getElementById("title").innerText = CryptoJS.AES.decrypt(this.encryptedTitle, this.pwd).toString(CryptoJS.enc.Utf8);
			document.getElementById("main").innerText = CryptoJS.AES.decrypt(this.encryptedContent, this.pwd).toString(CryptoJS.enc.Utf8);
		} catch (e) {
			this.pwdPrompt();
			this.decrypt();
		}
	}

	/**
	 * Get note title
	 */
	getTitle(){
		return document.getElementById("title").innerText;
	}

	/**
	 * Get note content
	 */
	getText(){
		return document.getElementById("main").innerText;
	}

	/**
	 * Change/set password
	 */
	chPwd(){
		var pwd1 = prompt(this.lang.pwd_change);
		var pwd2 = prompt(this.lang.pwd_change_confirm);
		if(pwd1 != pwd2){
			this.showInfo(this.lang.pwd_change_error);
			return;
		}
		this.pwd = pwd1;
		this.encrypt();
		this.showInfo(this.lang.pwd_change_correct);
		this.setLink();
	}

	/**
	 * Update document language
	 */
	setLanguage(locale){
		var oldLang = this.lang; //Used to check if title/content changed
		//Set dialog phrases
		switch(locale){
			case "en_US":
				this.lang = {
				  "title": "Encrypted note",
				  "note_title": "Untitled note",
				  "note_content": "Hello, World!",
				  "save_to_file": "Save to file",
				  "load_file": "Load file",
				  "change_password": "Change password",
				  "generate_link": "Generate link",
				  "toggle_autosave": "Enable/Disable auto-save",
				  "pwd_ask": "Please type your password.",
				  "pwd_ask_retry": "Password is not correct!\nPlease insert your password.",
				  "pwd_change": "Please type your new password.",
				  "pwd_change_confirm": "Please confirm your password.",
				  "pwd_change_error": "Passwords do not match so password was not changed.",
				  "pwd_change_correct": "Password changed",
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
				this.lang = {
				  "title": "Nota encriptada",
				  "note_title": "Nota sin título",
				  "note_content": "¡Hola mundo!",
				  "save_to_file": "Guardar a archivo",
				  "load_file": "Cargar archivo",
				  "change_password": "Cambiar contraseña",
				  "generate_link": "Generar enlace",
				  "toggle_autosave": "Activar/Desactivar autoguardado",
				  "pwd_ask": "Por favor, introduce la contraseña.",
				  "pwd_ask_retry": "La contraseña no es correcta.\nPor favor, introduce la contraseña.",
				  "pwd_change": "Escribe tu nueva contraseña",
				  "pwd_change_confirm": "Confirma tu contraseña.",
				  "pwd_change_error": "Las contraseñas no coinciden por lo que tu contraseña no ha sido cambiada.",
				  "pwd_change_correct": "Contraseña modificada con éxito.",
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
		//Set button phrases
		document.title = this.lang.title;
		document.getElementById("save").textContent = this.lang.save_to_file;
		document.getElementById("load").textContent = this.lang.load_file;
		document.getElementById("chpwd").textContent = this.lang.change_password;
		document.getElementById("glinkbtn").textContent = this.lang.generate_link;
		document.getElementById("tglautosavebtn").textContent = this.lang.toggle_autosave;
		document.getElementById("savestorage").textContent = this.lang.save_storage;
		document.getElementById("loadstorage").textContent = this.lang.load_storage;
		if(!oldLang || oldLang.note_title == this.getTitle())
			document.getElementById("title").innerText = this.lang.note_title;
		if(!oldLang || oldLang.note_content == this.getText())
			document.getElementById("main").innerText = this.lang.note_content;
	}

	/**
	 * Show info to user
	 */
	showInfo(text){
		if(text != "")
			document.getElementById("info").innerHTML = text + " | ";
	}

	/**
	 * Saves and reports user
	 */
	saveToLink(){
		this.setLink();
		this.showInfo(this.lang.get_parameters_set);
	}

	/**
	 * Updates address' bar link
	 * Called only when a save WITHOUT REPORTING to the user is needed.
	 */
	setLink(){
		this.encrypt();
		window.history.pushState('', this.lang.encrypted_note, '?t=' + this.encryptedTitle + '&d=' + this.encryptedContent);
	}

	/**
	 * Toggle autosave and show info to the user
	 */
	toggleAutoSave(){
		this.autosave = !this.autosave;
		this.showInfo(this.lang.auto_encode_toggle + this.autosave);
	}

	/**
	 * Fired when a key is pressed. Saves changes if autosave is enabled
	 */
	trySave(){
		if(this.autosave)
			this.setLink();
	}

	/**
	 * Saves note to a file
	 */
	saveFile(){
		//Save changes
		this.encrypt();
		//JSON string creation
		var obj = new Object();
		obj.title = this.encryptedTitle.toString();
		obj.content = this.encryptedContent.toString();
		var jsonString = JSON.stringify(obj, null, 4);
		this.download(this.getTitle() + "-encrypted.AESjson", jsonString)
		this.showInfo(this.lang.saved);
	}
	
	saveStorage(){
		//Save changes
		this.encrypt();
		window.localStorage.title = this.encryptedTitle;
		window.localStorage.content = this.encryptedContent;
		this.showInfo(this.lang.saved);
	}
	
	loadStorage(){
		this.encryptedTitle = window.localStorage.title;
		this.encryptedContent = window.localStorage.content;
		//Desencriptamos
		this.decrypt();
		//Informamos
		this.showInfo(this.lang.file_loaded);
	}
	
	loadFile(o){
		var fr = new FileReader();
		fr.onloadend = function(e){
			var tmp = JSON.parse(e.target.result);
			document.getElementById("title").innerText = "";
			document.getElementById("main").innerText = "";
			enc.encryptedTitle = tmp.title;
			enc.encryptedContent = tmp.content;
			enc.pwdPrompt();
			enc.decrypt();
			enc.showInfo(enc.lang.file_loaded);
		};
		fr.readAsText(o.files[0]);
	}

	getParameterByName(name) {
		var url = window.location.href;
		name = name.replace(/[\[\]]/g, '\\$&');
		var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
			results = regex.exec(url);
		if (!results) return null;
		if (!results[2]) return '';
		return decodeURIComponent(results[2]);
	}

	download(filename, text) {
		var element = document.createElement('a');
		element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
		element.setAttribute('download', filename);
		element.style.display = 'none';
		document.body.appendChild(element);
		element.click();
		document.body.removeChild(element);
	}
}
var enc = new Encriptador();