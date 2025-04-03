const buttonGroup = document.getElementById('distance-group') as HTMLElement
const sections = document.querySelectorAll('.distance-section')
const buttons = buttonGroup.querySelectorAll('button')

function updateView(distance: string) {
	buttons.forEach((btn) => {
		btn.classList.toggle('active', btn.dataset.distance === distance)
	})

	sections.forEach((section) => {
		section.classList.toggle('active', section.id === distance)
	})
}

buttonGroup.addEventListener('click', (e) => {
	const button = e.target as HTMLButtonElement
	if (button.tagName === 'BUTTON') {
		const distance = button.dataset.distance as string
		updateView(distance)
		history.pushState(null, '', `#${distance}`)
	}
})

// Handle back/forward navigation
window.addEventListener('popstate', () => {
	const distance = location.hash.slice(1) || '5k'
	updateView(distance)
})

// Initial view - only update URL if there's a hash
const initialDistance = location.hash.slice(1) || '5k'
updateView(initialDistance)
