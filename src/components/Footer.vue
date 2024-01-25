<template>
  <div class="footer">
    <p>© 2023-{{ currentYear }} shenyefan</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentYear: new Date().getFullYear(),
    };
  },
};
</script>

<style scoped>
.footer {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: #282C3E;
  text-align: center;
  color: #ffffff; /* 设置文字颜色 */
}
</style>