import { getCommerceToken } from "@/lib/auth/commerce-session";
import { CartApiError, getCart, updateCart } from "@/lib/cart/cart.api";
import { cartChangeSchema } from "@/lib/cart/cart.schema";

const responseHeaders = { "Cache-Control": "private, no-store" };

function cartResponse(data: object, status = 200) {
  return Response.json(data, { status, headers: responseHeaders });
}

function cartFailure(error: unknown, applyingCoupon = false) {
  if (error instanceof CartApiError) {
    if (error.status === 401 || error.status === 403)
      return cartResponse({ error: "Sign in to use your cart." }, 401);
    if ([400, 404, 409, 422].includes(error.status))
      return cartResponse(
        {
          error: applyingCoupon
            ? "This coupon could not be applied. Check the code and try again."
            : "Check product availability and try again.",
        },
        409,
      );
  }
  return cartResponse({ error: "Your cart is temporarily unavailable." }, 502);
}

function requestToken(request: Request) {
  const account = request.headers.get("x-cart-account");
  // Match the account shown in this tab in case another tab changed the session.
  return account ? getCommerceToken(account) : Promise.resolve(null);
}

export async function GET(request: Request) {
  try {
    const token = await requestToken(request);
    if (!token)
      return cartResponse({ error: "Sign in to use your cart." }, 401);
    return cartResponse(await getCart(token));
  } catch (error) {
    return cartFailure(error);
  }
}

export async function POST(request: Request) {
  let applyingCoupon = false;
  try {
    const token = await requestToken(request);
    if (!token)
      return cartResponse({ error: "Sign in to use your cart." }, 401);

    const result = cartChangeSchema.safeParse(
      await request.json().catch(() => null),
    );
    if (!result.success)
      return cartResponse({ error: "Invalid cart change." }, 400);
    applyingCoupon = result.data.type === "coupon";
    return cartResponse(await updateCart(token, result.data));
  } catch (error) {
    return cartFailure(error, applyingCoupon);
  }
}
