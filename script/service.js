/*
Encriptador v2.3
https://github.com/mesacarlos
(c) 2018-2019 Carlos Mesa. All rights reserved.
*/
var jsonFile; //Decrypted JSON file
var index; //Index of note in JSON file
var pwd;
var lang;
var pendingEncryptedJson;

/**
 * Language phrases and variable initialization
 * Also, check for possible notes in the URL. If set, load saved note and ask for password.
 */
$(document).ready(function() {
	//Initialize internationalization system
	if (typeof window.localStorage.userLocale == "undefined") {
		//User did not select language, changing to default
		window.localStorage.userLocale = "en_US";
	}
    setLanguage(window.localStorage.userLocale);
	
	//Initialize JSON file
    initializeNotes();
	
	//Load Bookmark URL if needed
	if(window.location.search){
		loadURL();
	}
	
	//Update navbar list of notes
	updateNotesList();
});

/**
 * Show Modal dialog asking for password.
 */
function pwdPrompt(){
	if($('#modalSetPassword').is(':visible')){
		const sleep = (milliseconds) => {
		  return new Promise(resolve => setTimeout(resolve, milliseconds))
		}
		sleep(500).then(() => {
		  pwdPrompt();
		});
	}else{
		$('#modalSetPassword').modal('show');
	}
}

/**
 * Fired on set password modal close. Saves password into pwd variable.
 */
function onSetPasswordModalClose(){
	pwd = $("#modalSetPasswordInput").val();
	$("#modalSetPasswordInput").val(""); //Delete password from form
	
	if(pendingEncryptedJson){
		decrypt(pendingEncryptedJson);
	}
}

/**
 * Change or set password
 */
function chPwd(message){
	$('#modalChangePassword').modal('show');
	if(message)
		$("#modalChangePasswordDescription").text(message);
	else
		$("#modalChangePasswordDescription").text(lang.change_password);
}

/**
 * Fired on change password modal close.
 * Changes password.
 */
function onChangePasswordModalClose(){
	var pwd1 = $("#modalChangePasswordInput1").val();
	var pwd2 = $("#modalChangePasswordInput2").val();
	if(pwd1 != pwd2){
		showInfo(lang.pwd_change_error);
		return;
	}
	pwd = pwd1;
	showInfo(this.lang.pwd_change_correct);
	$("#modalChangePasswordInput1").val(""); //Delete passwords from form
	$("#modalChangePasswordInput2").val("");
}

/**
 * Receives unencrypted note and return it encrypted.
 * If password was not set, ask user for it.
 */
function encrypt(unencryptedObj){
	if(!pwd){
		chPwd(lang.password_not_provided);
		pendingEncryption = true;
		throw "Password not defined.";
	}
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
			throw "Password Incorrect";
		jsonFile = JSON.parse(result);
		updateVisibleNote();
		updateNotesList();
		showInfo(lang.file_loaded);
	} catch (e) {
		//Password is not correct or is not defined and must be prompted.
		console.log("Pidiendo pass");
		pendingEncryptedJson = encryptedJson;
		pwdPrompt();
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