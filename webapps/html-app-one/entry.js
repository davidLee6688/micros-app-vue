const render = $ => {
  $("#purehtml-container").html("Hello, render with jQuery");
  return Promise.resolve();
};

(global => {
  global["purehtml"] = {
    bootstrap: () => {
      console.log("purehtml bootstrap");
      return Promise.resolve();
    },
    mount: () => {
      console.log("purehtml mount");
      // eslint-disable-next-line no-undef
      return render($);
    },
    unmount: () => {
      console.log("purehtml unmount");
      return Promise.resolve();
    }
  };
})(window);

if (!window.__POWERED_BY_QIANKUN__) {
  // eslint-disable-next-line no-undef
  render($);
}
