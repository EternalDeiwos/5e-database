'use strict'

/**
 * Dependencies
 * @ignore
 */
const cwd = process.cwd()
const fs = require('fs')
const path = require('path')
const glob = require('glob')

/**
 * Constants
 * @ignore
 */
const globPath = 'database'
const globString = '5e-SRD-*.json'
const globExclude = [
  'Test',
  'Traits',
]

/**
 * Files
 * @ignore
 */
const files = glob.sync(path.join(cwd, globPath, globString))
  .filter(item => !globExclude.some(test => item.includes(test)))

/**
 * Produce Result
 */
const data = files.map(filePath => JSON.parse(fs.readFileSync(filePath)))
const compiled = data.reduce((state, current) => state.concat(current), [])
fs.writeFileSync(path.join(cwd, 'build.json'), JSON.stringify(compiled, null, 2))
