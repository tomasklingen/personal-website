import type React from 'react'
import type { SocialLink } from '~/lib/social'

type SocialLinkProps = {
	social: SocialLink
	className?: string
	iconClassName?: string
}

export const SocialLinkComponent: React.FC<SocialLinkProps> = ({
	social,
	className = '',
	iconClassName = '',
}) => {
	return (
		<a
			href={social.href}
			target="_blank"
			rel="noreferrer"
			title={social.title}
			aria-label={social['aria-label']}
			className={className}
		>
			<social.IconComponent className={iconClassName} />
		</a>
	)
}
