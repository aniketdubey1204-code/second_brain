import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

// Use absolute path for reliability
const docsDirectory = path.resolve(process.cwd(), 'brain-docs');

// Memoized cache for slugs – compute once per server start
let cachedSlugs: string[] | null = null;

export function getDocSlugs() {
  // Return cached value if available – avoids scanning filesystem on every request
  if (cachedSlugs) return cachedSlugs;

  if (!fs.existsSync(docsDirectory)) {
    console.error(`Directory not found: ${docsDirectory}`);
    cachedSlugs = [];
    return cachedSlugs;
  }

  const items = fs.readdirSync(docsDirectory);
  const slugs: string[] = [];
  
  items.forEach(item => {
    const fullPath = path.join(docsDirectory, item);
    const stats = fs.statSync(fullPath);
    
    if (stats.isDirectory()) {
      const files = fs.readdirSync(fullPath).filter(f => f.endsWith('.md'));
      files.forEach(file => {
        // Use forward slashes for URLs
        slugs.push(`${item}/${file.replace(/\.md$/, '')}`);
      });
    } else if (item.endsWith('.md')) {
      slugs.push(item.replace(/\.md$/, ''));
    }
  });
  
  cachedSlugs = slugs; // store for future calls
  return slugs;
}

export function getDocBySlug(slug: string) {
  // Normalize slug to use system path separators
  const normalizedSlug = slug.replace(/\//g, path.sep);
  const fullPath = path.join(docsDirectory, `${normalizedSlug}.md`);
  
  if (!fs.existsSync(fullPath)) {
    throw new Error(`File not found: ${fullPath}`);
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  return { slug, frontmatter: data, content };
}

export function getAllDocs() {
  const slugs = getDocSlugs();
  return slugs.map(slug => getDocBySlug(slug));
}
