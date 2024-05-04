/**
 * Check if the given RGB tuple represents a light color.
 */
const isLightColor = (rgbTuple: number[], threshold: number = 200): boolean => {
  const luminance = 0.2126 * rgbTuple[0] + 0.7152 * rgbTuple[1] + 0.0722 * rgbTuple[2]
  return luminance > threshold
}

export const getMostDominantColorHex = async (imageFile: Blob): Promise<string | null> => {
  const image = await createImageBitmap(imageFile)

  const canvas = document.createElement('canvas')
  canvas.width = image.width
  canvas.height = image.height
  const ctx = canvas.getContext('2d')
  if (!ctx) return null

  ctx?.drawImage(image, 0, 0)

  const imageData = ctx.getImageData(0, 0, image.width, image.height).data

  const rgbTuples: number[][] = []
  for (let i = 0; i < imageData.length; i += 4) {
    rgbTuples.push([imageData[i], imageData[i + 1], imageData[i + 2]])
  }

  const noLightColors = rgbTuples.filter((rgb) => !isLightColor(rgb))
  const colorToBeSorted = noLightColors.length ? noLightColors : rgbTuples

  const colorCounts: Record<string, number> = colorToBeSorted
    .reduce((acc: Record<string, number>, color) => {
      const key = color.join(',')
      acc[key] = (acc[key] || 0) + 1
      return acc
    }, {})

  const sortedColors = Object.entries(colorCounts).sort((a, b) => b[1] - a[1])
  const dominantColor = sortedColors[0][0].split(',').map(Number)
  const hexColor = `#${dominantColor.map((c) => c.toString(16).padStart(2, '0')).join('')}`

  return hexColor
}

export const getMostDominantColorHexFromImgElement = (
  imgElement: HTMLImageElement,
): string | null => {
  // Create a canvas element
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  if (!ctx) return null

  // Set canvas dimensions to match image dimensions
  canvas.width = imgElement.width
  canvas.height = imgElement.height

  // Draw the image onto the canvas
  ctx.drawImage(imgElement, 0, 0, imgElement.width, imgElement.height)

  // Get the image data from the canvas
  const imageData = ctx.getImageData(0, 0, imgElement.width, imgElement.height).data

  // Extract RGB tuples from pixel data
  const rgbTuples = []
  for (let i = 0; i < imageData.length; i += 4) {
    rgbTuples.push([imageData[i], imageData[i + 1], imageData[i + 2]])
  }

  // Filter out light colors
  const noLightColors = rgbTuples.filter((rgb) => !isLightColor(rgb))
  const colorToBeSorted = noLightColors.length ? noLightColors : rgbTuples

  // Count the occurrence of each color
  const colorCounts = colorToBeSorted.reduce((acc: Record<string, number>, color) => {
    const key = color.join(',')
    acc[key] = (acc[key] || 0) + 1
    return acc
  }, {})

  // Sort the colors by count in descending order
  const sortedColors = Object.entries(colorCounts).sort((a, b) => b[1] - a[1])

  // Get the most dominant color
  const dominantColor = sortedColors[0][0].split(',').map(Number)

  // Convert RGB to hex
  const hexColor = `#${dominantColor.map((c) => c.toString(16).padStart(2, '0')).join('')}`

  return hexColor
}
