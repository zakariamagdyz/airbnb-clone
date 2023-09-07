export const selectFields = <T>(obj: T, fields: (keyof T)[]) => {
  const newObj = {} as T
  let k: keyof T
  for (k in obj) {
    if (fields.includes(k)) newObj[k] = obj[k]
  }
  return newObj
}

export const omitFields = <T>(obj: T, fields: (keyof T)[]) => {
  const newObj = {} as T
  let k: keyof T
  for (k in obj) {
    if (fields.includes(k)) continue
    newObj[k] = obj[k]
  }
  return newObj
}
