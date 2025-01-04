// Documentation available at the Swagger endpoint.

import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'

import { encodeYDocToUpdateV2ToBase64 } from '#/lib/post'
import { SYSTEM_IDS } from '#/components/ppsl-cd-lexical-shared/src/editors/constants'

const { ENTITY, BIO, REVIEW } = SYSTEM_IDS

/**
 * @typedef {keyof typeof import('#/components/ppsl-cd-lexical-shared/src/editors/constants').SYSTEM_IDS} SYSTEM_IDS
 */

// 50 is current database max take for pagination.
const MAX_PAGINATION_TAKE = 50

const jsonHeaders = new Headers({ 'content-type': 'application/json' })

const origin = globalThis?.location?.origin
export const API_ENDPOINT = origin ? `${origin}/api/` : process.env.API_ENDPOINT

/**
 * @param {string} id
 */
export const getPostById = async (id) => {
  const url = new URL(`./posts/id/${id}`, API_ENDPOINT)
  const res = await fetch(url)
  return res.json()
}

/**
 * @param {string} title
 */
export const getPostsByTitle = async (title, filter = []) => {
  const url = new URL('./posts/filter', API_ENDPOINT)

  const query = {
    AND: [
      {
        postHistory: {
          some: {
            title: {
              startsWith: title,
              mode: 'insensitive'
            }
          }
        }
      },
      ...filter
    ]
  }

  const res = await fetch(url, {
    method: 'POST',
    headers: jsonHeaders,
    body: JSON.stringify(query)
  })

  return res.json()
}

/**
 * @param {string} id
 */
export const getUserReviewByPostId = async (id, cookie) => {
  const url = new URL(`./posts/id/${id}/review`, API_ENDPOINT)

  const res = await fetch(url, { headers: { cookie } })
  return res.json()
}

export function usePaginatedEndpoint (
  page = 0,
  url,
  filter,
  id = 'paginated-endpoint'
) {
  const [cursor, setCursor] = useState()

  const { error, isInitialLoading, isLoading, isFetching, data } = useQuery({
    queryKey: [id, page],
    queryFn: async ({ queryKey: [_, page] }) => {
      if (page) {
        url.searchParams.set('cursor', cursor)
      }

      const body = filter

      const res = await fetch(url, {
        method: body ? 'POST' : 'GET',
        headers: body ? jsonHeaders : undefined,
        body: body ? JSON.stringify(body) : undefined
      })

      const json = await res.json()

      if (json.cursor) {
        setCursor(json.cursor)
      }

      return json
    },
    keepPreviousData: true,
    staleTime: Infinity,
    cacheTime: Infinity
  })

  const maxPage = data ? Math.ceil(data.count / MAX_PAGINATION_TAKE) : null

  const canContinue = maxPage ? page !== maxPage - 1 : false

  return {
    error,
    page,
    canContinue,
    response: data,
    isLoading,
    isFetching,
    isInitialLoading
  }
}

/**
 * @param {string} postId
 */
export const getAuthorsForPostId = async (postId) => {
  const url = new URL(`./posts/id/${postId}/authors`, API_ENDPOINT)
  const res = await fetch(url)
  return res.json()
}

/**
 * @param {{ title: string, language: string }}
 * @param {import('yjs').Doc} yDoc
 */
export const createPost = ({ title, language }, yDoc) => {
  const encodedContent = encodeYDocToUpdateV2ToBase64(yDoc)

  const body = {
    title,
    language,
    content: encodedContent
  }

  const url = new URL('./posts/', API_ENDPOINT)

  return fetch(url, {
    method: 'POST',
    headers: jsonHeaders,
    body: JSON.stringify(body)
  })
}

/**
 * @param {{ title: string, language: string, id: string }}
 * @param {import('yjs').Doc} yDoc
 */
export const updatePost = ({ title, language, id }, yDoc) => {
  const encodedContent = encodeYDocToUpdateV2ToBase64(yDoc)

  const body = {
    title,
    language,
    content: encodedContent
  }

  const url = new URL(`./posts/id/${id}`, API_ENDPOINT)

  return fetch(url, {
    method: 'POST',
    headers: jsonHeaders,
    body: JSON.stringify(body)
  })
}

/**
 * @param {{ title: string, language: string, type: string, id: string }}
 * @param {import('yjs').Doc} yDoc
 */
export const upsertReviewForPostId = ({ title, language, type, id }, yDoc) => {
  const encodedContent = encodeYDocToUpdateV2ToBase64(yDoc)

  const body = {
    title,
    language,
    type,
    content: encodedContent
  }
  const url = new URL(`./posts/id/${id}/reviews`, API_ENDPOINT)

  return fetch(url, {
    method: 'POST',
    headers: jsonHeaders,
    body: JSON.stringify(body)
  })
}

/**
 * @param {SYSTEM_IDS} type
 */
export const getInitialUpdate = async (type) => {
  if (![ENTITY, BIO, REVIEW].includes(type)) {
    throw new Error('Unsupported type.')
  }

  const url = new URL(`./posts/initial/${type}`, API_ENDPOINT)
  const res = await fetch(url)

  return res.text()
}
