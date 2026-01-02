'use client'

import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'

export default function PrivacyPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 bg-white py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-playfair font-bold text-brand-plum mb-8">
            Privacy Policy
          </h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 mb-6">
              <em>Last updated: {new Date().toLocaleDateString()}</em>
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-playfair font-bold text-brand-plum mb-4">1. Information We Collect</h2>
              <p className="text-gray-700 mb-4">
                We collect information that you provide directly to us, including:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                <li>Name and email address</li>
                <li>Account credentials</li>
                <li>Purchase history and transaction information</li>
                <li>Application responses for The Collective</li>
                <li>Communications with us</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-playfair font-bold text-brand-plum mb-4">2. How We Use Your Information</h2>
              <p className="text-gray-700 mb-4">
                We use the information we collect to:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                <li>Provide and deliver our products and services</li>
                <li>Process transactions and send related information</li>
                <li>Send you technical notices and support messages</li>
                <li>Communicate with you about products, services, and events</li>
                <li>Monitor and analyze trends and usage</li>
                <li>Detect and prevent fraud and abuse</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-playfair font-bold text-brand-plum mb-4">3. Information Sharing</h2>
              <p className="text-gray-700 mb-4">
                We do not sell your personal information. We may share your information with:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                <li><strong>Service Providers:</strong> Stripe for payment processing, Resend for email delivery</li>
                <li><strong>Legal Requirements:</strong> When required by law or to protect our rights</li>
                <li><strong>Business Transfers:</strong> In connection with a merger, sale, or acquisition</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-playfair font-bold text-brand-plum mb-4">4. Payment Information</h2>
              <p className="text-gray-700 mb-4">
                We use Stripe for payment processing. We never see or store your full payment card details. Stripe's privacy policy can be found at{' '}
                <a href="https://stripe.com/privacy" target="_blank" rel="noopener noreferrer" className="text-brand-purple hover:underline">
                  stripe.com/privacy
                </a>
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-playfair font-bold text-brand-plum mb-4">5. Cookies and Tracking</h2>
              <p className="text-gray-700 mb-4">
                We use cookies and similar tracking technologies to track activity on our service and store certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-playfair font-bold text-brand-plum mb-4">6. Data Security</h2>
              <p className="text-gray-700 mb-4">
                We implement appropriate technical and organizational measures to protect your personal information. However, no method of transmission over the Internet is 100% secure.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-playfair font-bold text-brand-plum mb-4">7. Your Rights</h2>
              <p className="text-gray-700 mb-4">
                You have the right to:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                <li>Access and receive a copy of your personal information</li>
                <li>Request correction of inaccurate information</li>
                <li>Request deletion of your information</li>
                <li>Opt out of marketing communications</li>
                <li>Object to processing of your information</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-playfair font-bold text-brand-plum mb-4">8. Email Communications</h2>
              <p className="text-gray-700 mb-4">
                You may opt out of receiving promotional emails from us by following the unsubscribe link in those emails. You will continue to receive transactional emails related to your purchases.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-playfair font-bold text-brand-plum mb-4">9. Children's Privacy</h2>
              <p className="text-gray-700 mb-4">
                Our services are not intended for individuals under 18 years of age. We do not knowingly collect personal information from children.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-playfair font-bold text-brand-plum mb-4">10. Changes to Privacy Policy</h2>
              <p className="text-gray-700 mb-4">
                We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-playfair font-bold text-brand-plum mb-4">11. Contact Us</h2>
              <p className="text-gray-700 mb-4">
                If you have questions about this Privacy Policy or our data practices, please contact us at:
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
