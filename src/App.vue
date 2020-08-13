<template>
  <div id="root" class="main-container">
    <div class="main-container-menu">
      <a-menu
        :defaultSelectedKeys="defaultSelectedKeys"
        mode="horizontal"
        theme="dark"
      >
        <a-menu-item key="vue-app-one">
          <router-link to="/vue-app-one">
            <a-icon type="appstore" />vue app 1
          </router-link>
        </a-menu-item>
        <a-menu-item key="vue-app-two">
          <router-link to="/vue-app-two">
            <a-icon type="appstore" />vue app 2
          </router-link>
        </a-menu-item>
        <a-menu-item key="html-app-one">
          <router-link to="/html-app-one">
            <a-icon type="appstore" />html app 1
          </router-link>
        </a-menu-item>
      </a-menu>
    </div>
    <!-- 子应用盒子 -->
    <div id="root-view" class="app-view-box" v-html="content"></div>
  </div>
</template>

<script>
export default {
  name: "root-view",
  props: {
    loading: Boolean,
    content: String
  },
  data() {
    return {
      defaultSelectedKeys: ["vue-app-one"]
    };
  }
};
</script>
