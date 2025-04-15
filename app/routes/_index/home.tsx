import type React from 'react'
import { GridGlowEffect } from './GridGlowEffect'

export const Home: React.FC = () => {
	return (
		<div className="min-h-screen relative w-full overflow-hidden bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-800 text-white">
			<GridGlowEffect />

			{/* Main content */}
			<div className="container mx-auto px-6 py-20 flex flex-col md:flex-row items-center justify-between relative z-10">
				{/* Left column - Introduction */}
				<div className="md:w-1/2 mb-10 md:mb-0">
					<h1 className="text-5xl sm:text-6xl font-bold mb-6 text-white">
						Tomas Klingen
					</h1>
					<h2 className="text-2xl text-gray-300 mb-6">
						Front-end Web Developer
					</h2>
					<p className="text-lg text-gray-400 mb-8">
						Crafting responsive, user-centered web experiences with modern
						technologies. Based in Nieuwegein, Netherlands.
					</p>
					<div className="flex space-x-4">
						<a
							href="https://bsky.app/profile/tomasklingen.bsky.social"
							target="_blank"
							title="Bluesky"
							className="p-3 bg-neutral-800 hover:bg-neutral-700 transition-colors duration-200 rounded-md group"
							rel="noreferrer"
						>
							<svg
								viewBox="0 0 600 530"
								version="1.1"
								xmlns="http://www.w3.org/2000/svg"
								className="icon w-6 h-6 text-white group-hover:text-white transition-all duration-200"
							>
								<title>Bluesky logo</title>
								<path
									d="m135.72 44.03c66.496 49.921 138.02 151.14 164.28 205.46 26.262-54.316 97.782-155.54 164.28-205.46 47.98-36.021 125.72-63.892 125.72 24.795 0 17.712-10.155 148.79-16.111 170.07-20.703 73.984-96.144 92.854-163.25 81.433 117.3 19.964 147.14 86.092 82.697 152.22-122.39 125.59-175.91-31.511-189.63-71.766-2.514-7.3797-3.6904-10.832-3.7077-7.8964-0.0174-2.9357-1.1937 0.51669-3.7077 7.8964-13.714 40.255-67.233 197.36-189.63 71.766-64.444-66.128-34.605-132.26 82.697-152.22-67.108 11.421-142.55-7.4491-163.25-81.433-5.9562-21.282-16.111-152.36-16.111-170.07 0-88.687 77.742-60.816 125.72-24.795z"
									fill="currentColor"
								/>
							</svg>
						</a>
						<a
							href="https://www.linkedin.com/in/tomasklingen"
							target="_blank"
							title="LinkedIn"
							className="p-3 bg-neutral-800 hover:bg-neutral-700 transition-colors duration-200 rounded-md group"
							rel="noreferrer"
						>
							<title>Linkedin Logo</title>
							<svg
								className="icon w-6 h-6 text-white group-hover:text-white transition-all duration-200"
								viewBox="0 0 24 24"
								aria-hidden="true"
							>
								<path
									fill="currentColor"
									d="M19 0h-14c-2.762 0-5 2.238-5 5v14c0 2.762 2.238 5 5 5h14c2.762 0 5-2.238 5-5v-14c0-2.762-2.238-5-5-5zm-12 19h-3v-10h3v10zm-1.5-11.233c-.966 0-1.75-.783-1.75-1.75s.784-1.75 1.75-1.75 1.75.783 1.75 1.75-.783 1.75-1.75 1.75zm13.5 11.233h-3v-5.528c0-1.317-.027-3.012-1.841-3.012-1.843 0-2.127 1.439-2.127 2.918v5.622h-3v-10h2.878v1.354h.041c.4-.757 1.379-1.554 2.841-1.554 3.035 0 3.594 2.002 3.594 4.606v5.594z"
								/>
							</svg>
						</a>
						<a
							href="https://github.com/tomasklingen"
							target="_blank"
							title="GitHub"
							className="p-3 bg-neutral-800 hover:bg-neutral-700 transition-colors duration-200 rounded-md group"
							rel="noreferrer"
						>
							<title>Github logo</title>
							<svg
								className="icon w-6 h-6 text-white group-hover:text-white transition-all duration-200"
								viewBox="0 0 24 24"
								aria-hidden="true"
							>
								<path
									fill="currentColor"
									d="M12 .5c-6.624 0-12 5.376-12 12 0 5.306 3.438 9.806 8.207 11.387.6.113.793-.262.793-.583 0-.288-.011-1.048-.016-2.056-3.338.727-4.042-1.609-4.042-1.609-.546-1.386-1.333-1.755-1.333-1.755-1.086-.744.082-.729.082-.729 1.201.084 1.833 1.234 1.833 1.234 1.067 1.83 2.798 1.3 3.482.996.108-.773.42-1.301.762-1.601-2.665-.305-5.466-1.335-5.466-5.933 0-1.311.469-2.383 1.235-3.221-.124-.305-.536-1.527.117-3.184 0 0 1.008-.323 3.301 1.23.96-.267 1.987-.4 3.009-.404 1.022.004 2.049.137 3.012.404 2.289-1.554 3.294-1.23 3.294-1.23.656 1.657.244 2.879.12 3.184.77.838 1.233 1.91 1.233 3.221 0 4.609-2.805 5.624-5.475 5.921.43.371.814 1.104.814 2.223 0 1.606-.014 2.899-.014 3.293 0 .324.192.698.799.58 4.765-1.583 8.198-6.081 8.198-11.384 0-6.624-5.376-12-12-12z"
								/>
							</svg>
						</a>
					</div>
				</div>

				{/* Right column - Skills & Projects */}
				<div className="md:w-1/2 space-y-6">
					{/* Skills Card */}
					<div className="bg-neutral-800/50 backdrop-blur-sm p-8 rounded-lg border border-neutral-700 shadow-xl">
						<h3 className="text-xl font-semibold mb-4 text-gray-200">
							Skills & Expertise
						</h3>
						<div className="grid grid-cols-2 gap-3">
							<div className="bg-neutral-700/50 p-4 rounded border-l-4 border-blue-500/60 hover:border-blue-500 transition-colors duration-200 group">
								<h4 className="font-medium text-gray-300 mb-2 flex items-center">
									<strong className="mr-2">💻</strong>
									Tech
								</h4>
								<p className="text-gray-400 text-sm">
									TypeScript, React, Angular, RxJS
								</p>
							</div>
							<div className="bg-neutral-700/50 p-4 rounded border-l-4 border-purple-500/60 hover:border-purple-500 transition-colors duration-200 group">
								<h4 className="font-medium text-gray-300 mb-2 flex items-center">
									<strong className="mr-2">🎯</strong>
									Coding Style
								</h4>
								<p className="text-gray-400 text-sm">
									Maintainable, Testable, Performant, Concise
								</p>
							</div>
							<div className="bg-neutral-700/50 p-4 rounded border-l-4 border-green-500/60 hover:border-green-500 transition-colors duration-200 group">
								<h4 className="font-medium text-gray-300 mb-2 flex items-center">
									<strong className="mr-2">🛠️</strong>
									Tools
								</h4>
								<p className="text-gray-400 text-sm">
									Vite, Webpack, Jest, Vitest, Gitlab, Github Actions,
									CI/CD
								</p>
							</div>
							<div className="bg-neutral-700/50 p-4 rounded border-l-4 border-rose-500/60 hover:border-rose-500 transition-colors duration-200 group">
								<h4 className="font-medium text-gray-300 mb-2 flex items-center">
									<strong className="mr-2">👨‍🔬</strong>
									Approach
								</h4>
								<p className="text-gray-400 text-sm">
									Attention to Detail, Problem Solving
								</p>
							</div>
						</div>
					</div>

					{/* Projects Card */}
					<div className="bg-neutral-800/50 backdrop-blur-sm p-6 rounded-lg border border-neutral-700 shadow-xl">
						<h3 className="text-xl font-semibold mb-3 text-gray-200">
							Projects
						</h3>
						<ul className="space-y-2">
							<li>
								<a
									href="/run"
									className="group flex items-center text-gray-300 hover:text-white transition-colors duration-200"
								>
									<span className="w-4 h-4 mr-2">🏃</span>
									<span className="border-b border-gray-700 group-hover:border-emerald-500/40 pb-px">
										Running Pace Calculator (React Router)
									</span>
								</a>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	)
}
