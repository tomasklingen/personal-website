import {
	QueryClient,
	QueryClientProvider,
	useQuery,
} from '@tanstack/react-query'
import { clsx } from 'clsx'
import { type FC, useState, useSyncExternalStore } from 'react'
import {
	BLUESKY_PROFILE_URL,
	type BlueskyPost,
	fetchLatestBlueskyPosts,
} from '~/lib/bluesky'
import { formatDateTime, SITE_TIME_ZONE } from '~/lib/date'

const SKELETON_COUNT = 5
// Mobile shows this many posts until the visitor expands the list.
const MOBILE_POST_COUNT = 3
const STALE_TIME_MS = 5 * 60 * 1000

const queryClient = new QueryClient()

const LIST_ID = 'bluesky-posts'

const subscribeNever = () => () => {}

/** False while the server render hydrates, true for every render after that. */
const useIsHydrated = () =>
	useSyncExternalStore(
		subscribeNever,
		() => true,
		() => false,
	)

/**
 * The prerendered HTML cannot know the visitor's time zone. It shows the site
 * time zone, dimmed, and fades to the visitor's local time after hydration.
 */
const PostTime: FC<{ date: Date }> = ({ date }) => {
	const isHydrated = useIsHydrated()

	return (
		<time
			dateTime={date.toISOString()}
			className={`transition-opacity duration-500 motion-reduce:transition-none ${isHydrated ? 'opacity-100' : 'opacity-60'}`}
		>
			{formatDateTime(date, isHydrated ? undefined : SITE_TIME_ZONE)}
		</time>
	)
}

// From md upwards the list scrolls inside a fixed height of about three posts.
// The mask fades the bottom edge to hint at more posts, and the padding keeps
// the last post clear of it. On mobile the page scrolls instead, because a
// nested scroll area traps touch swipes.
const listClass =
	'flex flex-col gap-4 md:max-h-[41rem] md:overflow-y-auto md:pr-1 md:pb-8 md:[scrollbar-width:thin] md:[scrollbar-color:var(--color-neutral-400)_transparent] md:dark:[scrollbar-color:var(--color-neutral-600)_transparent] md:[mask-image:linear-gradient(to_bottom,black_calc(100%-2rem),transparent)]'
const hiddenOnMobileClass = 'hidden md:block'
const cardClass =
	'bg-neutral-100/90 dark:bg-neutral-800/80 p-4 rounded-md dark:border-l-4 border-sky-500/60'
const mutedLinkClass =
	'text-gray-500 dark:text-gray-400 hover:text-sky-600 dark:hover:text-sky-400 transition-colors'

const PostCard: FC<{ post: BlueskyPost; className?: string | undefined }> = ({
	post,
	className,
}) => (
	<li
		className={clsx(
			cardClass,
			'hover:border-sky-500 transition-colors duration-200',
			className,
		)}
	>
		{post.isRepost && (
			<p className="flex items-center gap-1 mb-3 text-xs text-gray-500 dark:text-gray-400">
				<span aria-hidden="true">🔄</span>
				<span>Repost</span>
			</p>
		)}
		<div className="flex items-center mb-3">
			{post.author.avatar && (
				<img
					src={post.author.avatar}
					alt=""
					width={40}
					height={40}
					loading="lazy"
					className="w-10 h-10 rounded-full mr-3 border-2 border-gray-200 dark:border-gray-700"
				/>
			)}
			<div className="flex-1">
				<div className="flex items-center gap-2 mb-1">
					<span className="font-medium dark:text-gray-200 text-sm">
						{post.author.displayName}
					</span>
					<a
						href={`https://bsky.app/profile/${post.author.handle}`}
						className={`text-xs ${mutedLinkClass}`}
					>
						@{post.author.handle}
					</a>
				</div>
				<div className="text-xs">
					<a href={post.url} className={mutedLinkClass}>
						<PostTime date={post.date} />
					</a>
				</div>
			</div>
		</div>
		<p className="dark:text-gray-300 text-sm leading-relaxed line-clamp-6 whitespace-pre-line">
			{post.segments.map((segment, index) =>
				segment.href ? (
					<a
						// biome-ignore lint/suspicious/noArrayIndexKey: segments have no id and never reorder
						key={index}
						href={segment.href}
						rel="noopener noreferrer"
						className="text-sky-700 dark:text-sky-400 underline break-all"
					>
						{segment.text}
					</a>
				) : (
					// biome-ignore lint/suspicious/noArrayIndexKey: segments have no id and never reorder
					<span key={index}>{segment.text}</span>
				),
			)}
		</p>
	</li>
)

