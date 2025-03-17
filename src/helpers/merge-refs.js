export function mergeRefs(refs) {
  return (value) => {
    refs.forEach((ref) => {
      if (typeof ref === 'function') {
        ref(value)
      } else if (ref != null) {
        ref.current = value
      }
    })
  }
}

export const normalizeObjectWithEntityFields = (obj) => {
  if (obj === null || typeof obj !== 'object') return obj
  if (Array.isArray(obj)) return obj.map(normalizeObjectWithEntityFields)
  const normalized = {}
  Object.entries(obj).forEach(([key, value]) => {
    if (key === '@id' || key === '@type') return
    normalized[key] = normalizeObjectWithEntityFields(value)
  })
  return normalized
}
