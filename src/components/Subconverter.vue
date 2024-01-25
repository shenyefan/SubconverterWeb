<template>
  <el-form label-width="100px" class="main-form">
    <el-form-item label="订阅链接">
      <el-input v-model="subscriptionLink" placeholder="输入订阅链接"></el-input>
    </el-form-item>

    <el-form-item label="生成类型">
      <el-select v-model="generationType" placeholder="选择生成类型">
        <el-option label="类型1" value="type1"></el-option>
        <el-option label="类型2" value="type2"></el-option>
        <!-- 在这里添加其他类型的选项 -->
      </el-select>
    </el-form-item>

    <el-form-item label="后端地址">
      <el-input v-model="backendAddress" placeholder="输入后端地址"></el-input>
    </el-form-item>

    <el-form-item label="远程配置">
      <el-input v-model="remoteConfig" placeholder="输入远程配置"></el-input>
    </el-form-item>

    <el-form-item label="生成的订阅链接">
      <el-input v-model="generatedLink" placeholder="生成的订阅链接" readonly></el-input>
    </el-form-item>

    <el-form-item class="generate-btn">
      <el-button @click="generateLink" type="primary">生成链接</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  data() {
    return {
      subscriptionLink: '',
      generationType: '',
      backendAddress: '',
      remoteConfig: '',
      generatedLink: '',
    };
  },
  methods: {
    generateLink() {
      // 在这里编写生成链接的逻辑，使用data中的信息
      // 将生成的链接更新到generatedLink
    },
  },
};
</script>

