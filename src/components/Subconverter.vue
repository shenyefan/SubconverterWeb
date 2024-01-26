<template>
  <div class="sub-container">
    <el-form :label-position="'top'" class="sub-form">
      <el-form-item label="订阅链接">
        <el-input v-model="form.sourceSubUrl" type="textarea" rows="3" resize="none" placeholder="支持各种订阅链接或单节点链接，多个链接每行一个或用 | 分隔"/>
      </el-form-item>

      <div class="flex-container">
        <el-form-item label="生成类型" class="flex-item">
          <el-select v-model="form.clientType" style="width: 100%">
            <el-option v-for="(v, k) in options.clientTypes" :key="k" :label="k" :value="v"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="后端地址" class="flex-item">
          <el-select v-model="form.customBackend" allow-create filterable @change="selectChanged" placeholder="可输入自己的后端">
            <el-option v-for="(v, k) in options.customBackend" :key="k" :label="k" :value="v"></el-option>
          </el-select>
        </el-form-item>
      </div>

      <el-form-item label="远程配置" class="outer-flex-container">
        <div class="flex-container inner-flex-container">
          <el-select v-model="form.remoteConfig" allow-create filterable placeholder="请选择" class="flex-left">
            <el-option-group v-for="group in options.remoteConfig" :key="group.label" :label="group.label">
              <el-option v-for="item in group.options" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-option-group>
          </el-select>
          <el-button @click="toggleCollapse" class="flex-right">参数</el-button>
        </div>
      </el-form-item>

      <el-collapse-transition>
        <el-collapse v-if="collapse">
          <div class="flex-container">
            <el-form-item label="包含节点" class="flex-item">
              <el-input v-model="form.includeRemarks" placeholder="要保留的节点，支持正则"/>
            </el-form-item>
            <el-form-item label="排除节点" class="flex-item">
              <el-input v-model="form.excludeRemarks" placeholder="要排除的节点，支持正则"/>
            </el-form-item>
          </div>
          <div class="flex-container">
            <el-form-item label="节点命名" class="flex-item">
              <el-input v-model="form.rename" placeholder="举例：`a@b``1@2`，|符可用\转义"/>
            </el-form-item>
            <el-form-item label="远程设备" class="flex-item">
              <el-input v-model="form.devid" placeholder="用于设置QuantumultX的远程设备ID"/>
            </el-form-item>
          </div>
          <div class="flex-container">
            <el-form-item label="更新间隔" class="flex-item">
              <el-input v-model="form.interval" placeholder="返用于设置托管配置更新间隔，单位为天"/>
            </el-form-item>
            <el-form-item label="订阅命名" class="flex-item">
              <el-input v-model="form.filename" placeholder="返回的订阅文件名，可以在支持文件名的客户端中显示出来"/>
            </el-form-item>
          </div>

          <div class="checkboxes">
            <el-checkbox v-model="form.emoji" label="Emoji"></el-checkbox>
            <el-checkbox v-model="form.insert" label="插入默认节点"></el-checkbox>
            <el-checkbox v-model="form.udp" label="启用 UDP"></el-checkbox>
            <el-checkbox v-model="form.xudp" label="启用 XUDP"></el-checkbox>
            <el-checkbox v-model="form.tfo" label="启用 TFO"></el-checkbox>
            <el-checkbox v-model="form.sort" label="基础节点排序"></el-checkbox>
            <el-checkbox v-model="form.tpl.clash.doh" label="Clash.DoH"></el-checkbox>
            <el-checkbox v-model="form.appendType" label="插入节点类型"></el-checkbox>
            <el-checkbox v-model="form.tpl.surge.doh" label="Surge.DoH"></el-checkbox>
            <el-checkbox v-model="form.tls13" label="开启TLS_1.3"></el-checkbox>
            <el-checkbox v-model="form.expand" label="展开规则全文"></el-checkbox>
            <el-checkbox v-model="form.new_name" label="Clash新字段名"></el-checkbox>
            <el-checkbox v-model="form.scv" label="跳过证书验证"></el-checkbox>
            <el-checkbox v-model="form.fdn" label="过滤不支持节点"></el-checkbox>
            <el-checkbox v-model="form.nodeList" label="仅输出节点信息"></el-checkbox>
          </div>

        </el-collapse>
      </el-collapse-transition>

      <el-form-item label="定制订阅" class="outer-flex-container">
        <div class="flex-container inner-flex-container">
          <el-input class="copy-content flex-left" disabled v-model="customSubUrl"></el-input>
          <el-button type="danger" @click="makeUrl" :disabled="form.sourceSubUrl.length === 0 || btnBoolean" class="flex-right">转换</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import "../assets/subconverter.css"
