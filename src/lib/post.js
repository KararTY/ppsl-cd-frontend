import * as Y from 'yjs'
import { uint8ArrayToBase64 } from 'uint8array-extras'

export function getEditURLForPost (urlPathname /* relations */) {
  return `${urlPathname}/edit`
}

/**
 * @param {YDoc} yDoc
 */
export function encodeYDocToUpdateV2 (yDoc) {
  const yjsUpdateState = Y.encodeStateAsUpdateV2(yDoc)

  return yjsUpdateState
}

/**
 * @param {YDoc} yDoc
 */
export function encodeYDocToUpdateV2ToBase64 (yDoc) {
  const yjsUpdateState = encodeYDocToUpdateV2(yDoc)
  const encodedContent = uint8ArrayToBase64(yjsUpdateState)

  return encodedContent
}
