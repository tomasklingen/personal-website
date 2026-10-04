import {
	type AppBskyFeedDefs,
	AppBskyFeedPost,
	AppBskyRichtextFacet,
} from '@atcute/bluesky'
import { segmentize } from '@atcute/bluesky-richtext-segmenter'
import { Client, ok, simpleFetchHandler } from '@atcute/client'
import { is } from '@atcute/lexicons'

export const BLUESKY_HANDLE = 'tomasklingen.nl'
export const BLUESKY_PROFILE_URL = `https://bsky.app/profile/${BLUESKY_HANDLE}`

const POST_LIMIT = 3
// Fetch more than needed, because quote posts and empty posts are skipped.
const FETCH_LIMIT = 10
const FETCH_TIMEOUT_MS = 10_000

const REPOST_REASON_TYPE = 'app.bsky.feed.defs#reasonRepost'
const RECORD_EMBED_PREFIX = 'app.bsky.embed.record'

const rpc = new Client({
	handler: simpleFetchHandler({ service: 'https://public.api.bsky.app' }),
})

export interface BlueskyAuthor {
	handle: string
	displayName: string
	avatar: string | null
}

export interface BlueskyTextSegment {
	text: string
	href: string | null
}

export interface BlueskyPost {
	url: string
	author: BlueskyAuthor
	segments: BlueskyTextSegment[]
	date: Date
	isRepost: boolean
}

function findLinkHref(features: readonly unknown[]): string | null {
	for (const feature of features) {
		if (!is(AppBskyRichtextFacet.linkSchema, feature)) continue
		if (!URL.canParse(feature.uri)) continue
		const { protocol } = new URL(feature.uri)
		if (protocol === 'https:' || protocol === 'http:') return feature.uri
	}
	return null
}

/** Returns null for items that cannot be shown without their embedded content. */
function toPost(item: AppBskyFeedDefs.FeedViewPost): BlueskyPost | null {
	const { post, reason } = item
	const rkey = post.uri.split('/').at(-1)
	if (!rkey || !is(AppBskyFeedPost.mainSchema, post.record)) return null

	const { text, facets } = post.record
	if (text.trim() === '') return null
	if (post.embed?.$type.startsWith(RECORD_EMBED_PREFIX)) return null

	const isRepost = reason?.$type === REPOST_REASON_TYPE
	const { handle, displayName, avatar } = post.author

	return {
		url: `https://bsky.app/profile/${handle}/post/${rkey}`,
		author: {
			handle,
			displayName: displayName?.trim() ? displayName : handle,
			avatar: avatar ?? null,
		},
		segments: segmentize(text, facets).map((segment) => ({
			text: segment.text,
			href: segment.features ? findLinkHref(segment.features) : null,
		})),
		date: new Date(isRepost && reason ? reason.indexedAt : post.indexedAt),
		isRepost,
	}
}

/** Fetches the latest posts from the public Bluesky API. Throws when the request fails. */
export async function fetchLatestBlueskyPosts(
	signal?: AbortSignal,
): Promise<BlueskyPost[]> {
	const timeout = AbortSignal.timeout(FETCH_TIMEOUT_MS)
	const { feed } = await ok(
		rpc.get('app.bsky.feed.getAuthorFeed', {
			params: {
				actor: BLUESKY_HANDLE,
				filter: 'posts_no_replies',
				limit: FETCH_LIMIT,
			},
			signal: signal ? AbortSignal.any([signal, timeout]) : timeout,
		}),
	)

	return feed
		.map(toPost)
		.filter((post) => post !== null)
		.slice(0, POST_LIMIT)
}
