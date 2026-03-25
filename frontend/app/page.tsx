import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 selection:bg-blue-100">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur-md">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="text-xl font-bold tracking-tighter text-blue-600">GOLF CHARITY</div>
          <div className="space-x-4">
            <Link href="/login">
              <Button variant="ghost">Log in</Button>
            </Link>
            <Link href="/signup">
              <Button className="bg-blue-600 hover:bg-blue-700">Join Now</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-24 text-center">
        <h1 className="mb-6 text-5xl font-extrabold tracking-tight lg:text-6xl">
          Your Swing. <span className="text-blue-600">Their Future.</span>
        </h1>
        <p className="mx-auto mb-10 max-w-2xl text-lg text-slate-600">
          The premium subscription platform where your golf performance fuels global change. 
          Enter your scores, win monthly jackpots, and support world-class charities[cite: 7, 11].
        </p>
        <div className="flex justify-center gap-4">
          <Button size="lg" className="h-12 px-8 text-lg">Get Started</Button>
          <Button size="lg" variant="outline" className="h-12 px-8 text-lg">How it Works</Button>
        </div>
      </section>

      {/* Prize Tier Preview [cite: 70] */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-3xl font-bold">Monthly Prize Pools</h2>
          <div className="grid gap-8 md:grid-cols-3">
            {[ 
              { match: "5-Number", pool: "40%", label: "Jackpot" },
              { match: "4-Number", pool: "35%", label: "Winner" },
              { match: "3-Number", pool: "25%", label: "Winner" }
            ].map((tier) => (
              <Card key={tier.match} className="p-8 text-center shadow-sm border-slate-100">
                <div className="text-blue-600 font-semibold mb-2">{tier.match} Match</div>
                <div className="text-4xl font-bold mb-4">{tier.pool}</div>
                <div className="text-sm text-slate-500">Of the total prize pool [cite: 70]</div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}