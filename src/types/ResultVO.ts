export interface ResultVO<T> {
  code?: number; // 状态码
  message?: string; // 返回消息
  data?: T; // 泛型数据类型
  timestamp?: number; // 时间戳
}
