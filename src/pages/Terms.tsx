import Navbar from '@/components/Navbar';

const Terms = () => {
  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="prose prose-lg max-w-none">
          <h1 className="text-4xl font-bold mb-8 bg-gradient-primary bg-clip-text text-transparent">
            Terms of Service
          </h1>
          
          <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-8 space-y-6">
            <p className="text-muted-foreground">
              Last updated: {new Date().toLocaleDateString()}
            </p>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">1. Acceptance of Terms</h2>
              <p className="text-foreground leading-relaxed">
                By accessing and using AI ContentForge ("the Service"), you accept and agree to be bound by the terms and provision of this agreement. 
                If you do not agree to abide by the above, please do not use this service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">2. Description of Service</h2>
              <p className="text-foreground leading-relaxed">
                AI ContentForge is a web-based platform that provides AI-powered content generation tools including but not limited to 
                blog content, video scripts, social media posts, ad copy, rap lyrics, and creative stories.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">3. User Accounts</h2>
              <ul className="list-disc list-inside space-y-2 text-foreground">
                <li>You must provide accurate and complete information when creating an account</li>
                <li>You are responsible for maintaining the security of your account credentials</li>
                <li>You must notify us immediately of any unauthorized use of your account</li>
                <li>We reserve the right to suspend or terminate accounts that violate these terms</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">4. Content and Usage</h2>
              <ul className="list-disc list-inside space-y-2 text-foreground">
                <li>You retain ownership of content you create using our AI tools</li>
                <li>Generated content is provided "as is" without warranties</li>
                <li>You are responsible for reviewing and editing generated content before use</li>
                <li>Content must not violate laws, infringe rights, or contain harmful material</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">5. Subscription and Billing</h2>
              <ul className="list-disc list-inside space-y-2 text-foreground">
                <li>Free accounts are subject to usage limitations</li>
                <li>Pro subscriptions are billed monthly and automatically renew</li>
                <li>You can cancel your subscription at any time</li>
                <li>Refunds are not provided for partial billing periods</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">6. Acceptable Use</h2>
              <p className="text-foreground leading-relaxed mb-3">
                You agree not to use the Service to:
              </p>
              <ul className="list-disc list-inside space-y-2 text-foreground">
                <li>Generate content that is illegal, harmful, or violates others' rights</li>
                <li>Attempt to reverse engineer or compromise our systems</li>
                <li>Use the service for automated or bulk content generation beyond normal usage</li>
                <li>Violate any applicable laws or regulations</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">7. Privacy</h2>
              <p className="text-foreground leading-relaxed">
                Your privacy is important to us. Please review our Privacy Policy to understand 
                how we collect, use, and protect your information.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">8. Limitation of Liability</h2>
              <p className="text-foreground leading-relaxed">
                AI ContentForge and its affiliates shall not be liable for any direct, indirect, 
                incidental, special, or consequential damages resulting from your use of the Service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">9. Changes to Terms</h2>
              <p className="text-foreground leading-relaxed">
                We reserve the right to modify these terms at any time. Users will be notified 
                of significant changes via email or through the Service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">10. Contact Information</h2>
              <p className="text-foreground leading-relaxed">
                If you have any questions about these Terms of Service, please contact us at 
                support@aicontentforge.com.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Terms;