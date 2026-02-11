import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "@/contexts/AppContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import ConnectionCard, { ConnectionItem } from "@/components/ConnectionCard";
import ScoreReveal from "@/components/ScoreReveal";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const businessTypes = ["Restaurant", "E-commerce", "Retail", "SaaS", "Services", "Other"];
const loanPurposes = ["Working Capital", "Equipment", "Inventory", "Expansion", "Other"];

const businessConnections: ConnectionItem[] = [
  { emoji: "🏦", title: "Business Bank Account", description: "Business checking account", key: "bank" },
  { emoji: "🧾", title: "Accounting Software", description: "QuickBooks, Xero", key: "accounting" },
  { emoji: "🍽️", title: "Restaurant POS", description: "Toast, Square, Lightspeed", key: "pos" },
  { emoji: "🛒", title: "E-commerce", description: "Shopify, Stripe Dashboard", key: "ecommerce" },
  { emoji: "💳", title: "Business Credit Cards", description: "All business cards", key: "cards" },
  { emoji: "📊", title: "Payroll", description: "Gusto, ADP", key: "payroll" },
];

const healthScoreItems = [
  { emoji: "🏦", label: "Bank: Monthly cashflow +$6.2k (11/12 positive)", status: "good" as const },
  { emoji: "🧾", label: "QuickBooks: Revenue +12% YoY | Gross margin 64%", status: "good" as const },
  { emoji: "🍽️", label: "Toast POS: Cash conversion 22 days (vs industry 30)", status: "good" as const },
  { emoji: "🛒", label: "Shopify: Sales volatility low", status: "good" as const },
  { emoji: "💳", label: "Cards: Business utilization 18%", status: "good" as const },
  { emoji: "📊", label: "Gusto: Payroll stable", status: "good" as const },
];

