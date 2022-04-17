<template>
  <div class="resource-list">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item prop="name" label="资源名称">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item prop="url" label="资源路径">
            <el-input v-model="form.url"></el-input>
          </el-form-item>
          <el-form-item prop="categoryId" label="资源分类">
            <el-select
              v-model="form.categoryId"
              placeholder="请选择资源分类"
              clearable
            >
              <el-option
                :label="item.name"
                :value="item.id"
                v-for="item in resourceCategories"
                :key="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              @click="onSubmit"
              :disabled="isLoading"
            >查询搜索</el-button>
            <el-button
              @click="onReset"
              :disabled="isLoading"
            >重置</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="clearfix">
        <el-button size="mini" @click="handleEdit(null)">增加资源</el-button>
        <el-button size="mini">资源分类</el-button>
      </div>
      <el-table
        :data="resources"
        style="width: 100%; margin-bottom: 20px"
        v-loading="isLoading"
      >
        <el-table-column
          type="index"
          label="编号"
          width="100">
        </el-table-column>
        <el-table-column
          prop="name"
          label="资源名称"
          width="180">
        </el-table-column>
        <el-table-column
          prop="url"
          width="180"
          label="资源路径">
        </el-table-column>
        <el-table-column
          prop="description"
          width="180"
          label="描述">
        </el-table-column>
        <el-table-column
          width="180"
          prop="createdTime"
          label="添加时间">
        </el-table-column>
        <el-table-column
          width="180"
          label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.row)">编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!--
        total 总记录数
        page-size 每页大小
        分页组件会自动根据 total 和 page-size 计算出一共分多少页
       -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :disabled="isLoading"
        :current-page.sync="form.current"
        :page-sizes="[5, 10, 20]"
        :page-size="form.size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalCount">
      </el-pagination>
      <!-- 弹出框 -->
      <el-dialog
        :title='AddOrEditResource'
        :visible.sync="dialogVisible"
        width="30%">
        <el-form ref="resourceForm" :model="resourceForm" label-width="80px">
          <el-form-item label="资源名称">
            <el-input v-model="resourceForm.name"></el-input>
          </el-form-item>
          <el-form-item label="资源路径">
            <el-input v-model="resourceForm.url"></el-input>
          </el-form-item>
          <el-form-item label="资源分类">
            <el-select v-model="resourceForm.categoryId" placeholder="请选择活动区域">
              <el-option
              v-for="item in resourceCategories"
              :key="item.id"
              :label="item.name"
              :value="item.id"
               ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="资源描述">
            <el-input type="textarea" v-model="resourceForm.description"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="updateResourceItem">确 定</el-button>
        </span>
      </el-dialog>
    </el-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { getResourcePages, deleteResource, getResource, updateResource } from '@/services/resource'
import { getResourceCategories } from '@/services/resource-category'
import { Form } from 'element-ui'

export default Vue.extend({
  name: 'ResourceList',
  data () {
    return {
      resources: [], // 资源列表
      form: {
        name: '',
        url: '',
        current: 1, // 默认查询第1页数据
        size: 5, // 每页大小
        categoryId: null // 资源分类
      },
      totalCount: 0,
      resourceCategories: [], // 资源分类列表
      isLoading: true, // 加载状态
      dialogVisible: false, // 增加或者编辑弹框显示
      AddOrEditResource: '', // 编辑或者添加资源弹出框title
      resourceForm: {
        name: '', // 资源名称
        url: '', // 资源路径
        categoryId: '', // 分类选择
        description: '' // 资源描述
      }
    }
  },
  created () {
    this.loadResources()
    this.loadResourceCategories()
  },

  methods: {
    async loadResourceCategories () {
      const { data } = await getResourceCategories()
      this.resourceCategories = data.data
    },

    async loadResources () {
      this.isLoading = true // 展示加载中状态
      const { data } = await getResourcePages(this.form)
      this.resources = data.data.records
      this.totalCount = data.data.total
      this.isLoading = false // 关闭加载中状态
    },

    onSubmit () {
      this.form.current = 1 // 筛选查询从第 1 页开始
      this.loadResources()
    },

    async handleEdit (item: any) {
      console.log(item)
      this.dialogVisible = !this.dialogVisible
      this.AddOrEditResource = item === null ? '添加' : '编辑'
      if (item) {
        const { data } = await getResource(item.id)
        this.resourceForm.name = data.data.name
        this.resourceForm.url = data.data.url
        this.resourceForm.categoryId = data.data.categoryId
        this.resourceForm.description = data.data.description
        this.getResourceId(item.categoryId)
      } else {
        this.resourceForm = {
          name: '', // 资源名称
          url: '', // 资源路径
          categoryId: '', // 分类选择
          description: '' // 资源描述
        }
      }
    },
    async getResourceId (id: number) {
      const item:any = this.resourceCategories.find((c:any) => c.id === id)
      this.resourceForm.categoryId = item.name
      // console.log(id, this.resourceCategories)
    },
    // resourceForm
    async updateResourceItem () {
      const { data } = await updateResource(this.resourceForm)
      if (data.code === '000000') {
        this.$message({
          type: 'success',
          message: `${this.AddOrEditResource}成功`
        })
        this.loadResources()
      } else {
        this.$message({
          type: 'error',
          message: `${this.AddOrEditResource}失败，${data.mesg}`
        })
      }
      this.dialogVisible = !this.dialogVisible
      this.loadResources()
    },
    handleDelete (item: any) {
      console.log('handleDelete', item)
      this.$confirm('是否确定删除该资源?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const { data } = await deleteResource(item.id)
        if (data.code === 200 || data.code === '000000') {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.loadResources()
        } else {
          this.$message({
            type: 'error',
            message: `删除失败，${data.mesg}`
          })
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },

    handleSizeChange (val: number) {
      this.form.size = val
      this.form.current = 1 // 每页大小改变重新查询第1页数据
      this.loadResources()
    },

    handleCurrentChange (val: number) {
      // 请求获取对应页码的数据
      this.form.current = val // 修改要查询的页码
      this.loadResources()
    },

    onReset () {
      (this.$refs.form as Form).resetFields()
      this.form.current = 1 // 重置回到第1页
      this.loadResources()
    }
  }
})
</script>

<style lang="scss" scoped></style>
