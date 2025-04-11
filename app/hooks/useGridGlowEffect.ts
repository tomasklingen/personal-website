import { useEffect, useRef } from 'react'

interface MousePosition {
	x: number
	y: number
}

interface UseGridGlowEffectProps {
	gridOverlayRef: React.RefObject<HTMLDivElement | null>
}

export const useGridGlowEffect = ({
	gridOverlayRef,
}: UseGridGlowEffectProps) => {
	const rafRef = useRef<number | null>(null)
	const mousePos = useRef<MousePosition>({ x: 0, y: 0 })
	const lastUpdatedPos = useRef<MousePosition>({ x: 0, y: 0 })
	const idleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

	useEffect(() => {
		const handleMouseMove = (e: MouseEvent) => {
			mousePos.current = { x: e.clientX, y: e.clientY }

			// Set opacity to 1 when mouse moves
			if (gridOverlayRef.current) {
				gridOverlayRef.current.style.opacity = '1'
			}

			if (idleTimerRef.current) {
				clearTimeout(idleTimerRef.current)
			}
			idleTimerRef.current = setTimeout(() => {
				if (gridOverlayRef.current) {
					gridOverlayRef.current.style.opacity = '0'
				}
			}, 1500)
		}

		const updateGlowEffect = () => {
			// Only update if position changed significantly (performance optimization)
			const dx = Math.abs(mousePos.current.x - lastUpdatedPos.current.x)
			const dy = Math.abs(mousePos.current.y - lastUpdatedPos.current.y)

			if (dx > 2 || dy > 2) {
				lastUpdatedPos.current = { ...mousePos.current }

				if (gridOverlayRef.current) {
					const { width, height } =
						gridOverlayRef.current.getBoundingClientRect()

					// Calculate normalized position (0 to 1)
					const normalizedX = (mousePos.current.x / width).toFixed(3)
					const normalizedY = (mousePos.current.y / height).toFixed(3)

					// Update the CSS custom properties for the grid overlay
					gridOverlayRef.current.style.setProperty(
						'--mouse-x',
						`${normalizedX}`,
					)
					gridOverlayRef.current.style.setProperty(
						'--mouse-y',
						`${normalizedY}`,
					)
				}
			}

			rafRef.current = requestAnimationFrame(updateGlowEffect)
		}

		window.addEventListener('mousemove', handleMouseMove)
		rafRef.current = requestAnimationFrame(updateGlowEffect)

		return () => {
			window.removeEventListener('mousemove', handleMouseMove)
			if (rafRef.current) {
				cancelAnimationFrame(rafRef.current)
			}
			if (idleTimerRef.current) {
				clearTimeout(idleTimerRef.current)
			}
		}
	}, [gridOverlayRef])
}
