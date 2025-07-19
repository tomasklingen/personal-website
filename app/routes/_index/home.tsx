import type React from 'react'
import { Link } from 'react-router'
import { ThoughtListItem } from '~/components/ThoughtListItem'
import type { ThoughtPost } from '~/lib/thoughts'
import avatar from '~/resources/img/avatar.avif'
import { GridGlowEffect } from './GridGlowEffect'
import { BlueskyIcon, GithubIcon, LinkedinIcon } from './SocialIcons'

const socialLinks = [
	{
		href: 'https://bsky.app/profile/tomasklingen.nl',
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

type HomeProps = {
	recentThoughts: ThoughtPost[]
}

export const Home: React.FC<HomeProps> = ({ recentThoughts }) => {
	return (
		<div className="min-h-screen relative w-full overflow-hidden bg-gradient-to-br dark:from-neutral-950 dark:via-neutral-900 dark:to-neutral-800 dark:text-white">
			<GridGlowEffect />

			{/* Main content */}
			<div className="container mx-auto px-6 lg:px-40 py-20 flex flex-col items-center justify-between relative z-10">
				{/* Left column - Introduction */}
				<div className="mb-10">
					<div className="flex items-center mb-6 gap-6">
						<img
							src={avatar}
							alt="Tomas Klingen"
							className="w-28 h-28 rounded-full object-cover border-2 border-neutral-700 shadow-lg"
						/>
						<div>
							<h1 className="text-4xl sm:text-5xl font-bold">
								Hi 👋 I'm Tomas
							</h1>
						</div>
					</div>
					<h2 className="text-xl text-gray-500 dark:text-gray-300 mb-6">
						A Front-end Web Developer from the Netherlands
					</h2>

					<p className="text-lg text-gray-400 mb-8">
						Welcome to my personal spot on the web! I enjoy crafting web
						experiences using modern technologies, with a strong focus on
						creating highly maintainable and quality code. In my free time
						you can find me cycling,{' '}
						<Link to="/run/" className="underline">
							running
						</Link>
						, or doing Crossfit. I'm based in Nieuwegein, Netherlands.
					</p>
					<div className="flex space-x-4 justify-center">
						{socialLinks.map((link) => (
							<SocialLink key={link.href} {...link} />
						))}
					</div>
				</div>

				{/* Recent Thoughts Section */}
				{recentThoughts.length > 0 && (
					<div className="mb-8 w-full">
						<div className="bg-neutral-800/50 backdrop-blur-sm p-6 md:p-8 rounded-lg border border-neutral-700 shadow-xl">
							<div className="flex items-center justify-between mb-6">
								<h3 className="text-xl font-semibold text-gray-200">
									Recent Thoughts
								</h3>
								<Link
									to="/thoughts/"
									className="text-emerald-400 hover:text-emerald-300 transition-colors text-sm font-medium"
								>
									View all →
								</Link>
							</div>
							<div className="space-y-4">
								{recentThoughts.map((thought) => (
									<ThoughtListItem
										key={`${thought.year}-${thought.slug}`}
										thought={thought}
										className="bg-neutral-700/30 p-4 rounded-lg hover:bg-neutral-700/50 transition-colors"
										variant="compact"
										dateFormat="short"
									/>
								))}
							</div>
						</div>
					</div>
				)}

				{/* Skills & Projects Block */}
				<div className="space-y-6">
					{/* Skills Card */}
					<div className="bg-neutral-800/50 backdrop-blur-sm p-3 md:p-8 rounded-lg border border-neutral-700 shadow-xl">
						<h3 className="text-xl font-semibold mb-4 text-gray-200">
							My Go-To Tech & Methods
						</h3>
						<div className="grid grid-cols-2 gap-1.5 md:gap-4">
							<div className="bg-neutral-700/50 p-4 rounded border-l-4 border-blue-500/60 hover:border-blue-500 transition-colors duration-200 group">
								<h4 className="font-medium text-gray-300 mb-2 flex items-center">
									<strong className="mr-2">💻</strong>
									My Favorite Tech
								</h4>
								<p className="text-gray-400 text-sm">
									I primarily work with TypeScript, React, Angular,
									Node, Deno and RxJS.
								</p>
							</div>
							<div className="bg-neutral-700/50 p-4 rounded border-l-4 border-purple-500/60 hover:border-purple-500 transition-colors duration-200 group">
								<h4 className="font-medium text-gray-300 mb-2 flex items-center">
									<strong className="mr-2">🎯</strong>
									How I Like to Code
								</h4>
								<p className="text-gray-400 text-sm">
									I focus on writing code that's maintainable,
									testable, performs well, and is easy to understand.
								</p>
							</div>
							<div className="bg-neutral-700/50 p-4 rounded border-l-4 border-green-500/60 hover:border-green-500 transition-colors duration-200 group">
								<h4 className="font-medium text-gray-300 mb-2 flex items-center">
									<strong className="mr-2">🛠️</strong>
									Tools of the Trade
								</h4>
								<p className="text-gray-400 text-sm">
									My daily drivers include Vite, Webpack, Jest, Vitest,
									and CI/CD tools like Gitlab & Github Actions.
								</p>
							</div>
							<div className="bg-neutral-700/50 p-4 rounded border-l-4 border-rose-500/60 hover:border-rose-500 transition-colors duration-200 group">
								<h4 className="font-medium text-gray-300 mb-2 flex items-center">
									<strong className="mr-2">👨‍💻</strong>
									My Approach
								</h4>
								<p className="text-gray-400 text-sm">
									I believe in paying close attention to detail and
									enjoy tackling tricky problems.
								</p>
							</div>
						</div>
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
