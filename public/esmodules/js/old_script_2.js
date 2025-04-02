// old_script_2.js: Traditional Script 2

console.log('Old Script 2: Executing')

// Relies on script1 already having run and added its variable to the global scope
// This can be fragile and depends on the order in the HTML
if (typeof messageFromScript1 !== 'undefined') {
	console.log('Old Script 2: Found message from Script 1:', messageFromScript1)
} else {
	console.error(
		'Old Script 2: messageFromScript1 is not defined! Load order issue?',
	)
}

// Also relies on the function from script 1 being globally available
if (typeof displayOldMessage === 'function') {
	displayOldMessage(
		'output-old',
		"Script 2 loaded and using Script 1's function",
	)
} else {
	console.error('Old Script 2: displayOldMessage function not found!')
}

const element = document.getElementById('output-old')
if (element) {
	element.innerHTML += '<p>Old Script 2 finished executing</p>'
}

console.log('Old Script 2: Finished')
