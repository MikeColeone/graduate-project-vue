/*
部门
用户
过程
子项
*/

export interface User {
  id?: string;
  name?: string;
  password?: string;
  number?: string;
  description?: string;
  description_id?: string;
  //判断用户身份
  role?: string;
}
