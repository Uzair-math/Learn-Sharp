export interface TutorData {
    _id: string;
    name: string;
    email: string;
    phone: string;
    title: string;
    tuitionType: string;
    salary: number | null; // Use null for optional fields
    medium: string;
    classname: string;
    district: string;
    area: string;
  }