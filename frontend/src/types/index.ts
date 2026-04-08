/**
 * Domain types matching the backend models.
 */

export interface User {
  id: string;
  email: string;
  role: 'INTERN' | 'COMPANY_ADMIN' | 'SUPERVISOR' | 'SUPER_ADMIN' | 'SCHOOL_ADMIN';
}

export interface Internship {
  id: string;
  title: string;
  companyName: string;
  description: string;
  status: 'OPEN' | 'CLOSED' | 'COMPLETED';
}

export interface Application {
  id: string;
  studentId: string;
  internshipId: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
}


