// main_module.js: The main ES Module entry point

// Explicitly import specific items from another module
// The path must be relative or absolute
import { displayModuleMessage, getUtilityMessage } from './module_utils.js'

console.log('Main Module: Executing') // Runs after module dependencies are evaluated

// Use the imported function
displayModuleMessage('output-new', 'Main module loaded and ran utils function')

// Use the other imported function
const message = getUtilityMessage()
console.log('Main Module: Received message from utils:', message)

const element = document.getElementById('output-new')
if (element) {
	element.innerHTML += `<p>Main Module received: "${message}"</p>`
	element.innerHTML += '<p>Main Module finished executing</p>'
}

console.log('Main Module: Finished')
