// 节流工具函数

const throttle = (fn: Function, delay: number) => {
  let lastTime = 0;
  return function (...args: any[]) {
    const now = Date.now();
    if (now - lastTime >= delay) {
      fn(...args);
      lastTime = now;
    }
  };
};
export default throttle;
