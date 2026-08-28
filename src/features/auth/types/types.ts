export type RegisterRequest = {
  userName: string;
  emailAddress: string;
  contactNumber: string;
  password: string;
};

export type ProblemDetail = {
  status: number;
  title: string;
  detail?: string;
  errors?: Record<string, string>;
};
