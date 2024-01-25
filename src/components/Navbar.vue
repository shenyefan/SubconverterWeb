<template>
  <div class="navbar">
    <!-- 左侧：网站图标和名称，点击跳转 -->
    <router-link to="/" class="logo">
      <img src="@/assets/logo.png" alt="订阅转换" />
      <span class="brand-name">Subconverter Web</span>
    </router-link>

    <!-- 右侧：导航按钮 -->
    <div class="nav-buttons">
      <router-link to="/" class="nav-link">首页</router-link>
      <!-- 添加更多按钮 -->
    </div>
  </div>
</template>

<script>
</script>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000; /* 设置一个较大的 z-index 值，确保在其他元素之上 */
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background-color: #f6f6f7; /* 设置背景颜色 */
  border: 2px solid #ffffff; /* 设置边框颜色 */
  border-radius: 10px; /* 设置圆角矩形 */
  margin: 10px 10vw;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1); /* 添加阴影效果 */
  transition: background-color 0.3s ease; /* 添加背景颜色过渡效果 */
}

.logo {
  display: flex;
  align-items: center;
  text-decoration: none;
  color: white;
}

.logo img {
  width: 40px;
  height: 40px;
  margin-right: 10px;
  border-radius: 50%; /* 圆形图标 */
  transition: transform 0.3s ease; /* 图标放大效果 */
}

.brand-name {
  font-size: 1.1em;
  font-weight: bold;
  color: #535061;

}

.nav-buttons {
  display: flex;
}

.nav-link {
  margin-right: 20px;
  color: #535061;
  text-decoration: none;
  font-size: 1em;
  transition: color 0.3s ease; /* 链接颜色过渡效果 */
}

/* 鼠标悬停时的效果 */
.nav-link:hover {
  color: #3498db; /* 修改为你想要的悬停颜色 */
}

</style>