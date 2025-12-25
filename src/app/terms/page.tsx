export default function TermsPage() {
  return (
    <div className="min-h-screen bg-warm-beige pt-32 pb-20">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-earth-brown/10">
          <h1 className="text-4xl font-serif font-bold text-earth-brown mb-8">Terms & Conditions</h1>
          
          <div className="prose prose-stone max-w-none text-earth-brown/80 space-y-8">
            <section>
              <h2 className="text-2xl font-bold text-earth-brown mb-4">1. Introduction</h2>
              <p>
                Welcome to King's Spice Mini Mart. These Terms & Conditions govern your use of our website and the purchase of products from our online store. By accessing or using our website, you agree to be bound by these terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-earth-brown mb-4">2. Pricing and GST</h2>
              <p>
                All prices are listed in Australian Dollars (AUD) and are inclusive of Goods and Services Tax (GST) where applicable. We reserve the right to change prices at any time without notice.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-earth-brown mb-4">3. Orders and Payment</h2>
              <p>
                By placing an order, you are making an offer to purchase the selected products. We reserve the right to accept or reject any order for any reason. Payment must be made in full at the time of ordering via our secure payment gateway (Stripe).
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-earth-brown mb-4">4. Shipping and Delivery</h2>
              <p>
                We ship within Australia only. Delivery times are estimates and may vary based on your location and external factors. Please refer to our Shipping Policy for detailed information on rates and timeframes.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-earth-brown mb-4">5. Product Information</h2>
              <p>
                We strive to ensure that all product descriptions and images are accurate. However, slight variations in packaging or appearance may occur. If you have specific dietary requirements or allergies, please contact us before purchasing.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-earth-brown mb-4">6. Limitation of Liability</h2>
              <p>
                King's Spice Mini Mart shall not be liable for any indirect, incidental, or consequential damages arising from the use of our products or website. Our total liability is limited to the amount paid for the products in question.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-earth-brown mb-4">7. Governing Law</h2>
              <p>
                These terms are governed by the laws of New South Wales, Australia. Any disputes shall be subject to the exclusive jurisdiction of the courts of NSW.
              </p>
            </section>

            <div className="pt-8 border-t border-earth-brown/10 text-sm italic">
              Last updated: May 2024
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
