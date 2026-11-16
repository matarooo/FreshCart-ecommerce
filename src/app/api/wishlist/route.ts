import { getCommerceToken } from "@/lib/auth/commerce-session";
import {
  getWishlist,
  updateWishlist,
  WishlistApiError,
} from "@/lib/wishlist/wishlist.api";
import { wishlistChangeSchema } from "@/lib/wishlist/wishlist.schema";

function wishlistResponse(data: object, status = 200) {
  return Response.json(data, {
    status,
    headers: { "Cache-Control": "private, no-store" },
  });
}

function signInRequired() {
  return wishlistResponse({ error: "Sign in to use your wishlist." }, 401);
}

function wishlistFailure(error: unknown) {
  if (error instanceof WishlistApiError) {
    if (error.status === 401 || error.status === 403) return signInRequired();
    if ([400, 404, 409, 422].includes(error.status))
      return wishlistResponse(
        { error: "Your wishlist could not be updated. Please try again." },
        409,
      );
  }
  return wishlistResponse(
    { error: "Your wishlist is temporarily unavailable." },
    502,
  );
}

function requestToken(request: Request) {
  const account = request.headers.get("x-wishlist-account");
  return account ? getCommerceToken(account) : Promise.resolve(null);
}

export async function GET(request: Request) {
  try {
    const token = await requestToken(request);
    if (!token) return signInRequired();
    return wishlistResponse(await getWishlist(token));
  } catch (error) {
    return wishlistFailure(error);
  }
}

export async function POST(request: Request) {
  try {
    const token = await requestToken(request);
    if (!token) return signInRequired();
    const change = wishlistChangeSchema.safeParse(
      await request.json().catch(() => null),
    );
    if (!change.success)
      return wishlistResponse({ error: "Invalid wishlist change." }, 400);
    return wishlistResponse(await updateWishlist(token, change.data));
  } catch (error) {
    return wishlistFailure(error);
  }
}
