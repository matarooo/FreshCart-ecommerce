export interface AccountIdentity {
  id: string;
  role?: string;
}

export interface ProfileUpdate {
  name: string;
  email: string;
  phone?: string;
}

export interface AccountActionResult {
  ok: boolean;
  message: string;
}
