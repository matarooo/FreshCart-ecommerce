import type {
  AccountIdentity,
  ProfileUpdate,
} from "@/lib/auth/types/account.interface";

export interface AccountProfileFormProps {
  profile: ProfileUpdate;
  account: AccountIdentity;
}
