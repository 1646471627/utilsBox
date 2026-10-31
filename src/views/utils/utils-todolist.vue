<template>
  <div class="container">
    <h2>待办事项</h2>
    <form @submit.prevent="addList">
      <div>
        <span>学习科目:</span>
        <input type="text" placeholder="请输入学习科目" v-model.trim="subject">
      </div>
      <div>
        <span>学习内容:</span>
        <input type="text" placeholder="请输入学习内容" v-model.trim="content">
      </div>
      <div>
        <span>学习地址:</span>
        <input type="text" placeholder="请输入学习地址" v-model.trim="address">
      </div>
      <div>
        <span>目标学习时长:</span>
        <input type="text" placeholder="请输入目标学习时长" v-model.trim="learnTime">
      </div>
      <button @click="addList()" type="button">添加</button>
      <button @click="clearForm()" type="button">清空</button>
    </form>
    <div class="search-bar">
      <div class="search-input-wrap">
        <svg class="search-icon" viewBox="0 0 24 24" width="18" height="18">
          <path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z"/>
        </svg>
        <input type="text" v-model.trim="searchData" placeholder="请输入关键词搜索待办事项">
        <button v-if="searchData" class="clear-btn" @click="searchData = ''" title="清空">×</button>
      </div>
      <span class="count-badge">共 {{ filteredList.length }} 条记录</span>
    </div>
    <div v-show="isShow" class="edit-panel">
      <form>
        <div>
          <span>请输入新的学习科目:</span>
          <input type="text" placeholder="学习科目" v-model="editForm.subject">
        </div>
        <div>
          <span>请输入新的学习内容:</span>
          <input type="text" placeholder="学习内容" v-model="editForm.content">
        </div>
        <div>
          <span>请输入新的学习地址:</span>
          <input type="text" placeholder="学习地址" v-model="editForm.address">
        </div>
        <div>
          <span>请输入新的目标学习时长:</span>
          <input type="text" placeholder="目标学习时长" v-model="editForm.learnTime">
        </div>
        <div class="btn-box">
          <el-button type="success" @click="confirmModify()" style="width:200px">确定修改</el-button>
          <el-button type="info" @click="clearEditForm()" style="width: 200px">全部清空</el-button>
          <el-button type="text" @click="cancelModify()" style="width: 200px">取消修改</el-button>
        </div>
      </form>
    </div>
    <table>
      <thead>
      <tr>
        <th>ID</th>
        <th>学习科目</th>
        <th>学习内容</th>
        <th>学习地址</th>
        <th>目标学习时长</th>
        <th>状态</th>
        <th>操作</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(l,index) in filteredList" :key="l.id">
        <td>{{ index + 1 }}</td>
        <td>{{ l.subject }}</td>
        <td>{{ l.content }}</td>
        <td>{{ l.address }}</td>
        <td>{{ l.learnTime }}</td>
        <td>
          <div>
            <input type="checkbox" :id="'todo' + l.id" aria-checked="true" role="switch" v-model="l.status">
            <label :for="'todo' + l.id">{{ l.status ? '已完成' : '未完成' }}</label>
          </div>
        </td>
        <td>
          <div class="btn-box">
            <button @click="edit(l)">编辑</button>
            <button @click="delList(l.id,l.status,l.subject)">删除</button>
          </div>
        </td>
      </tr>
      </tbody>
    </table>
    <div class="stats">
      <h4>统计</h4>
      <p>已完成的待办事项:{{ stats.done }}</p>
      <p>未完成的待办事项:{{ stats.noDone }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref,computed,watch} from 'vue'
import el from '@/utils/el-util/index.ts'
interface PlanItem{
  id:string,
  subject:string,
  content:string,
  address:string,
  learnTime:string,
  status:boolean,
}
const stored = localStorage.getItem('todoList')
const planList = ref<PlanItem[]>(stored ? JSON.parse(stored) : [])
const subject = ref('')
const content = ref('')
const learnTime = ref('')
const address = ref('')
const isShow = ref(false)
const searchData = ref('')
const editingId = ref<string | null>(null)

const filteredList = computed(() => {
  const kw = searchData.value.trim()
  if (!kw) return planList.value
  return planList.value.filter(item =>
    item.subject.toLowerCase().includes(kw.toLowerCase()) ||
    item.content.toLowerCase().includes(kw.toLowerCase()) ||
    item.learnTime.toLowerCase().includes(kw.toLowerCase()) ||
    item.address.toLowerCase().includes(kw.toLowerCase())
  )
})
const stats = computed(() => ({
  done:planList.value.filter(item => item.status).length,
  noDone:planList.value.filter(item => !item.status).length
}))

const clear = () => {
  subject.value = ''
  content.value = ''
  address.value = ''
  learnTime.value = ''
}
const addList = () => {
  if(subject.value === ''){
    el.wAlert('学习科目不能为空')
    return
  }
  if(content.value === ''){
    el.wAlert('学习内容不能为空')
    return
  }
  if(address.value === ''){
    el.wAlert('学习地址不能为空')
    return
  }
  if(learnTime.value === ''){
    el.wAlert('学习时间不能为空')
    return
  }
  planList.value.push({
    id:'todo' + Date.now(),
    subject:subject.value,
    content:content.value,
    address:address.value,
    learnTime:learnTime.value,
    status:false,
  })
  clear()
  el.sAlert('添加成功')
}
const delList = async (id:string,status:boolean,name:string) => {
  if (!status) {
    el.sAlert('未完成的待办事项不能删除')
    return
  }
  try {
    const ok = await el.elconfirm(`确定要删除学科名称为${name}的待办事项吗?`,'提示',
      {
      confirmButtonText:'确定删除',
      cancelButtonText:'取消删除',
      type:'info'
      }
    )
    if(ok){
      planList.value = planList.value.filter(item => item.id !== id)
      el.sAlert('删除成功')
    }
  }catch{}
}
const editForm = ref({ subject: '', content: '', address: '', learnTime: '' })
const edit = (l:PlanItem) => {
  isShow.value = true
  editingId.value = l.id
  editForm.value = {...l}
}
const clearForm = () => {
  clear()
}

