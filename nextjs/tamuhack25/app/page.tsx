import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { BarChart3, Heart, LineChart, Medal, Target, Trophy, Users } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b">
        <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Image 
              src="/Dex.png"
              alt="Gymdex logo" 
              width={36}
              height={36}
              className="text-primary"
            />
            <span className="font-bold text-xl">GymDex</span>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-sm font-medium hover:text-primary transition-colors">Features</a>
            <a href="#testimonials" className="text-sm font-medium hover:text-primary transition-colors">Testimonials</a>
            <a href="#pricing" className="text-sm font-medium hover:text-primary transition-colors">Pricing</a>
            <a href="#contact" className="text-sm font-medium hover:text-primary transition-colors">Contact</a>
          </div>
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <Button variant="ghost" className="hidden md:inline-flex">Log in</Button>
            <Button>Sign up</Button>
          </div>
        </nav>
      </header>

      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl font-bold mb-6 gradient-text">
            Level Up Your Fitness Journey
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Track your evolution, set achievement badges, and power up your strength with our comprehensive fitness tracking platform.
          </p>
          <div className="flex justify-center gap-4">
            <Button size="lg">Start Training</Button>
            <Button size="lg" variant="outline">Watch Demo</Button>
          </div>
          <div className="mt-16">
            <Image
              src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48"
              alt="Trainer Dashboard"
              width={1200}
              height={800}
              priority
              className="rounded-lg shadow-2xl mx-auto"
              unoptimized
            />
          </div>
        </div>
      </section>

      <section id="features" className="py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Everything you need to succeed</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Target className="h-8 w-8 text-primary" />}
              title="Achievement Badges"
              description="Set training milestones and earn badges as you level up your strength and skills."
            />
            <FeatureCard
              icon={<LineChart className="h-8 w-8 text-primary" />}
              title="Evolution Tracking"
              description="Monitor your power gains with dynamic stat charts and progression analytics."
            />
            <FeatureCard
              icon={<Heart className="h-8 w-8 text-primary" />}
              title="Vital Stats"
              description="Track your HP, stamina, and recovery with comprehensive health monitoring."
            />
            <FeatureCard
              icon={<Users className="h-8 w-8 text-primary" />}
              title="Training Partners"
              description="Team up with fellow trainers and share your fitness adventures together."
            />
            <FeatureCard
              icon={<Trophy className="h-8 w-8 text-primary" />}
              title="Gym Badges" 
              description="Collect badges as proof of your strength milestones and training achievements."
            />
            <FeatureCard
              icon={<BarChart3 className="h-8 w-8 text-primary" />}
              title="Battle Stats"
              description="Analyze your performance metrics with detailed training analytics."
            />
          </div>
        </div>
      </section>

      <section id="pricing" className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Simple, transparent pricing</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <PricingCard
              title="Rookie"
              price="Free"
              description="Start your training journey"
              features={[
                "Basic stat tracking",
                "Evolution monitoring",
                "Training community",
                "Mobile access"
              ]}
              buttonText="Begin Training"
              buttonVariant="outline"
            />
            <PricingCard
              title="Elite"
              price="$9.99"
              description="For serious trainers"
              features={[
                "All Rookie features",
                "Advanced battle stats",
                "Custom training plans",
                "Priority healing",
                "Nutrition log"
              ]}
              buttonText="Start Trial"
              buttonVariant="default"
            />
            <PricingCard
              title="Champion"
              price="$29.99"
              description="For gym leaders"
              features={[
                "All Elite features",
                "Team management",
                "Custom gym badges",
                "API access",
                "Elite support"
              ]}
              buttonText="Contact Us"
              buttonVariant="outline"
            />
          </div>
        </div>
      </section>

      <footer className="bg-secondary text-secondary-foreground py-6">
        <div className="text-center">
          <p>&copy; 2025 GymDex. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <Card className="p-6">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </Card>
  );
}

function PricingCard({
  title,
  price,
  description,
  features,
  buttonText,
  buttonVariant,
}: {
  title: string;
  price: string;
  description: string;
  features: string[];
  buttonText: string;
  buttonVariant: "outline" | "default";
}) {
  return (
    <Card className="p-8 transition-all duration-200 hover:ring-2 hover:ring-primary hover:shadow-lg">
      <h3 className="text-2xl font-bold">{title}</h3>
      <div className="mt-4 mb-2">
        <span className="text-4xl font-bold">{price}</span>
        {price !== "Free" && <span className="text-muted-foreground">/month</span>}
      </div>
      <p className="text-muted-foreground mb-6">{description}</p>
      <Button className="w-full mb-6" variant={buttonVariant}>
        {buttonText}
      </Button>
      <ul className="space-y-3">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center">
            <Medal className="h-5 w-5 text-primary mr-2" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
    </Card>
  );
}