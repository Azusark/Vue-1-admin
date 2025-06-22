import { defineStore } from 'pinia'
import type { DataItem, PaginationParams, SearchParams } from './types/type'
import { setStorageData, getStorageData } from '@/utils/storage'

// 生成唯一ID
const generateId = (): number => {
  return Date.now() + Math.random()
}

// 格式化时间
const formatTime = (): string => {
  const now = new Date()
  return now.toLocaleString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  })
}

// 数据类型映射
type DataTypeMap = {
  user: DataItem[]
  role: DataItem[]
  permission: DataItem[]
  brand: DataItem[]
  attr: DataItem[]
  spu: DataItem[]
  sku: DataItem[]
}

export const useDataStore = defineStore('data', {
  state: (): DataTypeMap => ({
    // 用户管理数据
    user: [] as DataItem[],
    // 角色管理数据
    role: [] as DataItem[],
    // 权限管理数据
    permission: [] as DataItem[],
    // 品牌管理数据
    brand: [] as DataItem[],
    // 属性管理数据
    attr: [] as DataItem[],
    // SPU管理数据
    spu: [] as DataItem[],
    // SKU管理数据
    sku: [] as DataItem[],
  }),

  getters: {
    // 根据类型获取数据
    getDataByType: (state) => (type: keyof DataTypeMap): DataItem[] => {
      return state[type] || []
    },

    // 获取分页数据
    getPaginatedData: (state) => (type: keyof DataTypeMap, params: PaginationParams, searchParams: SearchParams) => {
      const data = state[type]
      let filteredData = [...data]

      // 搜索过滤
      if (searchParams.keyword) {
        filteredData = filteredData.filter(item => 
          item.name.toLowerCase().includes(searchParams.keyword.toLowerCase())
        )
      }

      // 计算总数
      const total = filteredData.length

      // 分页
      const start = (params.current - 1) * params.size
      const end = start + params.size
      const paginatedData = filteredData.slice(start, end)

      return {
        data: paginatedData,
        total
      }
    }
  },

  actions: {
    // 初始化数据（从localStorage加载）
    initData() {
      const keys: (keyof DataTypeMap)[] = ['user', 'role', 'permission', 'brand', 'attr', 'spu', 'sku']
      keys.forEach(key => {
        const stored = getStorageData(key)
        if (stored) {
          this[key] = stored
        } else {
          // 初始化一些示例数据
          this[key] = this.getInitialData(key)
          this.saveToStorage(key)
        }
      })
    },

    // 获取初始示例数据
    getInitialData(type: keyof DataTypeMap): DataItem[] {
      const baseData = [
        { id: generateId(), name: `${type}示例1`, status: true, createTime: formatTime() },
        { id: generateId(), name: `${type}示例2`, status: false, createTime: formatTime() },
        { id: generateId(), name: `${type}示例3`, status: true, createTime: formatTime() },
      ]
      return baseData
    },

    // 保存到localStorage
    saveToStorage(type: keyof DataTypeMap) {
      setStorageData(type, this[type])
    },

    // 创建数据
    createData(type: keyof DataTypeMap, data: Omit<DataItem, 'id' | 'createTime'>): DataItem {
      const newItem: DataItem = {
        id: generateId(),
        name: data.name,
        status: data.status,
        createTime: formatTime()
      }
      
      this[type].push(newItem)
      this.saveToStorage(type)
      return newItem
    },

    // 更新数据
    updateData(type: keyof DataTypeMap, id: number, data: Partial<DataItem>): DataItem | null {
      const index = this[type].findIndex(item => item.id === id)
      if (index !== -1) {
        this[type][index] = { ...this[type][index], ...data }
        this.saveToStorage(type)
        return this[type][index]
      }
      return null
    },

    // 删除数据
    deleteData(type: keyof DataTypeMap, id: number): boolean {
      const index = this[type].findIndex(item => item.id === id)
      if (index !== -1) {
        this[type].splice(index, 1)
        this.saveToStorage(type)
        return true
      }
      return false
    },

    // 批量删除
    batchDeleteData(type: keyof DataTypeMap, ids: number[]) {
      this[type] = this[type].filter(item => !ids.includes(item.id))
      this.saveToStorage(type)
    },

    // 获取单条数据
    getDataById(type: keyof DataTypeMap, id: number): DataItem | undefined {
      return this[type].find(item => item.id === id)
    }
  }
}) 