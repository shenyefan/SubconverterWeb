<template>
  <el-container>
    <el-header><Navbar /></el-header>
    <el-main><Subconverter /></el-main>
    <el-footer><Footer /></el-footer>
  </el-container>
</template>

<script>
import Navbar from '@/components/Navbar.vue';
import Subconverter from "@/components/Subconverter.vue";
import Footer from "@/components/Footer.vue";
export default {
  components: {Footer, Subconverter, Navbar},
};
</script>

