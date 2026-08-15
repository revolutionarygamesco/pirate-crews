const randomAlphanumeric = () => {
  const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  const lower = upper.toLowerCase()
  const digits = '0123456789'
  const chars = upper + lower + digits
  return chars.charAt(Math.floor(Math.random() * chars.length))
}

const generateID = () => {
  let id = ''
  for (let i = 0; i < 16; i++) id += randomAlphanumeric()
  return id
}

export default generateID
export { randomAlphanumeric }
