import type React from 'react'
import { socialLinks } from '~/lib/social'
import { SocialLinkComponent } from './SocialLink'

export const Footer: React.FC = () => {
	return (
		<footer className="md:bg-neutral-950 text-center text-neutral-500 dark:text-neutral-400 text-sm">
			<div className="container mx-auto px-6 lg:px-40 p-4">
				<div className="flex flex-col items-center gap-3">
					<div className="flex space-x-2">
						{socialLinks.map((social) => (
							<SocialLinkComponent
								key={social.href}
								social={social}
								className="p-2 text-neutral-400 hover:text-neutral-600 dark:text-neutral-500 dark:hover:text-neutral-300 transition-colors duration-200"
								iconClassName="w-5 h-5"
							/>
						))}
					</div>
					<p>© {new Date().getFullYear()} Tomas Klingen</p>
				</div>
			</div>
		</footer>
	)
}
