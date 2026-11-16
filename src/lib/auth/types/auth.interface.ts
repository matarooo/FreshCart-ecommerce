export interface SignInCredentials {
  email: string;
  password: string;
}

export interface SignUpCredentials extends SignInCredentials {
  name: string;
  rePassword: string;
  phone: string;
}

export interface SignInResponse {
  user: {
    name: string;
    email: string;
    phone?: string;
  };
  token: string;
}

export interface RegistrationResult {
  ok: boolean;
  message: string;
}
