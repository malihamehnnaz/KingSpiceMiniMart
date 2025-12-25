export default function PrivacyPage() {
  return (
    <div className="container mx-auto px-4 py-20 max-w-4xl">
      <h1 className="text-5xl font-black text-earth-brown mb-12">Privacy Policy</h1>
      
      <div className="prose prose-lg max-w-none text-gray-600 space-y-8">
        <p className="italic">Last Updated: May 2024</p>

        <section>
          <h2 className="text-2xl font-bold text-earth-brown mb-4">1. Introduction</h2>
          <p>
            King's Spice Mini Mart ("we", "us", or "our") is committed to protecting your privacy. 
            This Privacy Policy explains how we collect, use, and safeguard your personal information 
            when you visit our website and purchase our products.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-earth-brown mb-4">2. Information We Collect</h2>
          <p>We collect information that you provide directly to us, including:</p>
          <ul className="list-disc pl-6 mt-2">
            <li><strong>Contact Information:</strong> Name, email address, phone number, and shipping address.</li>
            <li><strong>Payment Information:</strong> Payment details are processed securely via Stripe. We do not store your full credit card numbers on our servers.</li>
            <li><strong>Order History:</strong> Details of the products you have purchased from us.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-earth-brown mb-4">3. How We Use Your Information</h2>
          <p>We use your information to:</p>
          <ul className="list-disc pl-6 mt-2">
            <li>Process and fulfill your orders.</li>
            <li>Communicate with you about your order status.</li>
            <li>Send you marketing communications (if you have opted in).</li>
            <li>Improve our website and customer service.</li>
            <li>Comply with legal obligations.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-earth-brown mb-4">4. Data Security</h2>
          <p>
            We implement a variety of security measures to maintain the safety of your personal information. 
            Your personal information is contained behind secured networks and is only accessible by a 
            limited number of persons who have special access rights to such systems.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-earth-brown mb-4">5. Third-Party Disclosure</h2>
          <p>
            We do not sell, trade, or otherwise transfer your personal information to outside parties 
            except for trusted third parties who assist us in operating our website, conducting our 
            business, or servicing you (e.g., shipping carriers, payment processors).
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-earth-brown mb-4">6. Your Rights</h2>
          <p>
            You have the right to access, correct, or delete your personal information. Please contact 
            us at <strong>privacy@kingspice.com.au</strong> to make a request.
          </p>
        </section>
      </div>
    </div>
  );
}
