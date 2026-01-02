'use client'

import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'

export default function TermsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 bg-white py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-playfair font-bold text-brand-plum mb-8">
            Terms of Service
          </h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 mb-6">
              <em>Last updated: {new Date().toLocaleDateString()}</em>
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-playfair font-bold text-brand-plum mb-4">1. Agreement to Terms</h2>
              <p className="text-gray-700 mb-4">
                By accessing and using The Mindful Musicpreneur website and services, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-playfair font-bold text-brand-plum mb-4">2. Digital Products</h2>
              <p className="text-gray-700 mb-4">
                All products offered through The Mindful Musicpreneur are digital products delivered electronically. Upon purchase and successful payment:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                <li>You will receive immediate access to your purchased content</li>
                <li>Download links will be sent to your email address</li>
                <li>All sales are final - no refunds are provided for digital products</li>
                <li>We may replace broken or glitchy downloads upon request</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-playfair font-bold text-brand-plum mb-4">3. User Accounts</h2>
              <p className="text-gray-700 mb-4">
                When you create an account with us, you must:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                <li>Provide accurate and complete information</li>
                <li>Maintain the security of your password</li>
                <li>Notify us immediately of any unauthorized use of your account</li>
                <li>Be responsible for all activities under your account</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-playfair font-bold text-brand-plum mb-4">4. The Collective Membership</h2>
              <p className="text-gray-700 mb-4">
                Membership in The Collective is subject to:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                <li>Application and approval process</li>
                <li>Ownership of The Mindful Musicpreneur Guide</li>
                <li>Adherence to community guidelines</li>
                <li>Monthly or annual subscription payment</li>
                <li>We reserve the right to remove members who violate community guidelines</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-playfair font-bold text-brand-plum mb-4">5. Intellectual Property</h2>
              <p className="text-gray-700 mb-4">
                All content provided through The Mindful Musicpreneur, including guides, planners, playlists, and session materials, are the intellectual property of Jen Hatcher and Illustris Entertainment. You may not:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                <li>Share, distribute, or resell our content</li>
                <li>Use our content for commercial purposes without permission</li>
                <li>Remove copyright or proprietary notices</li>
                <li>Create derivative works based on our content</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-playfair font-bold text-brand-plum mb-4">6. Payment and Billing</h2>
              <p className="text-gray-700 mb-4">
                All payments are processed securely through Stripe. By making a purchase, you authorize us to charge your payment method for the amount due.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-playfair font-bold text-brand-plum mb-4">7. Disclaimer of Warranties</h2>
              <p className="text-gray-700 mb-4">
                Our services are provided "as is" without any warranties. We do not guarantee specific results from using our products.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-playfair font-bold text-brand-plum mb-4">8. Limitation of Liability</h2>
              <p className="text-gray-700 mb-4">
                To the maximum extent permitted by law, The Mindful Musicpreneur shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of our services.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-playfair font-bold text-brand-plum mb-4">9. Changes to Terms</h2>
              <p className="text-gray-700 mb-4">
                We reserve the right to modify these terms at any time. Continued use of our services after changes constitutes acceptance of the new terms.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-playfair font-bold text-brand-plum mb-4">10. Contact Information</h2>
              <p className="text-gray-700 mb-4">
                If you have questions about these Terms of Service, please contact us at:
              </p>
              <p className="text-gray-700">
                <strong>Email:</strong> hello@themindfulmusicpreneur.com<br />
                <strong>Website:</strong> illustrisillustration.com
              </p>
            </section>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  )
}
