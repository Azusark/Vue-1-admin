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
import { ref, reactive, computed } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Plus } from '@element-plus/icons-vue' // 加上这一行
// 通过props接收页面元数据
const loading = ref(false) // 补充loading

const props = defineProps({
  pageMeta: {
    type: Object,
    default: () => ({
      title: '页面标题',
      icon: 'Document' // 默认图标
    })
  }
})

// 搜索表单
const searchForm = reactive({
  keyword: ''
})

// 表格数据
const tableData = ref([
  {
    id: 1,
    name: '示例数据1',
    status: true,
    createTime: '2023-01-01 10:00:00'
  },
  {
    id: 2,
    name: '示例数据2',
    status: false,
    createTime: '2023-01-02 11:00:00'
  }
])

// 分页
const pagination = reactive({
  current: 1,
  size: 10,
  total: 100
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

// 方法
const handleSearch = () => {
  console.log('搜索:', searchForm)
  // 这里调用API获取数据
}

const resetSearch = () => {
  searchForm.keyword = ''
  handleSearch()
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
  Object.assign(formData, row)
  dialogVisible.value = true
}

const handleDelete = (row) => {
  ElMessageBox.confirm('确定删除该记录吗?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    ElMessage.success('删除成功')
    // 这里调用删除API
  })
}

const submitForm = () => {
  formRef.value.validate((valid) => {
    if (valid) {
      ElMessage.success('提交成功')
      dialogVisible.value = false
      // 这里调用保存API
    }
  })
}

const handleSizeChange = (val) => {
  console.log(`每页 ${val} 条`)
  pagination.size = val
  // 重新获取数据
}

const handleCurrentChange = (val) => {
  console.log(`当前页: ${val}`)
  pagination.current = val
  // 重新获取数据
}
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