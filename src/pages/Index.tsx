import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Index = () => {
  const navigate = useNavigate();
  const [showDemoSelector, setShowDemoSelector] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="mx-auto max-w-4xl px-4 py-20 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-6 leading-tight">
            AI-Powered Common App<br />for Lending
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10">
            One application. Multiple lenders. Smarter decisions with your real financial data.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-base px-8 h-12" onClick={() => navigate("/student/start")}>
              I'm a student →
            </Button>
            <Button size="lg" className="text-base px-8 h-12" onClick={() => navigate("/business/start")}>
              I run a business →
            </Button>
          </div>
        </section>

        {/* Problem → Solution */}
        <section className="mx-auto max-w-5xl px-4 pb-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Problem */}
            <div>
              <h2 className="text-2xl font-bold mb-6">The lending problem</h2>
              <div className="space-y-6">
                {[
                  { label: "Students", text: "$80k+ MBA debt, scattered fellowships, no-cosigner barriers." },
                  { label: "SMBs", text: "Weeks of bank paperwork, thin files despite strong revenue." },
                  { label: "Banks", text: "Manual underwriting, fragmented data, slow decisions." },
                ].map((item) => (
                  <div key={item.label} className="rounded-lg border border-border bg-card p-5">
                    <p className="font-semibold mb-1">{item.label}</p>
                    <p className="text-sm text-muted-foreground">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Solution */}
            <div>
              <h2 className="text-2xl font-bold mb-6">Sero solves this</h2>
              <div className="space-y-6">
                {[
                  "One guided application that works for students and small businesses.",
                  "Consented data connections that generate explainable Habit Scores.",
                  "Multiple lender offers and school fellowship matches, side by side.",
                ].map((text, i) => (
                  <div key={i} className="rounded-lg border border-border bg-card p-5">
                    <p className="text-sm text-muted-foreground">{text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Live Preview */}
        <section className="border-t border-border bg-muted/30">
          <div className="mx-auto max-w-5xl px-4 py-24">
            <h2 className="text-2xl font-bold text-center mb-10">See it work</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {[
                "MIT Sloan application with fellowship matches",
                "Data connections powering an 84/100 Habit Score",
                "Three lender offers compared side by side",
              ].map((alt, i) => (
                <div
                  key={i}
                  className="aspect-[4/3] rounded-lg border border-border bg-card flex items-center justify-center"
                >
                  <p className="text-xs text-muted-foreground text-center px-4">{alt}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="mx-auto max-w-4xl px-4 py-24 text-center">
          <h2 className="text-2xl font-bold mb-6">Ready to try?</h2>
          <div className="relative inline-block">
            <Button size="lg" className="text-base px-8 h-12" onClick={() => setShowDemoSelector((v) => !v)}>
              Start Demo
            </Button>
            {showDemoSelector && (
              <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 rounded-lg border border-border bg-card p-3 shadow-md z-10 min-w-[220px] space-y-1">
                {[
                  { label: "Student application", path: "/student/start" },
                  { label: "Business application", path: "/business/start" },
                ].map((opt) => (
                  <button
                    key={opt.path}
                    className="w-full text-left rounded-md px-3 py-2 text-sm hover:bg-accent transition-colors"
                    onClick={() => navigate(opt.path)}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
