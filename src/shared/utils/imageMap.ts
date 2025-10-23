type ImageModule = { default: string }

const importedImages = import.meta.glob<ImageModule>(
  '../../assets/images/**/*.{png,jpg,jpeg,webp,avif}',
  { eager: true },
)
const imageMap: Record<string, string> = {}

Object.entries(importedImages).forEach(([fullPath, mod]) => {
  const filename = fullPath.split('/').pop()
  if (filename) imageMap[filename] = mod.default
})

export function resolveImage(filename: string): string {
  return imageMap[filename] ?? filename
}
