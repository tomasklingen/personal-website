import type React from 'react'

type PrecompiledMDXContentProps = {
	htmlContent: string
	className?: string
}

/**
 * Component to render pre-compiled MDX content as HTML with consistent styling
 */
export const PrecompiledMDXContent: React.FC<PrecompiledMDXContentProps> = ({
	htmlContent,
	className,
}) => {
	return (
		<div
			className={`${className || ''} 
				[&_h1]:text-3xl [&_h1]:font-bold [&_h1]:mb-6 [&_h1]:mt-8 [&_h1]:first:mt-0 [&_h1]:text-neutral-900 [&_h1]:dark:text-neutral-100
				[&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:mb-4 [&_h2]:mt-8 [&_h2]:first:mt-0 [&_h2]:text-neutral-900 [&_h2]:dark:text-neutral-100 [&_h2]:border-b [&_h2]:border-neutral-200 [&_h2]:dark:border-neutral-700 [&_h2]:pb-2
				[&_h3]:text-xl [&_h3]:font-semibold [&_h3]:mb-3 [&_h3]:mt-6 [&_h3]:first:mt-0 [&_h3]:text-neutral-900 [&_h3]:dark:text-neutral-100
				[&_p]:mb-4 [&_p]:text-neutral-700 [&_p]:dark:text-neutral-300 [&_p]:leading-relaxed
				[&_code:not(pre_code)]:bg-emerald-100 [&_code:not(pre_code)]:dark:bg-emerald-900/30 [&_code:not(pre_code)]:text-emerald-800 [&_code:not(pre_code)]:dark:text-emerald-200 [&_code:not(pre_code)]:px-1.5 [&_code:not(pre_code)]:py-0.5 [&_code:not(pre_code)]:rounded [&_code:not(pre_code)]:text-sm [&_code:not(pre_code)]:font-mono
				[&_pre]:bg-neutral-100 [&_pre]:dark:bg-neutral-800 [&_pre]:text-neutral-800 [&_pre]:dark:text-neutral-100 [&_pre]:p-4 [&_pre]:rounded-lg [&_pre]:overflow-x-auto [&_pre]:mb-6 [&_pre]:border [&_pre]:border-neutral-200 [&_pre]:dark:border-neutral-600 [&_pre]:shadow-sm
				[&_pre_code]:text-sm
				[&_a]:text-emerald-600 [&_a]:dark:text-emerald-400 [&_a]:hover:underline
				[&_ul]:mb-4 [&_ul]:ml-6 [&_ul]:list-disc [&_ul]:space-y-1 [&_ul]:text-neutral-700 [&_ul]:dark:text-neutral-300
				[&_ol]:mb-4 [&_ol]:ml-6 [&_ol]:list-decimal [&_ol]:space-y-1 [&_ol]:text-neutral-700 [&_ol]:dark:text-neutral-300  
				[&_li]:leading-relaxed
				[&_blockquote]:border-l-4 [&_blockquote]:border-emerald-500 [&_blockquote]:pl-4 [&_blockquote]:my-4 [&_blockquote]:italic [&_blockquote]:text-neutral-600 [&_blockquote]:dark:text-neutral-400
			`}
			// biome-ignore lint/security/noDangerouslySetInnerHtml: pre compiled md
			dangerouslySetInnerHTML={{ __html: htmlContent }}
		/>
	)
}
