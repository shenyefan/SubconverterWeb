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