export default {
  data() {
    return {
      form: {
        sourceSubUrl: "",
        clientType: "",
        customBackend: this.getUrlParam() === "" ? "https://suc.suki.icu" : this.getUrlParam(),
        remoteConfig: "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/config/ACL4SSR_Online_Full_MultiMode.ini",
        excludeRemarks: "",
        includeRemarks: "",
        filename: "",
        rename: "",
        devid: "",
        interval: "",
        emoji: true,
        nodeList: false,
        extraset: false,
        tls13: false,
        udp: true,
        xudp: false,
        tfo: false,
        sort: false,
        expand: true,
        scv: false,
        fdn: false,
        appendType: false,
        insert: false, // 是否插入默认订阅的节点，对应配置项 insert_url
        new_name: true, // 是否使用 Clash 新字段
        tpl: {
          surge: {
            doh: false // dns 查询是否使用 DoH
          },
          clash: {
            doh: false
          }
        }
      },
      options: {
        clientTypes: {
          Clash: "clash",
          Surfboard: "surfboard",
          V2Ray: "v2ray",
          Trojan: "trojan",
          ShadowsocksR: "ssr",
          ShadowsocksD: "ssd",
          "Shadowsocks(SIP002)": "ss",
          "Shadowsocks Android(SIP008)": "sssub",
          Quantumult: "quan",
          "Quantumult X": "quanx",
          Surge2: "surge&ver=2",
          Surge3: "surge&ver=3",
          Surge4: "surge&ver=4",
          ClashR: "clashr",
          Loon: "loon",
          Mellow: "mellow",
          "混合订阅(mixed)": "mixed",
          "自动判断客户端": "auto",
        },
        customBackend: {
          "默认后端": "https://suc.suki.icu",
          "本地局域网后端": "http://127.0.0.1:25500"
        },
        backendOptions: [
          {value: "https://suc.suki.icu"},
          {value: "http://127.0.0.1:25500"}
        ],
        remoteConfig: [
          {
            label: "ACL规则",
            options: [
              {
                label: "ACL_默认版",
                value: "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/config/ACL4SSR_Online.ini"
              },
              {
                label: "ACL_无测速版",
                value: "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/config/ACL4SSR_Online_NoAuto.ini"
              },
              {
                label: "ACL_去广告版",
                value: "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/config/ACL4SSR_Online_AdblockPlus.ini"
              },
              {
                label: "ACL_多国家版",
                value: "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/config/ACL4SSR_Online_MultiCountry.ini"
              },
              {
                label: "ACL_无Reject版",
                value: "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/config/ACL4SSR_Online_NoReject.ini"
              },
              {
                label: "ACL_无测速精简版",
                value: "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/config/ACL4SSR_Online_Mini_NoAuto.ini"
              },
              {
                label: "ACL_全分组版",
                value: "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/config/ACL4SSR_Online_Full.ini"
              },
              {
                label: "ACL_全分组谷歌版",
                value: "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/config/ACL4SSR_Online_Full_Google.ini"
              },
              {
                label: "ACL_全分组多模式版",
                value: "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/config/ACL4SSR_Online_Full_MultiMode.ini"
              },
              {
                label: "ACL_全分组奈飞版",
                value: "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/config/ACL4SSR_Online_Full_Netflix.ini"
              },
              {
                label: "ACL_精简版",
                value: "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/config/ACL4SSR_Online_Mini.ini"
              },
              {
                label: "ACL_去广告精简版",
                value: "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/config/ACL4SSR_Online_Mini_AdblockPlus.ini"
              },
              {
                label: "ACL_Fallback精简版",
                value: "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/config/ACL4SSR_Online_Mini_Fallback.ini"
              },
              {
                label: "ACL_多国家精简版",
                value: "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/config/ACL4SSR_Online_Mini_MultiCountry.ini"
              },
              {
                label: "ACL_多模式精简版",
                value: "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/config/ACL4SSR_Online_Mini_MultiMode.ini"
              }
            ]
          }
        ],
      },
      collapse: false,
      customSubUrl: "",
      backendVersion: "",
      btnBoolean: false,
    };
  },
  methods: {
    makeUrl() {
      if (this.form.sourceSubUrl === "" || this.form.clientType === "") {
        ElMessage.error("订阅链接与客户端为必填项");
        return false;
      }
      let backend =
          this.form.customBackend === ""
              ? defaultBackend
              : this.form.customBackend;
      let sourceSub = this.form.sourceSubUrl;
      sourceSub = sourceSub.replace(/(\n|\r|\n\r)/g, "|");
      this.customSubUrl =
          backend +
          "/sub?target=" +
          this.form.clientType +
          "&url=" +
          encodeURIComponent(sourceSub) +
          "&insert=" +
          this.form.insert;
      if (this.form.remoteConfig !== "") {
        this.customSubUrl +=
            "&config=" + encodeURIComponent(this.form.remoteConfig);
      }
      if (this.form.excludeRemarks !== "") {
        this.customSubUrl +=
            "&exclude=" + encodeURIComponent(this.form.excludeRemarks);
      }
      if (this.form.includeRemarks !== "") {
        this.customSubUrl +=
            "&include=" + encodeURIComponent(this.form.includeRemarks);
      }
      if (this.form.filename !== "") {
        this.customSubUrl +=
            "&filename=" + encodeURIComponent(this.form.filename);
      }
      if (this.form.rename !== "") {
        this.customSubUrl +=
            "&rename=" + encodeURIComponent(this.form.rename);
      }
      if (this.form.interval !== "") {
        this.customSubUrl +=
            "&interval=" + encodeURIComponent(this.form.interval * 86400);
      }
      if (this.form.devid !== "") {
        this.customSubUrl +=
            "&dev_id=" + encodeURIComponent(this.form.devid);
      }
      if (this.form.appendType) {
        this.customSubUrl +=
            "&append_type=" + this.form.appendType.toString();
      }
      if (this.form.tls13) {
        this.customSubUrl +=
            "&tls13=" + this.form.tls13.toString();
      }
      if (this.form.sort) {
        this.customSubUrl +=
            "&sort=" + this.form.sort.toString();
      }
      this.customSubUrl +=
          "&emoji=" +
          this.form.emoji.toString() +
          "&list=" +
          this.form.nodeList.toString() +
          "&xudp=" +
          this.form.xudp.toString() +
          "&udp=" +
          this.form.udp.toString() +
          "&tfo=" +
          this.form.tfo.toString() +
          "&expand=" +
          this.form.expand.toString() +
          "&scv=" +
          this.form.scv.toString() +
          "&fdn=" +
          this.form.fdn.toString();
      if (this.form.tpl.surge.doh === true) {
        this.customSubUrl += "&surge.doh=true";
      }
      if (this.form.clientType === "clash") {
        if (this.form.tpl.clash.doh === true) {
          this.customSubUrl += "&clash.doh=true";
        }
        this.customSubUrl += "&new_name=" + this.form.new_name.toString();
      }
      this.copyToClipboard();
      ElMessage.success("定制订阅已复制到剪贴板");
    },
    async copyToClipboard() {
      try {
        await navigator.clipboard.writeText(this.customSubUrl);
      } catch (err) {
        console.error('无法将文本复制到剪贴板', err);
      }
    },
    toggleCollapse() {
      this.collapse = !this.collapse; // 切换折叠状态
    },
    selectChanged() {
      this.getBackendVersion();
    },
    getUrlParam() {
      let query = window.location.search.substring(1);
      let vars = query.split('&');
      for (let i = 0; i < vars.length; i++) {
        const pair = vars[i].split('=');
        if (pair[0] === "backend") {
          return decodeURIComponent(pair[1]);
        }
      }
      return "";
    },
    getBackendVersion() {
      this.$axios
          .get(
              this.form.customBackend + "/version",
          )
          .then(res => {
            this.backendVersion = res.data.replace(/backend\n$/gm, "");
            this.backendVersion = this.backendVersion.replace("subconverter", "SubConverter");
            ElMessage.success(`${this.backendVersion}` + "连接成功！")
          })
          .catch(() => {
            ElMessage.error("请求SubConverter版本号返回数据失败，该后端不可用！");
          });
    },
  },
  mounted() {
    this.form.clientType = "clash";
    this.getBackendVersion();
  },
};
</script>