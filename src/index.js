'use strict'

const {statSync} = require('fs')
const { v4: uuid } = require('uuid')

const cache = {}

module.exports = {
  canInstrument: false,

  getCacheKey (fileData, filename) {
    const stat = statSync(filename)
    let cached = cache[filename]

    if (!cached) {
      cached = cache[filename] = {
        lastModified: stat.atimeMs,
        hash: uuid()
      }
    }

    if (stat.atimeMs > cached.lastModified) {
      cache[filename] = {
        ...cached,
        lastModified: stat.atimeMs,
        hash: uuid()
      }
    }

    return cached.hash
  },

  process (src) {
    const escapedSrc = src.replace(/`/g, '\\`')
      .replace(/\$(?=\{.*?\})/g, '\\$')

    return {
      code: `module.exports = \`${escapedSrc}\``
    }
  }
}
