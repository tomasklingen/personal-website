import { Home as HomeComponent } from './home'

export function meta() {
	return [
		{ title: 'Tomas Klingen - Front-end Web Developer' },
		{ name: 'description', content: 'Welcome to my portfolio' },
	]
}

export default function Home() {
	return <HomeComponent />
}