const BusinessApply = () => {
  const navigate = useNavigate();
  const { businessData, setBusinessData, currentDemo } = useApp();
  const [step, setStep] = useState(1);
  const [voiceRecording, setVoiceRecording] = useState(false);

  const b = businessData;
  const update = (partial: Partial<typeof b>) => setBusinessData({ ...b, ...partial });
  const connectedCount = Object.values(b.connections).filter(Boolean).length;
  const freeCashFlow = b.monthlyRevenue - b.monthlyExpenses;

  const handleConnect = (key: string) => {
    const newConn = { ...b.connections, [key]: true };
    const count = Object.values(newConn).filter(Boolean).length;
    update({
      connections: newConn,
      healthScore: count >= 2 ? (currentDemo === "lisa" ? 75 : 78) : 0,
    });
  };

  const handleVoice = () => {
    setVoiceRecording(true);
    setTimeout(() => {
      setVoiceRecording(false);
      update({
        annualRevenue: b.annualRevenue || 680000,
        monthlyRevenue: b.monthlyRevenue || 62000,
        monthlyExpenses: b.monthlyExpenses || 48000,
        healthScore: 78,
        connections: { ...b.connections, bank: true, accounting: true },
      });
    }, 3000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 mx-auto max-w-3xl px-4 py-10 w-full">
        {/* Progress */}
        <div className="flex items-center gap-2 mb-8">
          {[1,2,3,4].map(i => (
            <div key={i} className="flex-1 flex items-center gap-2">
              <div className={`h-2 flex-1 rounded-full ${i <= step ? "bg-primary" : "bg-muted"}`} />
              <span className={`text-xs font-medium ${i === step ? "text-primary" : "text-muted-foreground"}`}>{i}/4</span>
            </div>
          ))}
        </div>

        {/* Step 1: Business Basics */}
        {step === 1 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Business Basics</h2>
            <div className="grid gap-4">
              <div><Label>Business Name</Label><Input value={b.businessName} onChange={e => update({ businessName: e.target.value })} placeholder="e.g. Casa Carlos" /></div>
              <div>
                <Label>Business Type</Label>
                <Select value={b.businessType} onValueChange={v => update({ businessType: v })}>
                  <SelectTrigger><SelectValue placeholder="Select type" /></SelectTrigger>
                  <SelectContent>{businessTypes.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div><Label>Years in Business</Label><Input type="number" value={b.yearsInBusiness || ""} onChange={e => update({ yearsInBusiness: Number(e.target.value) })} /></div>
            </div>
            <Button onClick={() => setStep(2)} disabled={!b.businessName || !b.businessType}>Next →</Button>
          </div>
        )}

        {/* Step 2: Revenue & Loan */}
        {step === 2 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Revenue & Loan Details</h2>
            <div className="grid gap-4">
              <div><Label>Annual Revenue ($)</Label><Input type="number" value={b.annualRevenue || ""} onChange={e => update({ annualRevenue: Number(e.target.value) })} /></div>
              <div><Label>Monthly Revenue ($)</Label><Input type="number" value={b.monthlyRevenue || ""} onChange={e => update({ monthlyRevenue: Number(e.target.value) })} /></div>
              <div><Label>Monthly Expenses ($)</Label><Input type="number" value={b.monthlyExpenses || ""} onChange={e => update({ monthlyExpenses: Number(e.target.value) })} /></div>
            </div>
            {b.monthlyRevenue > 0 && (
              <Card className="border-primary/30 bg-primary/5">
                <CardContent className="p-4 text-center">
                  <p className="text-sm text-muted-foreground">Estimated free cash flow</p>
                  <p className={`text-3xl font-bold ${freeCashFlow >= 0 ? "text-primary" : "text-destructive"}`}>${freeCashFlow.toLocaleString()}/mo</p>
                </CardContent>
              </Card>
            )}
            <div className="grid gap-4">
              <div>
                <Label>Loan Purpose</Label>
                <Select value={b.loanPurpose} onValueChange={v => update({ loanPurpose: v })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>{loanPurposes.map(p => <SelectItem key={p} value={p}>{p}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div><Label>Loan Amount ($)</Label><Input type="number" value={b.loanAmount || ""} onChange={e => update({ loanAmount: Number(e.target.value) })} /></div>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setStep(1)}>← Back</Button>
              <Button onClick={() => setStep(3)}>Next →</Button>
            </div>
          </div>
        )}

        {/* Step 3: Data Connections */}
        {step === 3 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Connect Your Business Data</h2>
            <p className="text-muted-foreground">Build your Business Health Score by connecting data sources.</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {businessConnections.map(item => (
                <ConnectionCard key={item.key} item={item} connected={!!b.connections[item.key]} onConnect={handleConnect} />
              ))}
            </div>

            <ScoreReveal
              title="BUSINESS HEALTH SCORE"
              score={b.healthScore || 78}
              items={healthScoreItems}
              visible={connectedCount >= 2}
            />

            {/* Voice option */}
            <Card className="border-dashed">
              <CardContent className="p-4 text-center">
                <Button variant="outline" onClick={handleVoice} disabled={voiceRecording} className="gap-2">
                  🎤 {voiceRecording ? "Recording… (2 min)" : "Quick voice survey (2 minutes)"}
                </Button>
                <p className="text-xs text-muted-foreground mt-2">Tell us about your revenue, expenses, and cash flow</p>
              </CardContent>
            </Card>

            {/* Upload option */}
            <div>
              <p className="text-sm text-muted-foreground mb-3 font-medium">OR upload financial statements (slower but works)</p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {["📊 P&L Statement", "💰 Balance Sheet", "🏦 Bank Statements (3 months)"].map(label => (
                  <Button key={label} variant="outline" className="h-auto py-3 text-xs">{label}</Button>
                ))}
              </div>
            </div>

            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setStep(2)}>← Back</Button>
              <Button onClick={() => setStep(4)}>Next →</Button>
            </div>
          </div>
        )}

        {/* Step 4: Review */}
        {step === 4 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Review & Submit</h2>
            <Card>
              <CardContent className="p-6 space-y-3">
                <div className="flex justify-between"><span className="text-muted-foreground">Business</span><span className="font-medium">{b.businessName} ({b.businessType})</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Loan amount</span><span className="font-medium">${(b.loanAmount).toLocaleString()}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Monthly revenue</span><span className="font-medium">${b.monthlyRevenue.toLocaleString()}</span></div>
                {b.healthScore > 0 && <div className="flex justify-between"><span className="text-muted-foreground">Business Health Score</span><span className="font-bold text-primary">{b.healthScore}/100</span></div>}
              </CardContent>
            </Card>
            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setStep(3)}>← Back</Button>
              <Button onClick={() => navigate("/business/quotes")}>Submit & See Offers →</Button>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default BusinessApply;
