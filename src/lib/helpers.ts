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
