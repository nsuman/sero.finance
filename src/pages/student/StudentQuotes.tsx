import { useNavigate } from "react-router-dom";
import { useApp } from "@/contexts/AppContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const offers = [
  {
    id: "1", lender: "MIT Federal Credit Union", rate: "5.24%", monthly: "$1,462",
    total: "$175k", highlight: true, features: ["No cosigner", "9mo grace period"],
    reason: "Your 95% on-time payments qualified you for best tier",
  },
  {
    id: "2", lender: "Earnest", rate: "5.80%", monthly: "$1,487",
    total: "$178k", highlight: false, features: ["No fees", "Flexible terms"],
    reason: "",
  },
  {
    id: "3", lender: "SoFi", rate: "5.95%", monthly: "$1,495",
    total: "$179k", highlight: false, features: ["Career coaching included"],
    reason: "",
  },
];

const StudentQuotes = () => {
  const navigate = useNavigate();
  const { studentData } = useApp();
  const [loanAdjust, setLoanAdjust] = useState([studentData.loanNeeded || 195000]);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 mx-auto max-w-5xl px-4 py-10 w-full">
        <h1 className="text-2xl font-bold mb-2">✅ 3 offers received</h1>
        <p className="text-muted-foreground mb-8">Based on your Financial Habit Score ({studentData.habitScore || 84}/100)</p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {offers.map(o => (
            <Card key={o.id} className={`transition-all ${o.highlight ? "border-primary ring-2 ring-primary/20" : "hover:border-primary/30"}`}>
              <CardContent className="p-6">
                {o.highlight && <span className="text-xs font-bold text-primary mb-2 block">⭐ Best overall</span>}
                <h3 className="font-bold text-lg mb-1">{o.lender}</h3>
                <p className="text-2xl font-bold text-primary mb-1">{o.rate}</p>
                <p className="text-sm text-muted-foreground mb-3">{o.monthly}/mo · {o.total} total</p>
                <div className="space-y-1 mb-3">
                  {o.features.map(f => <p key={f} className="text-xs text-muted-foreground">✓ {f}</p>)}
                </div>
                {o.reason && <p className="text-xs italic text-primary/80 mb-3">"{o.reason}"</p>}
                <Button className="w-full" variant={o.highlight ? "default" : "outline"}
                  onClick={() => navigate(`/student/application/${o.id}`)}>
                  View offer →
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* AI Coach sidebar */}
        <Card>
          <CardContent className="p-6">
            <h3 className="font-bold mb-3">💡 AI Coach</h3>
            <p className="text-sm text-muted-foreground mb-2">Borrowing $10k less saves ~$18k in interest</p>
            <p className="text-sm text-muted-foreground mb-4">Paying during school saves ~$1.8k</p>
            <Label className="text-xs">Adjust loan amount</Label>
            <Slider value={loanAdjust} onValueChange={setLoanAdjust} min={50000} max={300000} step={5000} className="mt-2" />
            <p className="text-sm font-medium mt-2">${loanAdjust[0].toLocaleString()}</p>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

const Label = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <span className={`text-sm font-medium ${className || ""}`}>{children}</span>
);

export default StudentQuotes;
