// old_script_1.js: Traditional Script 1

console.log('Old Script 1: Executing')

// This variable is implicitly added to the global scope (window)
var messageFromScript1 = 'Hello from Old Script 1!'

function displayOldMessage(elementId, message) {
	const element = document.getElementById(elementId)
	if (element) {
		element.innerHTML += `<p>Old Script 1 function: ${message}</p>`
	}
}

displayOldMessage('output-old', 'Script 1 loaded and ran its function')

console.log('Old Script 1: Finished')
