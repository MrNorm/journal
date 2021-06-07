import path from 'path'
import * as fsWithCallbacks from 'fs'
import matter from 'gray-matter'
import glob from 'glob-promise'

const fs = fsWithCallbacks.promises

export function listContent (contentType:string="*") {
  const contentPath = path.join(process.cwd(), `content/${contentType}/*.mdx`)
  
  const contentData = glob(contentPath)
  .then(filepaths => {
    return filepaths.map(filePath => readFile(filePath))
  })
  .then(files => Promise.all(files))
  .then(fileContents => {
    return fileContents.map(fileSource => parseSource(fileSource))
  })

  return contentData;
}

function readFile(filePath: string) {
  return fs.readFile(filePath, { encoding: 'utf8' })
    .then(filecontents => {
        return { source: filecontents.trim(), filename: filePath }
    })
}

function parseSource (fileSource, includeBody:boolean=false) {

  const { source, filename } = fileSource
  const { data, content } = matter(source.trim())
  const { slug, type } = filename.match(/\/content(?<slug>\/(?<type>.*)\/.*)\./i).groups;
  
  let output = { data, filename, type, slug, content: null }
  
  // Not sure how I feel about this.
  // I'm using it to reduce memory when compiling a list of pages
  if(includeBody) {
    output.content = content
  }

  return output;
}

export async function getContent (slug: string) {
  // Ensure the slug matches our data structure to ensure no snooping
  // Path is /content/<category>/<slug>
  const fileRegexp = new RegExp(/^\/[a-zA-Z0-9\-]+\/[a-zA-Z0-9\-]+$/)
  if (!fileRegexp.test(slug)) {
    return;
  }

  return readFile(path.join(process.cwd(), `content/${slug}.mdx`))
    .then(fileSource => parseSource(fileSource, true))
}