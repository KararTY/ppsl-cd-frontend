import { API_ENDPOINT } from '../posts'

export async function getYPostUpdatesHTMLByPostId (postId) {
  const url = new URL(`/api/lexical/html/${postId}`, API_ENDPOINT)
  const res = await fetch(url)
  return await res.text()
}
