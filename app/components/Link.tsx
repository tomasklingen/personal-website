import { clsx } from 'clsx'
import type React from 'react'
import { Link as RRLink, type LinkProps as RRLinkProps } from 'react-router'

type LinkVariant = 'default' | 'nav' | 'accent' | 'tag' | 'unstyled'

type LinkProps = RRLinkProps & {
	variant?: LinkVariant
	className?: string
	children: React.ReactNode
}

const variantStyles: Record<LinkVariant, string> = {
	default: 'hover:underline',
	nav: 'text-emerald-600 dark:text-emerald-300 hover:underline font-semibold',
	accent: 'text-emerald-500 dark:text-emerald-300 hover:underline font-medium',
	tag: 'inline-block px-2 py-1 rounded text-sm font-medium transition-colors bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-300 hover:bg-emerald-200 dark:hover:bg-emerald-900/50',
	unstyled: '',
}

/**
 * Consistent link component with predefined styling variants
 */
export const Link: React.FC<LinkProps> = ({
	variant = 'default',
	className,
	children,
	...props
}) => {
	return (
		<RRLink {...props} className={clsx(variantStyles[variant], className)}>
			{children}
		</RRLink>
	)
}
