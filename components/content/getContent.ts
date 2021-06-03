import path from 'path'
import * as fsWithCallbacks from 'fs'
const fs = fsWithCallbacks.promises
import matter from 'gray-matter'
import glob from 'glob-promise'


const contentPath = path.join(process.cwd(), 'content/*/*.mdx')

export default async function getContent () {
  const contentData = await glob(contentPath)
  .then(filepaths => {
    return filepaths.map(filepath => fs.readFile(filepath, {
        encoding: 'utf8'
      }).then(filecontents => {
        return { source: filecontents.trim(), filename: filepath }
    }))
  })
  .then(files => Promise.all(files))
  .then(fileContents => {
    return fileContents.map(fileSource => {
      const { source, filename } = fileSource
      const { data } = matter(source)
      const type = filename.match(/content\/(.*)\//i).pop();

      return { data, filename, type }
    })
  })

  return contentData;
}