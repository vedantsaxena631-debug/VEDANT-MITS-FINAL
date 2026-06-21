import { Student, Subject, Result } from './types';

export const studentData: Student = {
  enrollmentNo: "BTIO25O1142",
  firstName: "Vedant",
  lastName: "Saxena",
  branch: "Internet of Things",
  branchCode: "IOT",
  semester: 3,
  email: "vedant.iot@mits.ac.in",
  status: "Active"
};

export const syllabusData: Subject[] = [
  { code: "22242101", type: "BSC", subject: "Probability and Random Process", attended: 29, total: 34 },
  { code: "22242102", type: "DC",  subject: "Microcontrollers & IoT", attended: 26, total: 32 },
  { code: "22242103", type: "DC",  subject: "Data Structures", attended: 31, total: 35 },
  { code: "22242104", type: "DC",  subject: "Electronic Devices and Circuits", attended: 21, total: 30 },
  { code: "22242105", type: "DC",  subject: "IoT Architecture and Protocol", attended: 28, total: 32 },
  { code: "22242106", type: "DLC", subject: "Problem Solving through Python Programming", attended: 14, total: 16 },
  { code: "22242107", type: "DLC", subject: "Data Structures Lab", attended: 12, total: 12 },
  { code: "22242108", type: "DLC", subject: "IoT Architecture and Protocol Lab", attended: 10, total: 12 },
  { code: "22242109", type: "SP",  subject: "Semester Proficiency*", attended: 8, total: 8 },
  { code: "22242110", type: "PBL", subject: "Macro Project-I", attended: 6, total: 6 },
  { code: "22242111", type: "SLP", subject: "Self-learning/Presentation", attended: 4, total: 4 },
  { code: "NECXXXX",  type: "NEC", subject: "Novel Engaging Course", attended: 10, total: 12 }
];

export const resultsData: Result[] = [
  { semester: "1", sgpa: 8.12, status: "Passed" },
  { semester: "2", sgpa: 8.45, status: "Passed" }
];
