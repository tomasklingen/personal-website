// module_utils.js: An ES Module providing utility functions

console.log('Module Utils: Evaluating module code') // Runs once when the module graph is processed

const utilityMessage = 'This is a utility message'

// Explicitly export the function and variable
export function displayModuleMessage(elementId, message) {
	const element = document.getElementById(elementId)
	if (element) {
		element.innerHTML += `<p>Module Utils function: ${message}</p>`
	}
	console.log('Module Utils: displayModuleMessage executed')
}

export function getUtilityMessage() {
	console.log('Module Utils: getUtilityMessage executed')
	return utilityMessage
}

// Code here runs only when the module is first evaluated
console.log('Module Utils: Module evaluation complete')
