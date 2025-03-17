// 防抖工具函数

const debounce = (fn: (arg0: any) => void, delay: number | undefined) => {
  let timeoutId: number | undefined;
  return function (...args: any[]) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      fn(...args);
    }, delay);
  };
};
export default debounce;
