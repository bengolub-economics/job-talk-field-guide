/** Keep internal links and assets portable between root and project-path hosts. */
export function sitePath(path: string): string {
  const base = process.env.NEXT_PUBLIC_BASE_PATH || '';
  return path.startsWith('/') && !path.startsWith('//') ? `${base}${path}` : path;
}
