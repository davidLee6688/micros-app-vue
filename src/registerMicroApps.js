import {
  registerMicroApps, // 注册子应用
  runAfterFirstMounted, // 第一个子应用装载完毕
  setDefaultMountApp, // 设置默认装载子应用
  addGlobalUncaughtErrorHandler, // 添加全局的未捕获异常处理器
  start // 启动
} from "qiankun";

// 总线对象，用于主应用和子应用之间进行通信
import bus from "./utils/Bus";

/**
 * 路由监听
 * @param {*} routerPrefix 前缀
 */
const genActiveRule = routerPrefix => {
  return location => location.pathname.startsWith(routerPrefix);
};

// 在主应用注册监听器，这里可以监听到其他应用的广播
const onMessage = v => {
  console.log(`监听到子应用${v.from}发来消息：`, v);
  // TODO 处理监听到子应用消息后的处理
};

/**
 * qiankun生命周期钩子函数
 */
const lifeCycle = {
  beforeLoad: [
    app => {
      console.log("before load", app);
    }
  ], // 挂载前回调
  beforeMount: [
    app => {
      console.log("before mount", app);
    }
  ],
  // 挂载后回调
  afterMount: [
    app => {
      console.log("after mount", app);
    }
  ],
  // 卸载前回调
  beforeUnmount: [
    app => {
      console.log("before mount", app);
    }
  ],
  // 卸载后回调
  afterUnmount: [
    app => {
      console.log("after unload", app);
    }
  ]
};

export const registerApps = ({ store, render }) => {
  // 监听子应用消息
  bus.$on("postMessage", onMessage);

  // 传递到子应用的数据
  const props = {
    data: store.getters,
    fns: [],
    bus
  };
  // 注册子应用
  registerMicroApps(
    [
      {
        name: "vue-app-one",
        entry: "//localhost:8081",
        activeRule: genActiveRule("/vue-app-one"),
        render,
        props
      },
      {
        name: "vue-app-two",
        entry: "//localhost:8082",
        activeRule: genActiveRule("/vue-app-two"),
        render,
        props
      }
      // {
      //   name: "html-app-one",
      //   entry: "//localhost:5000",
      //   activeRule: genActiveRule("/html-app-one"),
      //   render,
      //   props
      // }
    ],
    lifeCycle
  );

  // 设置默认子应用,参数与注册子应用时genActiveRule("/aaa")函数内的参数一致
  setDefaultMountApp("/vue-app-one");

  // 第一个子应用加载完毕回调
  runAfterFirstMounted(() => {
    console.log("首个子应用完成加载");
  });

  // 启动微服务
  start();

  // 添加全局的未捕获异常处理器。
  addGlobalUncaughtErrorHandler(event => console.log(event));
};
