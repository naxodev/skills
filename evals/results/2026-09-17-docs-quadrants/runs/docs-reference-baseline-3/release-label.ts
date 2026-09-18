/** Format a release label for display. Blank versions are rejected. */
export function releaseLabel(version: string, options: { prefix?: string } = {}): string {
  if (!version.trim()) throw new Error('version must not be blank');
  return `${options.prefix ?? 'v'}${version.trim()}`;
}
