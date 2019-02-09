
# BrowserNotes

**DEPRECATED VERSION: Please consider moving to BrowserNotes2 for multinote and better performance**

Simple, minimal and small HTML document to save your passwords or notes AES-encrypted in your web browser or device.

BrowserNotes is designed to be portable, so that a single file contains everything necessary to run correctly. Also, it is designed to be used without internet connection, including all the necessary libraries.

### Where to save your document
You can save your note into:

 1. **WebStorage**: Save your encrypted note into your browser clicking "Save to WebStorage".
 2. **File**: If you need to save multiple notes, you can save them in your device in a JSON based file, wich stores your note encrypted.
 3. **URL**: Not recommended. Generates a URL to save your note in your bookmarks. It is not reccomended because you need to re-bookmark your note every time you edit it.

### Also included

 - **Multi-language**: Translated into English (default) and Spanish. More languages can be easily added, just editing a JSON file. Also, to change default language, change `setLanguage("en_US")` at `startup()` function.
