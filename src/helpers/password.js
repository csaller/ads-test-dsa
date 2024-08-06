import bcrypt from 'bcryptjs'

export const encryptPassword = (password, length = 10) =>
  bcrypt.hash(password, length)

export const isPasswordWeak = (password) => {
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}$/;
  if (!password.match(passwordRegex)) { return true }
  return false
}
