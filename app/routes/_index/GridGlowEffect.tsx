import type React from 'react'
import { useRef } from 'react'
import { useGridGlowEffect } from '~/hooks/useGridGlowEffect'

export const GridGlowEffect: React.FC = () => {
	const gridOverlayRef = useRef<HTMLDivElement>(null)

	useGridGlowEffect({ gridOverlayRef })

	return (
		<>
			{/* Fiery glow background */}
			<div
				className="absolute inset-0 z-0 overflow-hidden"
				style={{
					background:
						'radial-gradient(circle at center, rgba(30, 0, 0, 0.2), transparent 70%)',
				}}
			/>

			{/* Grid with glow effect */}
			<div
				ref={gridOverlayRef}
				className="absolute inset-0 z-5"
				style={
					{
						'--mouse-x': '0.2',
						'--mouse-y': '0.2',
						maskImage:
							"url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cpattern id='grid' width='40' height='40' patternUnits='userSpaceOnUse'%3E%3Cpath d='M 40 0 L 0 0 0 40' fill='none' stroke='white' stroke-width='1'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='url(%23grid)'/%3E%3C/svg%3E\")",
						maskSize: '100% 100%',
						WebkitMaskSize: '100% 100%',
						maskRepeat: 'no-repeat',
						WebkitMaskRepeat: 'no-repeat',
						background:
							'radial-gradient(circle at calc(var(--mouse-x) * 100%) calc(var(--mouse-y) * 100%), rgba(255, 120, 50, 0.8), rgba(255, 50, 0, 0.4) 20%, rgba(100, 0, 0, 0.1) 40%, transparent 60%)',
						mixBlendMode: 'screen',
						filter: 'blur(8px)',
						transform: 'translateZ(0)',
					} as React.CSSProperties
				}
			/>

			{/* Background grid pattern */}
			<div className="absolute inset-0 z-10 opacity-70">
				<svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
					<defs>
						<pattern
							id="grid"
							width="40"
							height="40"
							patternUnits="userSpaceOnUse"
						>
							<path
								d="M 40 0 L 0 0 0 40"
								fill="none"
								stroke="rgba(255, 255, 255, 0.45)"
								strokeWidth="0.5"
							/>
						</pattern>
					</defs>
					<rect width="100%" height="100%" fill="url(#grid)" />
				</svg>
			</div>
		</>
	)
}