const PostSkeleton: FC<{ className?: string | undefined }> = ({
	className,
}) => (
	<li className={clsx(cardClass, 'animate-pulse', className)}>
		<div className="flex items-center mb-3">
			<div className="w-10 h-10 rounded-full mr-3 bg-neutral-300 dark:bg-neutral-700" />
			<div className="flex-1 space-y-2">
				<div className="h-3 w-32 rounded bg-neutral-300 dark:bg-neutral-700" />
				<div className="h-3 w-24 rounded bg-neutral-300 dark:bg-neutral-700" />
			</div>
		</div>
		<div className="space-y-2">
			<div className="h-3 w-full rounded bg-neutral-300 dark:bg-neutral-700" />
			<div className="h-3 w-2/3 rounded bg-neutral-300 dark:bg-neutral-700" />
		</div>
	</li>
)

const FeedMessage: FC = () => (
	<p className="text-sm dark:text-gray-300">
		Could not load the latest posts.{' '}
		<a href={BLUESKY_PROFILE_URL} className="underline">
			View them on Bluesky
		</a>
		.
	</p>
)

interface BlueskyFeedProps {
	/** Posts fetched at build time. They render immediately and get refreshed in the browser. */
	initialPosts?: BlueskyPost[] | undefined
}

const Feed: FC<BlueskyFeedProps> = ({ initialPosts }) => {
	const [isExpanded, setIsExpanded] = useState(false)
	const { data, isPending } = useQuery({
		queryKey: ['bluesky-posts'],
		queryFn: ({ signal }) => fetchLatestBlueskyPosts(signal),
		staleTime: STALE_TIME_MS,
		initialData: initialPosts,
		// Treat the build-time posts as stale, so the browser refetches on mount.
		initialDataUpdatedAt: 0,
	})

	// Keep showing earlier posts when a refresh fails.
	if (data?.length) {
		const hiddenCount = data.length - MOBILE_POST_COUNT

		return (
			<>
				<ul id={LIST_ID} className={listClass}>
					{data.map((post, index) => (
						<PostCard
							key={post.url}
							post={post}
							className={
								index >= MOBILE_POST_COUNT && !isExpanded
									? hiddenOnMobileClass
									: undefined
							}
						/>
					))}
				</ul>
				{hiddenCount > 0 && (
					<button
						type="button"
						aria-expanded={isExpanded}
						aria-controls={LIST_ID}
						onClick={() => setIsExpanded((expanded) => !expanded)}
						className="md:hidden mt-4 w-full rounded-md py-2 text-sm font-medium border border-neutral-300 dark:border-neutral-700 bg-neutral-100/90 dark:bg-neutral-800/80 dark:text-gray-200 hover:bg-white dark:hover:bg-neutral-700/80 transition-colors"
					>
						{isExpanded ? 'Show fewer posts' : `Show ${hiddenCount} more posts`}
					</button>
				)}
			</>
		)
	}

	if (isPending) {
		return (
			<ul className={listClass} aria-busy="true">
				<li className="sr-only">Loading posts</li>
				{Array.from({ length: SKELETON_COUNT }, (_, index) => (
					<PostSkeleton
						// biome-ignore lint/suspicious/noArrayIndexKey: static placeholders
						key={index}
						className={
							index >= MOBILE_POST_COUNT ? hiddenOnMobileClass : undefined
						}
					/>
				))}
			</ul>
		)
	}

	return <FeedMessage />
}

export const BlueskyFeed: FC<BlueskyFeedProps> = (props) => (
	<QueryClientProvider client={queryClient}>
		<Feed {...props} />
	</QueryClientProvider>
)
