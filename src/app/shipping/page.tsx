export default function ShippingPage() {
  return (
    <div className="container mx-auto px-4 py-20 max-w-4xl">
      <h1 className="text-5xl font-black text-earth-brown mb-12">Shipping Policy</h1>
      
      <div className="prose prose-lg max-w-none text-gray-600 space-y-8">
        <section>
          <h2 className="text-2xl font-bold text-earth-brown mb-4">Australia-Wide Delivery</h2>
          <p>
            King's Spice Mini Mart delivers to all addresses across Australia, including PO Boxes and Parcel Lockers. 
            We use Australia Post and select courier partners to ensure your spices arrive fresh and fast.
          </p>
        </section>

        <section className="bg-warm-beige p-8 rounded-3xl border border-saffron/20">
          <h2 className="text-2xl font-bold text-earth-brown mb-4">Shipping Rates</h2>
          <ul className="space-y-4">
            <li className="flex justify-between items-center border-b border-saffron/10 pb-2">
              <span className="font-bold">Orders over $79</span>
              <span className="text-masala-red font-black">FREE</span>
            </li>
            <li className="flex justify-between items-center border-b border-saffron/10 pb-2">
              <span className="font-bold">Standard Shipping</span>
              <span>$12.00 AUD</span>
            </li>
            <li className="flex justify-between items-center">
              <span className="font-bold">Express Shipping</span>
              <span>$25.00 AUD</span>
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-earth-brown mb-4">Delivery Times</h2>
          <p>
            We process all orders within 1-2 business days. Once dispatched, estimated delivery times are:
          </p>
          <ul className="list-disc pl-6 mt-4 space-y-2">
            <li><strong>Metro Areas:</strong> 2-4 business days</li>
            <li><strong>Regional Areas:</strong> 4-7 business days</li>
            <li><strong>Express Shipping:</strong> 1-2 business days (Metro only)</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-earth-brown mb-4">International Shipping</h2>
          <p>
            Currently, we only ship within Australia. We hope to bring King's Spice to the rest of the world soon!
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-earth-brown mb-4">Tracking Your Order</h2>
          <p>
            Once your order is shipped, you will receive an email with a tracking number. You can track your parcel 
            directly on the carrier's website.
          </p>
        </section>
      </div>
    </div>
  );
}
