import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Navbar from '@/components/Navbar';
import { Check, Sparkles, Crown } from 'lucide-react';
import { Link } from 'react-router-dom';

const Pricing = () => {
  const plans = [
    {
      name: 'Free',
      price: '$0',
      period: 'forever',
      description: 'Perfect for trying out our AI tools',
      features: [
        '3 generations per day',
        'Access to all 6 AI tools',
        'Basic content export (copy/paste)',
        'Standard processing speed',
        'Community support'
      ],
      limitations: [
        'Limited daily usage',
        'No premium features',
        'No priority support'
      ],
      cta: 'Get Started Free',
      popular: false,
      gradient: 'bg-gradient-secondary'
    },
    {
      name: 'Pro',
      price: '$19',
      period: 'per month',
      description: 'For creators who need unlimited access',
      features: [
        'Unlimited generations',
        'Access to all 6 AI tools',
        'Premium export options (PDF, TXT)',
        'Priority processing speed',
        'Advanced customization options',
        'Priority email support',
        'Early access to new features',
        'Generation history & management',
        'Shareable content links'
      ],
      limitations: [],
      cta: 'Start Pro Trial',
      popular: true,
      gradient: 'bg-gradient-primary'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Navbar />
      
      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent">
            Choose Your Plan
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Start free and upgrade when you're ready. No hidden fees, cancel anytime.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {plans.map((plan, index) => (
            <Card 
              key={plan.name}
              className={`relative bg-card/50 backdrop-blur-sm border-border/50 hover:shadow-elevated transition-all duration-300 ${
                plan.popular ? 'scale-105 border-primary/50' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-gradient-primary px-4 py-1">
                    <Crown className="w-4 h-4 mr-1" />
                    Most Popular
                  </Badge>
                </div>
              )}
              
              <CardHeader className="text-center pb-8">
                <div className={`w-16 h-16 mx-auto mb-4 rounded-full ${plan.gradient} flex items-center justify-center`}>
                  {plan.name === 'Free' ? (
                    <Sparkles className="w-8 h-8 text-white" />
                  ) : (
                    <Crown className="w-8 h-8 text-white" />
                  )}
                </div>
                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                <div className="mt-4">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-muted-foreground">/{plan.period}</span>
                </div>
                <CardDescription className="mt-2">
                  {plan.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-success/20 flex items-center justify-center flex-shrink-0">
                        <Check className="w-3 h-3 text-success" />
                      </div>
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>

                <Link to={plan.name === 'Free' ? '/signup' : '/signup'}>
                  <Button 
                    className={`w-full ${
                      plan.popular 
                        ? 'bg-gradient-primary hover:shadow-glow' 
                        : 'bg-gradient-secondary'
                    } transition-all duration-300`}
                    size="lg"
                  >
                    {plan.cta}
                  </Button>
                </Link>

                {plan.name === 'Pro' && (
                  <p className="text-xs text-muted-foreground text-center">
                    7-day free trial • No credit card required
                  </p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="mt-20">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <div className="grid gap-6 max-w-3xl mx-auto">
            <Card className="bg-card/50 backdrop-blur-sm border-border/50">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">Can I upgrade or downgrade my plan anytime?</h3>
                <p className="text-muted-foreground">
                  Yes! You can upgrade to Pro or downgrade to Free at any time. 
                  Changes take effect immediately, and you'll only be charged for what you use.
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-card/50 backdrop-blur-sm border-border/50">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">What happens if I exceed the free plan limits?</h3>
                <p className="text-muted-foreground">
                  Free users are limited to 3 generations per day. Once you reach this limit, 
                  you'll need to wait until the next day or upgrade to Pro for unlimited access.
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-card/50 backdrop-blur-sm border-border/50">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">Is there a free trial for the Pro plan?</h3>
                <p className="text-muted-foreground">
                  Yes! New users get a 7-day free trial of the Pro plan. 
                  No credit card required to start your trial.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <h2 className="text-2xl font-bold mb-4">Ready to start creating?</h2>
          <p className="text-muted-foreground mb-8">
            Join thousands of creators using AI to generate amazing content
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/signup">
              <Button size="lg" className="bg-gradient-primary hover:shadow-glow transition-all duration-300">
                Start Free Today
              </Button>
            </Link>
            <Link to="/">
              <Button variant="outline" size="lg" className="border-border/50 hover:border-primary/50">
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;