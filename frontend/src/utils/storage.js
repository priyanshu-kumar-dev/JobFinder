
export const setStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value))
}

export const getStorage = (key) => {
  try {
    const data = localStorage.getItem(key)

    return data ? JSON.parse(data) : null
  } catch (error) {
    console.error('Error reading local storage:', error)
    return null
  }
}

export const removeStorage = (key) => {
  localStorage.removeItem(key)
}

export const clearStorage = () => {
  localStorage.clear()
}
