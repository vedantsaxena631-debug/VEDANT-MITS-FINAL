export interface Student {
  enrollmentNo: string;
  firstName: string;
  lastName: string;
  branch: string;
  branchCode: string;
  semester: number;
  email: string;
  status: string;
}

export interface Subject {
  code: string;
  type: string;
  subject: string;
  attended: number;
  total: number;
}

export interface Result {
  semester: string;
  sgpa: number;
  status: string;
}
