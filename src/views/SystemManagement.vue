<template>
    <div class="system-management-window">
      <div class="sys-header">
        <div class="sys-title">系统后台管理</div>
        <button class="btn-return" @click="returnToMain">
          <span class="icon">↶</span> 返回主界面
        </button>
      </div>
      
      <div class="sys-body">
        <div class="sys-sidebar">
          <div class="menu-group">用户管理</div>
          <div class="menu-item" :class="{ active: activeTab === 'user-list' }" @click="activeTab = 'user-list'">用户列表</div>
          <div class="menu-item" :class="{ active: activeTab === 'role-auth' }" @click="activeTab = 'role-auth'">角色权限</div>
          
          <div class="menu-group">系统配置</div>
          <div class="menu-item" :class="{ active: activeTab === 'sys-param' }" @click="activeTab = 'sys-param'">参数配置</div>
          
          <div class="menu-group">日志审计</div>
          <div class="menu-item" :class="{ active: activeTab === 'log-login' }" @click="activeTab = 'log-login'">登录日志</div>
          <div class="menu-item" :class="{ active: activeTab === 'log-operate' }" @click="activeTab = 'log-operate'">操作日志</div>
        </div>
        
        <div class="sys-content">
          
          <div v-if="activeTab === 'user-list'" class="panel-section">
            <div class="panel-header">
              <span class="panel-title">系统用户人员列表</span>
              <button class="btn-primary">新增用户</button>
            </div>
            <table class="data-table">
              <thead><tr><th>用户名</th><th>真实姓名</th><th>所属角色</th><th>账号状态</th><th>操作</th></tr></thead>
              <tbody>
                <tr><td>admin</td><td>系统管理员</td><td>超级管理员</td><td><span class="status ok">正常</span></td><td class="actions"><button class="text-btn">编辑</button><button class="text-btn warn">禁用</button><button class="text-btn danger">删除</button></td></tr>
                <tr><td>ops_user</td><td>张运维</td><td>运维人员</td><td><span class="status ok">正常</span></td><td class="actions"><button class="text-btn">编辑</button><button class="text-btn warn">禁用</button><button class="text-btn danger">删除</button></td></tr>
                <tr><td>guest_01</td><td>李访客</td><td>普通用户</td><td><span class="status err">已禁用</span></td><td class="actions"><button class="text-btn">编辑</button><button class="text-btn success">启用</button><button class="text-btn danger">删除</button></td></tr>
              </tbody>
            </table>
          </div>
  
          <div v-if="activeTab === 'role-auth'" class="panel-section">
            <div class="panel-header">
              <span class="panel-title">角色注册与权限分配</span>
              <button class="btn-primary">新建角色</button>
            </div>
            <div class="role-cards">
              <div class="role-card">
                <div class="role-name">管理员</div>
                <div class="role-desc">拥有系统所有模块的完全访问与修改权限。</div>
                <div class="role-actions"><button class="btn-outline">用户注册</button><button class="btn-outline">权限配置</button></div>
              </div>
              <div class="role-card">
                <div class="role-name">运维人员</div>
                <div class="role-desc">负责设备管控、预警处置与日常巡检参数调整。</div>
                <div class="role-actions"><button class="btn-outline">用户注册</button><button class="btn-outline">权限配置</button></div>
              </div>
              <div class="role-card">
                <div class="role-name">普通用户</div>
                <div class="role-desc">仅具备各板块数据的只读浏览权限。</div>
                <div class="role-actions"><button class="btn-outline">用户注册</button><button class="btn-outline">权限配置</button></div>
              </div>
            </div>
          </div>
  
          <div v-if="activeTab === 'sys-param'" class="panel-section">
            <div class="panel-header">
              <span class="panel-title">全局参数配置</span>
              <button class="btn-success" @click="exportParams">导出配置</button>
            </div>
            <table class="data-table">
              <thead><tr><th>参数名称</th><th>参数键名</th><th>当前参数值</th><th>描述说明</th><th>操作</th></tr></thead>
              <tbody>
                <tr><td>系统会话超时</td><td>sys.session.timeout</td><td>30</td><td>用户无操作自动登出时间(分钟)</td><td class="actions"><button class="text-btn">修改</button></td></tr>
                <tr><td>最大登录失败次数</td><td>sys.login.max_retry</td><td>5</td><td>超出次数后锁定账号</td><td class="actions"><button class="text-btn">修改</button></td></tr>
                <tr><td>报警通知邮箱</td><td>sys.alert.email</td><td>alert@fishls.com</td><td>接收紧急预警的管理员邮箱</td><td class="actions"><button class="text-btn">修改</button></td></tr>
                <tr><td>数据备份周期</td><td>sys.db.backup_cron</td><td>0 0 2 * * ?</td><td>底层数据库自动备份定时表达式</td><td class="actions"><button class="text-btn">修改</button></td></tr>
              </tbody>
            </table>
          </div>
  
          <div v-if="activeTab === 'log-login'" class="panel-section">
            <div class="panel-header">
              <span class="panel-title">系统登录审计日志</span>
            </div>
            <table class="data-table">
              <thead><tr><th>登录用户</th><th>登录时间</th><th>IP地址</th><th>物理位置</th><th>设备信息</th><th>登录状态</th></tr></thead>
              <tbody>
                <tr><td>admin</td><td>2024-06-01 08:30:12</td><td>192.168.1.105</td><td>局域网内网</td><td>Windows 11 / Chrome 120</td><td><span class="status ok">成功</span></td></tr>
                <tr><td>ops_user</td><td>2024-06-01 07:45:33</td><td>112.10.25.14</td><td>浙江省杭州市</td><td>macOS / Safari 17</td><td><span class="status ok">成功</span></td></tr>
                <tr><td>guest_01</td><td>2024-05-31 22:15:05</td><td>203.11.45.22</td><td>未知区域</td><td>Linux / Firefox 115</td><td><span class="status err">密码错误</span></td></tr>
              </tbody>
            </table>
          </div>
  
          <div v-if="activeTab === 'log-operate'" class="panel-section">
            <div class="panel-header">
              <span class="panel-title">业务操作审计日志</span>
            </div>
            <table class="data-table">
              <thead><tr><th>操作时间</th><th>操作人</th><th>业务模块</th><th>操作类型</th><th>操作详情记录</th></tr></thead>
              <tbody>
                <tr><td>2024-06-01 09:12:00</td><td>admin</td><td>数据操作</td><td>数据导出</td><td>导出了《5月份水质统计报表》全量数据</td></tr>
                <tr><td>2024-06-01 08:45:15</td><td>ops_user</td><td>设备控制</td><td>指令下发</td><td>手动开启了一号养殖区底层变频增氧机组</td></tr>
                <tr><td>2024-05-31 16:30:22</td><td>ops_user</td><td>预警处置</td><td>状态确认</td><td>确认并忽略了瞬时水温异常报警(编号:A-102)</td></tr>
                <tr><td>2024-05-31 10:05:00</td><td>system</td><td>模型运行</td><td>算法调度</td><td>触发了水质预测动力学模型，生成了未来24小时演变趋势</td></tr>
              </tbody>
            </table>
          </div>
  
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  
  const router = useRouter();
  const activeTab = ref('user-list');
  
  const returnToMain = () => {
    router.push('/overview');
  };
  
  const exportParams = () => {
    alert('系统提示：配置文件导出成功，请在浏览器下载列表查看。');
  };
  </script>
  
  <style scoped>
  .system-management-window {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: #f4f6f9;
    z-index: 9999;
    display: flex;
    flex-direction: column;
  }
  
  .sys-header {
    height: 60px;
    background-color: #2b3a4a;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 24px;
    color: #ffffff;
    flex-shrink: 0;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  }
  
  .sys-title {
    font-size: 18px;
    font-weight: bold;
    letter-spacing: 1px;
  }
  
  .btn-return {
    background-color: transparent;
    border: 1px solid #4a5d73;
    color: #e4e7ed;
    padding: 6px 16px;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;
    display: flex;
    align-items: center;
    gap: 6px;
    transition: all 0.3s;
  }
  
  .btn-return:hover {
    background-color: #3b4d61;
    color: #ffffff;
    border-color: #ffffff;
  }
  
  .sys-body {
    display: flex;
    flex: 1;
    overflow: hidden;
  }
  
  .sys-sidebar {
    width: 220px;
    background-color: #ffffff;
    border-right: 1px solid #e4e7ed;
    padding: 20px 0;
    overflow-y: auto;
  }
  
  .menu-group {
    font-size: 12px;
    color: #909399;
    padding: 10px 20px;
    margin-top: 10px;
  }
  
  .menu-item {
    padding: 12px 20px;
    font-size: 14px;
    color: #303133;
    cursor: pointer;
    transition: background-color 0.2s;
    border-left: 3px solid transparent;
  }
  
  .menu-item:hover {
    background-color: #f5f7fa;
  }
  
  .menu-item.active {
    background-color: #ecf5ff;
    color: #409eff;
    border-left-color: #409eff;
    font-weight: bold;
  }
  
  .sys-content {
    flex: 1;
    padding: 24px;
    overflow-y: auto;
  }
  
  .panel-section {
    background-color: #ffffff;
    border-radius: 8px;
    padding: 20px;
    box-shadow: 0 2px 12px 0 rgba(0,0,0,0.05);
    min-height: 100%;
    box-sizing: border-box;
  }
  
  .panel-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    padding-bottom: 15px;
    border-bottom: 1px solid #ebeef5;
  }
  
  .panel-title {
    font-size: 16px;
    font-weight: bold;
    color: #303133;
    border-left: 4px solid #409eff;
    padding-left: 10px;
  }
  
  .btn-primary { background: #409eff; color: white; border: none; padding: 8px 16px; border-radius: 4px; cursor: pointer; font-size: 13px; }
  .btn-success { background: #67c23a; color: white; border: none; padding: 8px 16px; border-radius: 4px; cursor: pointer; font-size: 13px; }
  .btn-outline { background: transparent; color: #409eff; border: 1px solid #409eff; padding: 6px 14px; border-radius: 4px; cursor: pointer; font-size: 12px; }
  
  .data-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 13px;
  }
  
  .data-table th, .data-table td {
    padding: 12px 15px;
    text-align: left;
    border-bottom: 1px solid #ebeef5;
  }
  
  .data-table th {
    color: #909399;
    font-weight: bold;
    background-color: #fafafa;
  }
  
  .data-table td {
    color: #606266;
  }
  
  .actions { display: flex; gap: 10px; }
  .text-btn { background: none; border: none; color: #409eff; cursor: pointer; padding: 0; font-size: 13px; }
  .text-btn.warn { color: #e6a23c; }
  .text-btn.danger { color: #f56c6c; }
  .text-btn.success { color: #67c23a; }
  
  .status { padding: 2px 8px; border-radius: 4px; font-size: 12px; }
  .status.ok { background-color: #f0f9eb; color: #67c23a; border: 1px solid #e1f3d8; }
  .status.err { background-color: #fef0f0; color: #f56c6c; border: 1px solid #fde2e2; }
  
  .role-cards {
    display: flex;
    gap: 20px;
    flex-wrap: wrap;
  }
  
  .role-card {
    width: 300px;
    border: 1px solid #ebeef5;
    border-radius: 6px;
    padding: 20px;
    background-color: #fafbfc;
    transition: box-shadow 0.3s;
  }
  
  .role-card:hover {
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  }
  
  .role-name {
    font-size: 16px;
    font-weight: bold;
    color: #303133;
    margin-bottom: 10px;
  }
  
  .role-desc {
    font-size: 13px;
    color: #606266;
    line-height: 1.6;
    margin-bottom: 20px;
    height: 40px;
  }
  
  .role-actions {
    display: flex;
    gap: 10px;
  }
  </style>