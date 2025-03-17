export const RoleType = {
  STUDENT_ROLE: "qpCf",
  TEACHER_ROLE: "kU4T",
  ADMIN_ROLE: "R2md",
};
export interface ResultVO<T> {
  code?: number; // 状态码
  message?: string; // 返回消息
  data?: T; // 泛型数据类型
  timestamp?: number; // 时间戳
}

export interface User {
  id?: string;
  name?: string;
  number?: string;
  password?: string;
  groupNumber?: number;
  student?: Student;
  teacher?: Teacher;
  departmentId?: string;
  insertTime?: string;
  updateTime?: string;
}

export interface Student {
  teacherId?: string;
  teacherName?: string;
  queueNumber?: number;
  projectTitle?: string;
}

export interface StudentDTO {
  number?: string;
  groupNumber?: number;
  queueNumber?: number;
  projectTitle?: string;
}

export interface Teacher {
  total?: number;
  A?: number;
  B?: number;
  C?: number;
}

export interface Department {
  id?: string;
}

export interface LoginDTO {
  account?: string;
  password?: string;
}
