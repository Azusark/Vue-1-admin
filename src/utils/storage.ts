// 存储键名前缀
const STORAGE_PREFIX = 'vue-admin-'

// 获取完整的存储键名
export const getStorageKey = (key: string): string => {
  return `${STORAGE_PREFIX}${key}`
}

// 设置数据到localStorage
export const setStorageData = (key: string, data: any): void => {
  try {
    const storageKey = getStorageKey(key)
    localStorage.setItem(storageKey, JSON.stringify(data))
  } catch (error) {
    console.error('Failed to save data to localStorage:', error)
  }
}

// 从localStorage获取数据
export const getStorageData = (key: string): any => {
  try {
    const storageKey = getStorageKey(key)
    const data = localStorage.getItem(storageKey)
    return data ? JSON.parse(data) : null
  } catch (error) {
    console.error('Failed to get data from localStorage:', error)
    return null
  }
}

// 从localStorage删除数据
export const removeStorageData = (key: string): void => {
  try {
    const storageKey = getStorageKey(key)
    localStorage.removeItem(storageKey)
  } catch (error) {
    console.error('Failed to remove data from localStorage:', error)
  }
}

// 清空所有项目相关的localStorage数据
export const clearAllStorageData = (): void => {
  try {
    const keys = Object.keys(localStorage)
    keys.forEach(key => {
      if (key.startsWith(STORAGE_PREFIX)) {
        localStorage.removeItem(key)
      }
    })
  } catch (error) {
    console.error('Failed to clear localStorage data:', error)
  }
} 