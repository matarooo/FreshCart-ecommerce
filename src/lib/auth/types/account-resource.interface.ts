export type AccountResourceState<Data> =
  | { status: "loading" | "sign-in" | "error" }
  | { status: "ready"; data: Data };

export type AccountResourceRequest<Data, Change> = (
  email: string,
  change?: Change,
) => Promise<AccountResourceState<Data>>;

export interface AccountRequestQueue {
  tail: Promise<boolean>;
  pending: Set<string | null>;
  needsSignIn: boolean;
}
