export const splitStringByNumber = (inputString) => {
  const regex = /\d+\..*?(?=\s*\d+\.|$)/g
  return inputString.match(regex) || []
}
