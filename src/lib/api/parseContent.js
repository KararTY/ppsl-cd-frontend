import { decode } from '@msgpack/msgpack'

export default function parseContent (UintStr) {
  return decode(UintStr.split(','))
}
