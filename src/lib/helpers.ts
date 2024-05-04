export const trimString = (str: string) => str.replace(/\s+/g, ' ').trim()

export const isValidChannelName = (input: string): boolean => {
  // Check if the string has whitespace
  const hasWhitespace = /\s/.test(input)
  if (hasWhitespace) {
    return false
  }

  // Check if the string has uppercase characters
  if (input !== input.toLowerCase()) {
    return false
  }

  return true
}

export const modifyString = (input: string): string => {
  let modifiedString = input

  // Lowercase the string
  modifiedString = modifiedString.toLowerCase()

  // Replace whitespace with hyphen
  modifiedString = modifiedString.replace(/\s+/g, '-')

  return modifiedString
}

const getDateInformation = (date0: Date | string) => {
  const date = typeof date0 === 'string'
    ? new Date(date0)
    : date0

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ]

  const dayNames = [
    'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday',
  ]

  const month = monthNames[date.getMonth()]
  const day = dayNames[date.getDay()]
  const dayOfMonth = date.getDate()
  const year = date.getFullYear()
  const monthWith0Prefix = String(date.getMonth() + 1).padStart(2, '0')
  const dayWith0Prefix = String(date.getDate()).padStart(2, '0')

  const hour = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  const ampm = date.getHours() >= 12 ? 'PM' : 'AM'
  const adjustedHour = date.getHours() % 12 || 12

  return {
    month,
    day,
    dayOfMonth,
    monthWith0Prefix,
    dayWith0Prefix,
    year,
    hour,
    minutes,
    ampm,
    adjustedHour,
  }
}

/**
 * Takes a Date
 * If the date is today, returns "Today at 11:09 AM" like
 * If the date is yesterday, returns "Yesterday at 11:09 AM" like
 * Otherwise returns "04/01/2024 10:30 AM" like
 */
export const formatDate = (date0: Date | string): string => {
  const date = typeof date0 === 'string'
    ? new Date(date0)
    : date0

  const {
    monthWith0Prefix,
    dayWith0Prefix,
    year,
    minutes,
    ampm,
    adjustedHour,
  } = getDateInformation(date)

  const currentDate = new Date()
  const currentDay = currentDate.getDate()
  const currentMonth = currentDate.getMonth()
  const currentYear = currentDate.getFullYear()

  if (
    currentYear === year
    && currentMonth === date.getMonth()
  ) {
    if (currentDay === date.getDate()) {
      return `Today at ${adjustedHour}:${minutes} ${ampm}`
    }
    if (currentDay - 1 === date.getDate()) {
      return `Yesterday at ${adjustedHour}:${minutes} ${ampm}`
    }
  }

  return `${monthWith0Prefix}/${dayWith0Prefix}/${year} ${adjustedHour}:${minutes} ${ampm}`
}

/**
 * Takes a Date, returns formatted string "Monday, April 1, 2024 03:49 PM"S
 */
export const formatDateWithTime = (date0: Date | string): string => {
  const {
    month,
    day,
    dayOfMonth,
    year,
    minutes,
    ampm,
    adjustedHour,
  } = getDateInformation(date0)

  return `${day}, ${month} ${dayOfMonth}, ${year} ${adjustedHour}:${minutes} ${ampm}`
}

/**
 * Takes a date and return like "X years ago" from now
 */
export const yearDifferenceYearFromNow = (date0: Date | string): string => {
  const date = typeof date0 === 'string'
    ? new Date(date0)
    : date0

  // Calculate the difference in milliseconds
  const diff = Date.now() - date.getTime()

  // Convert milliseconds to years
  const years = Math.floor(diff / (1000 * 60 * 60 * 24 * 365))

  // Return formatted string
  return years > 0 ? `${years} year${years > 1 ? 's' : ''} ago` : 'this year'
}

/**
 * Format date to like `October 13, 2018`
 */
export const formatDateMinimal = (date0: Date | string): string => {
  const {
    month,
    dayOfMonth,
    year,
  } = getDateInformation(date0)

  return `${month} ${dayOfMonth}, ${year}`
}

export const getFileURLFromGCS = (fileName: string) => `https://storage.googleapis.com/server-profile/${fileName}`

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
