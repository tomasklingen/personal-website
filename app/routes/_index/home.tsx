import type React from 'react'
import avatar from '~/resources/img/avatar.avif'
import { GridGlowEffect } from './GridGlowEffect'
import { BlueskyIcon, GithubIcon, LinkedinIcon } from './SocialIcons'

const socialLinks = [
	{
		href: 'https://bsky.app/profile/tomasklingen.bsky.social',
		title: 'Bluesky',
		IconComponent: BlueskyIcon,
		'aria-label': 'Visit Tomas Klingen on Bluesky',
	},
	{
		href: 'https://www.linkedin.com/in/tomasklingen',
		title: 'LinkedIn',
		IconComponent: LinkedinIcon,
		'aria-label': 'Visit Tomas Klingen on LinkedIn',
	},
	{
		href: 'https://github.com/tomasklingen',
		title: 'GitHub',
		IconComponent: GithubIcon,
		'aria-label': 'Visit Tomas Klingen on GitHub',
	},
]

export const Home: React.FC = () => {
	return (
		<div className="min-h-screen relative w-full overflow-hidden bg-gradient-to-br dark:from-neutral-950 dark:via-neutral-900 dark:to-neutral-800 dark:text-white">
			<GridGlowEffect />

			{/* Main content */}
			<div className="container mx-auto px-6 py-20 flex flex-col md:flex-row items-center justify-between relative z-10">
				{/* Left column - Introduction */}
				<div className="md:w-1/2 mb-10 md:mb-0">
					<div className="flex items-center mb-6 gap-6">
						<img
							src={avatar}
							alt="Tomas Klingen"
							className="w-28 h-28 rounded-full object-cover border-2 border-neutral-700 shadow-lg"
						/>
						<div>
							<h1 className="text-4xl sm:text-5xl font-bold">
								Tomas Klingen
							</h1>
							<h2 className="text-xl text-gray-500 dark:text-gray-300">
								Front-end Web Developer
							</h2>
						</div>
					</div>
					<p className="text-lg text-gray-400 mb-8">
						Crafting responsive, user-centered web experiences with modern
						technologies. Based in Nieuwegein, Netherlands.
					</p>
					<div className="flex space-x-4">
						{socialLinks.map((link) => (
							<SocialLink key={link.href} {...link} />
						))}
					</div>
				</div>

				{/* Right column - Skills & Projects */}
				<div className="md:w-1/2 space-y-6">
					{/* Skills Card */}
					<div className="bg-neutral-800/50 backdrop-blur-sm p-3 md:p-8 rounded-lg border border-neutral-700 shadow-xl">
						<h3 className="text-xl font-semibold mb-4 text-gray-200">
							Skills & Expertise
						</h3>
						<div className="grid grid-cols-2 gap-1.5 md:gap-4">
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

interface SocialLinkProps {
	href: string
	title: string
	'aria-label': string
	IconComponent: React.ElementType
}

const SocialLink: React.FC<SocialLinkProps> = ({
	href,
	title,
	'aria-label': ariaLabel,
	IconComponent,
}) => {
	return (
		<a
			href={href}
			target="_blank"
			rel="noreferrer"
			title={title}
			aria-label={ariaLabel}
			className="p-3 bg-neutral-800 hover:bg-neutral-700 transition-colors duration-200 rounded-md group"
		>
			<IconComponent className="icon w-6 h-6 text-white group-hover:text-white transition-all duration-200" />
		</a>
	)
}
