import Vue from "vue";
import VueRouter from "vue-router";
import App from "./App.vue";
import routes from "./router";
import "./public-path";

Vue.use(VueRouter);
Vue.config.productionTip = false;

let router = null;
let instance = null;

function render() {
  router = new VueRouter({
    base: window.__POWERED_BY_QIANKUN__ ? "/vue-app-one" : "/",
    mode: "history",
    routes
  });

  instance = new Vue({
    router,
    render: h => h(App),
    mounted() {
      this.$bus.$emit("postMessage", {
        from: "vue-app-one",
        msg: "我是vue-app-one,我给你发个消息试试看你能收到不"
      });
    }
  }).$mount("#app");
}

// 单独启动时候直接执行渲染
if (!window.__POWERED_BY_QIANKUN__) {
  render();
}

export async function bootstrap(props = {}) {
  if (props.fns && props.fns.length > 0) {
    props.fns.map(i => {
      Vue.prototype[i.name] = i[i.name];
    });
  }
  // 子应用内部拿到监听器并绑定到vue实例，子应用若想要发送消息需要使用this.$subscriber.next({from:'', ...})
  if (props.bus) {
    Vue.prototype.$bus = props.bus;
  }
  console.log("vue app bootstraped");
  console.log("接收到父应用传递来的数据:", props.data);
}

export async function mount(props) {
  console.log("props from main app", props);
  render();
}

export async function unmount() {
  instance.$destroy();
  instance = null;
  router = null;
}
