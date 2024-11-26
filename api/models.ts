// src/utils/models.ts
export interface Student {
  id: number;
  name:string;
  dni:string;
  rol:string;
}

export interface Course {
  id: number;
  name: string;
  link: string;
  code: string;
  aim:string;
  contents:string;
  studentId: number;
}

export interface Trainer {
  id: number;
  name: string;
  dni: string;
  area: string;
  burden:string;
  courseId: number;
}

export interface Certificate {
  id: number;
  hours: string;
  date: string;
  trainerId:number;
  courseId: number;
}