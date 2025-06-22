<template>
  <div class="page-container">
    <!-- 页面标题区 -->
    <div class="page-header">
      <h1 class="page-title">
        <el-icon :size="24" class="title-icon">
          <component :is="pageMeta.icon" />
        </el-icon>
        {{ pageMeta.title }}
      </h1>
      <div class="header-actions">
        <el-button type="primary" @click="handleCreate">
          <el-icon><Plus /></el-icon>
          新增
        </el-button>
      </div>
    </div>

    <!-- 搜索过滤区 -->
    <div class="search-filter">
      <el-form :inline="true" :model="searchForm">
        <el-form-item label="关键词">
          <el-input
            v-model="searchForm.keyword"
            placeholder="请输入关键词"
            clearable
            @keyup.enter="handleSearch"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSearch">搜索</el-button>
          <el-button @click="resetSearch">重置</el-button>
        </el-form-item>
      </el-form>
    </div>

    <!-- 主要内容区 -->
    <div class="page-content">
      <el-card shadow="never">
        <!-- 表格区域 -->
        <el-table
          :data="tableData"
          border
          stripe
          style="width: 100%"
          v-loading="loading"
        >
          <el-table-column
            prop="id"
            label="ID"
            width="80"
            align="center"
          />
          <el-table-column
            prop="name"
            label="名称"
            min-width="120"
          />
          <el-table-column
            prop="status"
            label="状态"
            width="100"
          >
            <template #default="{ row }">
              <el-tag :type="row.status ? 'success' : 'danger'">
                {{ row.status ? '启用' : '禁用' }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column
            prop="createTime"
            label="创建时间"
            width="180"
          />
          <el-table-column
            label="操作"
            width="180"
            fixed="right"
            align="center"
          >
            <template #default="{ row }">
              <el-button size="small" @click="handleEdit(row)">编辑</el-button>
              <el-button
                size="small"
                type="danger"
                @click="handleDelete(row)"
              >
                删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>

        <!-- 分页 -->
        <div class="pagination">
          <el-pagination
            v-model:current-page="pagination.current"
            v-model:page-size="pagination.size"
            :total="pagination.total"
            :page-sizes="[10, 20, 50, 100]"
            layout="total, sizes, prev, pager, next, jumper"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />
        </div>
      </el-card>
    </div>

    <!-- 编辑/新增对话框 -->
    <el-dialog
      v-model="dialogVisible"
      :title="dialogTitle"
      width="50%"
    >
      <el-form
        :model="formData"
        :rules="formRules"
        label-width="100px"
        ref="formRef"
      >
        <el-form-item label="名称" prop="name">
          <el-input v-model="formData.name" placeholder="请输入名称" />
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-switch
            v-model="formData.status"
            active-text="启用"
            inactive-text="禁用"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="submitForm">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted, watch } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'
import { useDataStore } from '@/store/modules/data'

const props = defineProps({
  pageMeta: {
    type: Object,
    default: () => ({
      title: '页面标题',
      icon: 'Document'
    })
  },
  // 新增：数据类型
  dataType: {
    type: String,
    required: true,
    validator: function(value) {
      return ['user', 'role', 'permission', 'brand', 'attr', 'spu', 'sku'].includes(value)
    }
  }
})

const dataStore = useDataStore()
const loading = ref(false)

// 搜索表单
const searchForm = reactive({
  keyword: ''
})

// 表格数据
const tableData = ref([])

// 分页
const pagination = reactive({
  current: 1,
  size: 10,
  total: 0
})

// 对话框相关
const dialogVisible = ref(false)
const formData = reactive({
  id: null,
  name: '',
  status: true
})
const formRules = {
  name: [{ required: true, message: '请输入名称', trigger: 'blur' }]
}
const formRef = ref(null)

const dialogTitle = computed(() => {
  return formData.id ? '编辑' : '新增'
})

// 加载数据
const loadData = async () => {
  loading.value = true
  try {
    const result = dataStore.getPaginatedData(
      props.dataType,
      pagination,
      searchForm
    )
    tableData.value = result.data
    pagination.total = result.total
  } catch (error) {
    ElMessage.error('加载数据失败')
    console.error('Load data error:', error)
  } finally {
    loading.value = false
  }
}

// 方法
const handleSearch = () => {
  pagination.current = 1 // 重置到第一页
  loadData()
}

const resetSearch = () => {
  searchForm.keyword = ''
  pagination.current = 1
  loadData()
}

const handleCreate = () => {
  Object.assign(formData, {
    id: null,
    name: '',
    status: true
  })
  dialogVisible.value = true
}

const handleEdit = (row) => {
  Object.assign(formData, { ...row })
  dialogVisible.value = true
}

const handleDelete = (row) => {
  ElMessageBox.confirm('确定删除该记录吗?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(async () => {
    try {
      const success = dataStore.deleteData(props.dataType, row.id)
      if (success) {
    ElMessage.success('删除成功')
        loadData() // 重新加载数据
      } else {
        ElMessage.error('删除失败')
      }
    } catch (error) {
      ElMessage.error('删除失败')
      console.error('Delete error:', error)
    }
  }).catch(() => {
    // 用户取消删除
  })
}

const submitForm = () => {
  formRef.value.validate(async (valid) => {
    if (valid) {
      try {
        if (formData.id) {
          // 编辑
          const result = dataStore.updateData(props.dataType, formData.id, {
            name: formData.name,
            status: formData.status
          })
          if (result) {
            ElMessage.success('更新成功')
            dialogVisible.value = false
            loadData()
          } else {
            ElMessage.error('更新失败')
          }
        } else {
          // 新增
          const result = dataStore.createData(props.dataType, {
            name: formData.name,
            status: formData.status
          })
          if (result) {
            ElMessage.success('创建成功')
      dialogVisible.value = false
            loadData()
          } else {
            ElMessage.error('创建失败')
          }
        }
      } catch (error) {
        ElMessage.error('操作失败')
        console.error('Submit error:', error)
      }
    }
  })
}

const handleSizeChange = (val) => {
  pagination.size = val
  pagination.current = 1 // 重置到第一页
  loadData()
}

const handleCurrentChange = (val) => {
  pagination.current = val
  loadData()
}

// 监听数据类型变化，重新加载数据
watch(() => props.dataType, () => {
  loadData()
})

// 组件挂载时初始化数据
onMounted(() => {
  // 确保数据已初始化
  dataStore.initData()
  loadData()
})
</script>

<style scoped>
.page-container {
  padding: 20px;
  height: 100%;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.page-title {
  display: flex;
  align-items: center;
  font-size: 18px;
  font-weight: 500;
  color: var(--el-text-color-primary);
}

.title-icon {
  margin-right: 8px;
  color: var(--el-color-primary);
}

.search-filter {
  background-color: #fff;
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 4px;
}

.page-content {
  background-color: #fff;
  border-radius: 4px;
  padding: 20px;
}

.pagination {
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
}
</style>