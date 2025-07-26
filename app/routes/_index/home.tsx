import type React from 'react'
import { Link } from '~/components/Link'
import { SocialLinkComponent } from '~/components/SocialLink'
import { ThoughtListItem } from '~/components/ThoughtListItem'
import { socialLinks } from '~/lib/social'
import type { ThoughtPostSummary } from '~/lib/thoughts'
import avatar from '~/resources/img/avatar.avif'

type HomeProps = {
	recentThoughts: ThoughtPostSummary[]
}

export const Home: React.FC<HomeProps> = ({ recentThoughts }) => {
	return (
		<div className="relative w-full py-20 overflow-hidden  dark:text-white">
			{/* Main content */}
			<div className="container mx-auto px-6 lg:px-40 flex flex-col items-center justify-between relative">
				{/* Left column - Introduction */}
				<div className="mb-10">
					<div className="flex items-center mb-6 gap-6">
						<img
							src={avatar}
							alt="Tomas Klingen"
							className="w-28 h-28 rounded-full object-cover dark:border-2 dark:border-neutral-700 shadow-lg"
						/>
						<div>
							<h1 className="text-4xl sm:text-5xl font-bold">
								Hi 👋 I'm Tomas
							</h1>
						</div>
					</div>
					<h2 className="text-xl text-gray-500 dark:text-gray-200 mb-6">
						A Front-end Web Developer from the Netherlands
					</h2>

					<p className="text-lg text-gray-500 dark:text-gray-300 mb-8">
						Welcome to my personal spot on the web! I enjoy crafting web
						experiences using modern technologies, with a strong focus on
						creating highly maintainable and quality code. In my free time
						you can find me cycling,{' '}
						<Link to="/run/" variant="accent">
							running
						</Link>
						, or doing Crossfit. I'm based in Nieuwegein, Netherlands.
					</p>
					<div className="flex space-x-4 justify-center">
						{socialLinks.map((social) => (
							<SocialLinkComponent
								key={social.href}
								social={social}
								className="p-3 bg-neutral-800/60 hover:bg-neutral-700 transition-colors duration-200 rounded-md group"
								iconClassName="w-6 h-6 text-white group-hover:text-white transition-all duration-200"
							/>
						))}
					</div>
				</div>

				{/* Recent Thoughts Section */}
				{recentThoughts.length > 0 && (
					<div className="mb-8 w-full">
						<div className="md:bg-amber-400/70 md:dark:bg-neutral-900/50 md:backdrop-blur-xs md:p-8 md:-mx-8 rounded-lg border-neutral-700 md:shadow-xl">
							<div className="flex items-center justify-between my-1 mb-4">
								<h2 className="text-xl font-semibold dark:text-gray-200">
									Recent Thoughts 💡
								</h2>
								<Link
									to="/thoughts/"
									variant="default"
									className="text-sm"
								>
									View all →
								</Link>
							</div>
							<div className="space-y-4">
								{recentThoughts.map((thought) => (
									<ThoughtListItem
										key={`${thought.year}-${thought.slug}`}
										thought={thought}
										className="bg-neutral-100 dark:bg-neutral-800/80 p-4 rounded-md transition-colors"
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
					<div className="md:bg-neutral-300 md:dark:bg-neutral-900/50 md:backdrop-blur-xs md:p-8 md:-mx-8 rounded-lg border-neutral-700 md:shadow-xl">
						<h2 className="text-xl font-semibold  my-1 mb-4">
							How I Work
						</h2>
						<div className="grid sm:grid-cols-2 gap-3 md:gap-4">
							<div className="bg-neutral-100/90 dark:bg-neutral-800/80 p-4 rounded-md dark:border-l-4 border-blue-500/60 hover:border-blue-500 transition-colors duration-200 group">
								<h3 className="font-medium dark:text-gray-200 mb-2 flex items-center">
									<strong className="mr-2">💻</strong>
									My Favorite Tech
								</h3>
								<p className="dark:text-gray-400 text-sm">
									I love working with TypeScript, React, Angular, Node,
									Svelte, RxJS.
								</p>
							</div>
							<div className="bg-neutral-100/90 dark:bg-neutral-800/80 p-4 rounded-md dark:border-l-4 border-purple-500/60 hover:border-purple-500 transition-colors duration-200 group">
								<h3 className="font-medium dark:text-gray-200 mb-2 flex items-center">
									<strong className="mr-2">🎯</strong>
									How I Like to Code
								</h3>
								<p className="dark:text-gray-400 text-sm">
									I focus on writing code that's maintainable,
									testable, performs well, and is easy to understand.
								</p>
							</div>
							<div className="bg-neutral-100/90 dark:bg-neutral-800/80 p-4 rounded-md dark:border-l-4 border-green-500/60 hover:border-green-500 transition-colors duration-200 group">
								<h3 className="font-medium dark:text-gray-200 mb-2 flex items-center">
									<strong className="mr-2">🛠️</strong>
									Tools of the Trade
								</h3>
								<p className="dark:text-gray-400 text-sm">
									My daily drivers include Vite, Webpack, Jest, Vitest,
									and CI/CD tools like Gitlab & Github Actions.
								</p>
							</div>
							<div className="bg-neutral-100/90 dark:bg-neutral-800/80 p-4 rounded-md dark:border-l-4 border-rose-500/60 hover:border-rose-500 transition-colors duration-200 group">
								<h3 className="font-medium dark:text-gray-200 mb-2 flex items-center">
									<strong className="mr-2">👨‍💻</strong>
									My Approach
								</h3>
								<p className="dark:text-gray-400 text-sm">
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
