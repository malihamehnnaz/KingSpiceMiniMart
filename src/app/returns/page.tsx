export default function ReturnsPage() {
  return (
    <div className="container mx-auto px-4 py-20 max-w-4xl">
      <h1 className="text-5xl font-black text-earth-brown mb-12">Returns & Refunds</h1>
      
      <div className="prose prose-lg max-w-none text-gray-600 space-y-8">
        <section>
          <h2 className="text-2xl font-bold text-earth-brown mb-4">Our Freshness Guarantee</h2>
          <p>
            At King's Spice, we take pride in the quality and freshness of our products. If you are not 
            completely satisfied with your purchase, we are here to help.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-earth-brown mb-4">Change of Mind</h2>
          <p>
            Due to the food-based nature of our products, we cannot accept returns for "change of mind" 
            once the seal has been broken or the product has been opened. This is for the safety and 
            health of all our customers.
          </p>
        </section>

        <section className="bg-red-50 p-8 rounded-3xl border border-masala-red/10">
          <h2 className="text-2xl font-bold text-masala-red mb-4">Damaged or Incorrect Items</h2>
          <p>
            If your order arrives damaged, or if you receive the wrong item, please contact us within 
            <strong> 7 days</strong> of delivery.
          </p>
          <p className="mt-4">
            Please email <strong>support@kingspice.com.au</strong> with:
          </p>
          <ul className="list-disc pl-6 mt-2">
            <li>Your Order Number</li>
            <li>Photos of the damaged or incorrect item</li>
            <li>A brief description of the issue</li>
          </ul>
          <p className="mt-4">
            We will arrange for a replacement or a full refund at no extra cost to you.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-earth-brown mb-4">Refund Process</h2>
          <p>
            Once your return is received and inspected, we will send you an email to notify you that we 
            have received your returned item. If approved, your refund will be processed, and a credit 
            will automatically be applied to your original method of payment within 5-10 business days.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-earth-brown mb-4">Consumer Rights</h2>
          <p>
            Our returns policy is in addition to your rights under the Australian Consumer Law.
          </p>
        </section>
      </div>
    </div>
  );
}
