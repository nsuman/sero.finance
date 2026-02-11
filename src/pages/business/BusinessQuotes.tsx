import { useNavigate } from "react-router-dom";
import { useApp } from "@/contexts/AppContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const offers = [
  {
    id: "1", lender: "OnDeck", rate: "7.95%", monthly: "$1,518",
    revenuePercent: "3.2%", highlight: true, features: ["Fast funding", "Flexible terms"],
    reason: "Your 12% growth + fast cash conversion = strong profile",
  },
  {
    id: "2", lender: "Fundbox", rate: "9.2%", monthly: "Draw as needed",
    revenuePercent: "—", highlight: false, features: ["Line of credit", "No minimum draw"],
    reason: "",
  },
  {
    id: "3", lender: "BlueVine", rate: "8.5%", monthly: "$1,480",
    revenuePercent: "3.0%", highlight: false, features: ["Term loan", "No prepayment penalty"],
    reason: "",
  },
];

const BusinessQuotes = () => {
  const navigate = useNavigate();
  const { businessData } = useApp();

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 mx-auto max-w-5xl px-4 py-10 w-full">
        <h1 className="text-2xl font-bold mb-2">✅ 3 offers received</h1>
        <p className="text-muted-foreground mb-8">Based on your Business Health Score ({businessData.healthScore || 78}/100)</p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {offers.map(o => (
            <Card key={o.id} className={`transition-all ${o.highlight ? "border-primary ring-2 ring-primary/20" : "hover:border-primary/30"}`}>
              <CardContent className="p-6">
                {o.highlight && <span className="text-xs font-bold text-primary mb-2 block">⭐ Recommended</span>}
                <h3 className="font-bold text-lg mb-1">{o.lender}</h3>
                <p className="text-2xl font-bold text-primary mb-1">{o.rate}</p>
                <p className="text-sm text-muted-foreground mb-1">{o.monthly}/mo</p>
                {o.revenuePercent !== "—" && <p className="text-xs text-muted-foreground mb-3">{o.revenuePercent} of monthly revenue</p>}
                <div className="space-y-1 mb-3">
                  {o.features.map(f => <p key={f} className="text-xs text-muted-foreground">✓ {f}</p>)}
                </div>
                {o.reason && <p className="text-xs italic text-primary/80 mb-3">"{o.reason}"</p>}
                <Button className="w-full" variant={o.highlight ? "default" : "outline"}
                  onClick={() => navigate(`/business/application/${o.id}`)}>
                  View offer →
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BusinessQuotes;
