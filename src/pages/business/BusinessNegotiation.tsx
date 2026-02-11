import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const initialMessages = [
  { from: "lender", text: "We're offering 7.95% based on your revenue growth and Business Health Score of 78." },
  { from: "sero", text: "BlueVine offers 8.5% with no prepayment penalty. Can you match?" },
  { from: "lender", text: "We can waive the origination fee to keep you competitive." },
  { from: "sero", text: "That saves $1.2k upfront. Good deal for a 12-month term. Recommended ✓" },
];

const BusinessNegotiation = () => {
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (!input.trim()) return;
    setMessages(prev => [...prev, { from: "user", text: input }]);
    setInput("");
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 mx-auto max-w-5xl px-4 py-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          <div className="lg:col-span-3 space-y-4">
            <h1 className="text-2xl font-bold">OnDeck Offer</h1>
            <Card>
              <CardContent className="p-6 space-y-3">
                <div className="flex justify-between"><span className="text-muted-foreground">Amount</span><span className="font-bold">$120,000</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Rate</span><span className="font-bold text-primary">7.95%</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Monthly payment</span><span className="font-bold">$1,518</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">% of revenue</span><span className="font-bold">3.2%</span></div>
              </CardContent>
            </Card>
            <Button size="lg" className="w-full">Accept Offer</Button>
          </div>
          <div className="lg:col-span-2">
            <Card className="h-full flex flex-col">
              <CardContent className="p-4 flex-1 flex flex-col">
                <h3 className="font-bold mb-3 text-sm">Negotiation Chat</h3>
                <div className="flex-1 space-y-3 overflow-y-auto max-h-[400px] mb-4">
                  {messages.map((m, i) => (
                    <div key={i} className={`text-sm p-3 rounded-lg ${
                      m.from === "user" ? "bg-primary text-primary-foreground ml-8" :
                      m.from === "sero" ? "bg-muted ml-4 mr-4 border border-primary/20" :
                      "bg-muted mr-8"
                    }`}>
                      <span className="text-xs font-bold block mb-1">
                        {m.from === "user" ? "You" : m.from === "sero" ? "Sero AI" : "Lender"}
                      </span>
                      {m.text}
                    </div>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Input placeholder="Type a message…" value={input} onChange={e => setInput(e.target.value)}
                    onKeyDown={e => e.key === "Enter" && sendMessage()} />
                  <Button onClick={sendMessage} size="sm">Send</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BusinessNegotiation;
