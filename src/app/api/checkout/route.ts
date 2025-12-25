import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-12-15.clover", // Use the version suggested by the error
});

export async function POST(req: Request) {
  try {
    const { items } = await req.json();

    if (!items || items.length === 0) {
      return NextResponse.json({ error: "No items in cart" }, { status: 400 });
    }

    // Calculate subtotal for shipping logic
    const subtotal = items.reduce((acc: number, item: any) => {
      return acc + item.product.price * item.quantity;
    }, 0);

    const line_items = items.map((item: any) => ({
      price_data: {
        currency: "aud",
        product_data: {
          name: item.product.name,
          description: item.variantId 
            ? item.product.variants.find((v: any) => v.id === item.variantId)?.name 
            : `${item.product.weightValue}${item.product.weightUnit}`,
          images: [item.product.images[0]],
        },
        unit_amount: Math.round(item.product.price * 100), // Stripe expects cents
      },
      quantity: item.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items,
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cart`,
      shipping_address_collection: {
        allowed_countries: ["AU"], // Restrict to Australia for King's Spice
      },
      shipping_options: [
        {
          shipping_rate_data: {
            type: "fixed_amount",
            fixed_amount: {
              amount: subtotal >= 79 ? 0 : 1200, // $12 AUD or Free
              currency: "aud",
            },
            display_name: subtotal >= 79 ? "Free Shipping" : "Standard Shipping",
            delivery_estimate: {
              minimum: { unit: "business_day", value: 3 },
              maximum: { unit: "business_day", value: 5 },
            },
          },
        },
        {
          shipping_rate_data: {
            type: "fixed_amount",
            fixed_amount: {
              amount: 2500, // $25 AUD Express
              currency: "aud",
            },
            display_name: "Express Shipping",
            delivery_estimate: {
              minimum: { unit: "business_day", value: 1 },
              maximum: { unit: "business_day", value: 2 },
            },
          },
        },
      ],
      // Add GST information if needed via tax_rates or automatic_tax
      // For simplicity in this demo, we assume prices are GST inclusive as per AU retail standards
      automatic_tax: { enabled: true },
    });

    return NextResponse.json({ id: session.id, url: session.url });
  } catch (err: any) {
    console.error("Stripe Error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
