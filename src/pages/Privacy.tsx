import Navbar from '@/components/Navbar';

const Privacy = () => {
  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="prose prose-lg max-w-none">
          <h1 className="text-4xl font-bold mb-8 bg-gradient-primary bg-clip-text text-transparent">
            Privacy Policy
          </h1>
          
          <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-8 space-y-6">
            <p className="text-muted-foreground">
              Last updated: {new Date().toLocaleDateString()}
            </p>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">1. Information We Collect</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium mb-2 text-foreground">Account Information</h3>
                  <p className="text-foreground leading-relaxed">
                    When you create an account, we collect your email address, name, and authentication information.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-2 text-foreground">Usage Data</h3>
                  <p className="text-foreground leading-relaxed">
                    We collect information about how you use our service, including generated content, 
                    tool usage patterns, and interaction data to improve our services.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-2 text-foreground">Technical Information</h3>
                  <p className="text-foreground leading-relaxed">
                    We automatically collect device information, IP addresses, browser type, 
                    and other technical data when you access our service.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">2. How We Use Your Information</h2>
              <ul className="list-disc list-inside space-y-2 text-foreground">
                <li>Provide and maintain our AI content generation services</li>
                <li>Process your account registration and authentication</li>
                <li>Improve our AI models and service quality</li>
                <li>Send important service updates and notifications</li>
                <li>Provide customer support and respond to inquiries</li>
                <li>Analyze usage patterns to enhance user experience</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">3. Information Sharing</h2>
              <p className="text-foreground leading-relaxed mb-3">
                We do not sell or rent your personal information to third parties. We may share information in the following circumstances:
              </p>
              <ul className="list-disc list-inside space-y-2 text-foreground">
                <li>With service providers who help us operate our platform (e.g., hosting, analytics)</li>
                <li>When required by law or to protect our rights and safety</li>
                <li>In connection with a merger, acquisition, or sale of assets</li>
                <li>With your explicit consent</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">4. Data Security</h2>
              <p className="text-foreground leading-relaxed">
                We implement industry-standard security measures to protect your personal information, 
                including encryption, secure servers, and access controls. However, no method of 
                transmission over the internet is 100% secure.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">5. Content Privacy</h2>
              <ul className="list-disc list-inside space-y-2 text-foreground">
                <li>Your generated content is private and belongs to you</li>
                <li>We may analyze content in aggregate to improve our AI models</li>
                <li>Content is not shared with other users unless you choose to do so</li>
                <li>You can delete your generated content at any time</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">6. Cookies and Tracking</h2>
              <p className="text-foreground leading-relaxed">
                We use cookies and similar technologies to provide functionality, analyze usage, 
                and improve our services. You can control cookie preferences through your browser settings.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">7. Your Rights</h2>
              <p className="text-foreground leading-relaxed mb-3">
                Depending on your location, you may have the following rights:
              </p>
              <ul className="list-disc list-inside space-y-2 text-foreground">
                <li>Access your personal information</li>
                <li>Correct inaccurate information</li>
                <li>Delete your personal information</li>
                <li>Port your data to another service</li>
                <li>Opt out of certain data processing</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">8. Data Retention</h2>
              <p className="text-foreground leading-relaxed">
                We retain your information for as long as necessary to provide our services 
                and comply with legal obligations. You can request deletion of your account 
                and associated data at any time.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">9. International Transfers</h2>
              <p className="text-foreground leading-relaxed">
                Your information may be transferred to and processed in countries other than 
                your own. We ensure appropriate safeguards are in place to protect your data.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">10. Children's Privacy</h2>
              <p className="text-foreground leading-relaxed">
                Our service is not intended for children under 13. We do not knowingly collect 
                personal information from children under 13.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">11. Changes to This Policy</h2>
              <p className="text-foreground leading-relaxed">
                We may update this Privacy Policy from time to time. We will notify you of 
                any changes by posting the new policy on this page and updating the "Last updated" date.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">12. Contact Us</h2>
              <p className="text-foreground leading-relaxed">
                If you have any questions about this Privacy Policy or your personal information, 
                please contact us at privacy@aicontentforge.com.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Privacy;