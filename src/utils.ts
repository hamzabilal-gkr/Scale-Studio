/**
 * Resolves an asset path so it works across all hosting environments.
 * Automatically handles:
 * - Stripping accidental 'public/' or '/public/' prefixes
 * - Normalizing Windows backslashes '\' to forward slashes '/'
 * - Supporting subfolder deployments via Vite BASE_URL
 * - Preserving external URLs (YouTube, HTTP, HTTPS, blob, data)
 */
export function getAssetUrl(path: string | undefined | null): string {
  if (!path) return '';
  
  // External URLs or data URIs remain untouched
  if (/^(https?:|\/\/|blob:|data:)/i.test(path)) {
    return path;
  }

  // Normalize Windows backslashes to forward slashes
  let clean = path.replace(/\\/g, '/');

  // Strip accidental 'public/' or '/public/' or './public/' prefix
  clean = clean.replace(/^(\.?\/)?public\//i, '/');

  // Ensure it starts with a single leading slash
  if (!clean.startsWith('/')) {
    clean = '/' + clean;
  }

  // Clean double slashes
  clean = clean.replace(/\/+/g, '/');

  // Avoid duplicate /Scale-Studio/ prefix if already present
  clean = clean.replace(/^\/Scale-Studio\/Scale-Studio\//, '/Scale-Studio/');

  // Handle Vite base path if deployed in a subfolder or fallback to /Scale-Studio/
  const meta = import.meta as { env?: { BASE_URL?: string } };
  const base = (meta.env?.BASE_URL || '/Scale-Studio/').replace(/\/$/, '');
  const fullPath = base && !clean.startsWith(base) ? `${base}${clean}` : clean;

  // Encode spaces and special characters safely for URLs without double-encoding
  return encodeURI(decodeURI(fullPath));
}
