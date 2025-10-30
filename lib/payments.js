// Simple provider abstraction with NOWPayments & RedotPay placeholders.
// In production replace createXxxSession with real API calls.
export async function createCheckout({ provider, planId, userId, email }){
  if(provider === "nowpayments"){
    const url = process.env.NOWPAY_CALLBACK_URL || "https://example.com/paid";
    return { url: url + `?ok=1&plan=${planId}&uid=${userId}` };
  }
  if(provider === "redotpay"){
    const url = process.env.REDOTPAY_CALLBACK_URL || "https://example.com/paid";
    return { url: url + `?ok=1&plan=${planId}&uid=${userId}` };
  }
  return { url: "/error?msg=no-provider" };
}
