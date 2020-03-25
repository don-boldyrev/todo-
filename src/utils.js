export const getDeepCopyObj = obj => {
  const res = {}
  Object.keys(obj).forEach(key => {
    if (typeof obj[key] !== 'object') {
      res[key] = obj[key]
    } else {
      if (Array.isArray(obj[key])) {
        res[key] = obj[key].map(item => {
          if (typeof item === 'object') {
            return getDeepCopyObj(item)
          }
          return item
        })
      } else {
        res[key] = getDeepCopyObj(obj[key])
      }
    }
  })
  return res
}