const confirmModify = () => {
  const { subject, content, address, learnTime } = editForm.value
  if (!subject || !content || !address || !learnTime) {
    el.eAlert('4 个输入框都不能为空')
    return
  }
  const target = planList.value.find(item => item.id === editingId.value)
  if (target) {
    Object.assign(target, editForm.value)
    el.sAlert('修改成功')
  }
  isShow.value = false
  editingId.value = null
}

const clearEditForm = () => {
  editForm.value = {
    subject: '',
    address: '',
    learnTime: '',
    content: '',
  }
}

const cancelModify = () => {
  isShow.value = false
  editingId.value = null
}

watch(planList, (newVal) => {
  localStorage.setItem('todoList', JSON.stringify(newVal))
},{deep: true})
</script>

<style lang="scss" scoped>
@use '../../css/variables' as v;
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  outline: none;
}

.container {
  @include v.container
}

h2 {
  text-align: center;
  margin-bottom: 24px;
  color: #333;
}

/* ========== 表单 ========== */
form {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-bottom: 24px;
}

form div {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

form span {
  font-size: 14px;
  color: #666;
}

form input {
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 14px;
  transition: border-color 0.2s;
}

form input:focus {
  border-color: #4a90d9;
}

form button {
  grid-column: span 2;
  padding: 10px;
  border: none;
  border-radius: 6px;
  background: #4a90d9;
  color: #fff;
  font-size: 15px;
  cursor: pointer;
  transition: background 0.2s;
}

form button:hover {
  background: #357abd;
}

form button[type="button"] {
  background: #999;
}

form button[type="button"]:hover {
  background: #777;
}

/* ========== 表格 ========== */
table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 24px;
}

thead {
  background: #f5f7fa;
}

th, td {
  padding: 10px 8px;
  text-align: center;
  border-bottom: 1px solid #eee;
  font-size: 14px;
}

th {
  font-weight: 600;
  color: #333;
}

tbody tr:hover {
  background: #fafbfc;
}

/* 已完成的行：变灰 + 删除线 */
tbody tr:has(input:checked) {
  color: #aaa;
}

tbody tr:has(input:checked) td:not(:last-child):not(:nth-last-child(2)) {
  text-decoration: line-through;
}

/* ========== 操作按钮 ========== */
.btn-box {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.btn-box button {
  padding: 4px 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background: #fff;
  font-size: 13px;
  cursor: pointer;
  transition: all 0.2s;
  margin-left: 0;
}

.btn-box button:first-child {
  color: #4a90d9;
  border-color: #4a90d9;
}

.btn-box button:first-child:hover {
  background: #4a90d9;
  color: #fff;
}

.btn-box button:last-child {
  color: #e74c3c;
  border-color: #e74c3c;
}

.btn-box button:last-child:hover {
  background: #e74c3c;
  color: #fff;
}

/* ========== 统计 ========== */
.stats {
  padding: 16px;
  background: #f5f7fa;
  border-radius: 8px;
}

.stats h4 {
  margin-bottom: 8px;
  color: #333;
}

.stats p {
  font-size: 14px;
  color: #666;
  margin-bottom: 4px;
}

.stats p:last-child {
  margin-bottom: 0;
}
/* ========== 搜索栏 ========== */
.search-bar {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 24px;
}

.search-input-wrap {
  position: relative;
  flex: 1;
  display: flex;
  align-items: center;
}

.search-icon {
  position: absolute;
  left: 12px;
  color: #9aa5b1;
  pointer-events: none;
}

.search-input-wrap input {
  width: 100%;
  padding: 10px 36px 10px 38px;
  border: 1px solid #e0e4ea;
  border-radius: 8px;
  font-size: 14px;
  background: #f7f9fc;
  transition: all 0.2s;
}

.search-input-wrap input:focus {
  background: #fff;
  border-color: #4a90d9;
  box-shadow: 0 0 0 3px rgba(74, 144, 217, 0.12);
}

.search-input-wrap input::placeholder {
  color: #a8b2bd;
}

.clear-btn {
  position: absolute;
  right: 8px;
  width: 22px;
  height: 22px;
  border: none;
  border-radius: 50%;
  background: #ccd3db;
  color: #fff;
  font-size: 15px;
  line-height: 1;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s;
}

.clear-btn:hover {
  background: #a8b2bd;
}

.count-badge {
  flex-shrink: 0;
  padding: 6px 14px;
  border-radius: 20px;
  background: #eaf3fc;
  color: #357abd;
  font-size: 13px;
  font-weight: 500;
  white-space: nowrap;
}
.edit-panel {
  animation: fadeIn 0.2s ease;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-8px); }
  to   { opacity: 1; transform: translateY(0); }
}
</style>
