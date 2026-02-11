import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const BusinessStart = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 mx-auto max-w-3xl px-4 py-16">
        <h1 className="text-3xl font-bold text-center mb-2">Business Financing</h1>
        <p className="text-muted-foreground text-center mb-10">AI-powered lending for small and growing businesses.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <Card className="cursor-pointer hover:border-primary/50 transition-all" onClick={() => navigate("/business/apply")}>
            <CardContent className="p-8 text-center">
              <span className="text-4xl mb-4 block">💰</span>
              <h2 className="text-xl font-bold mb-2">Working capital</h2>
              <p className="text-sm text-muted-foreground mb-4">Fund operations, payroll, or expansion.</p>
              <Button className="w-full">Start application →</Button>
            </CardContent>
          </Card>
          <Card className="cursor-pointer hover:border-primary/50 transition-all" onClick={() => navigate("/business/apply")}>
            <CardContent className="p-8 text-center">
              <span className="text-4xl mb-4 block">🔧</span>
              <h2 className="text-xl font-bold mb-2">Equipment financing</h2>
              <p className="text-sm text-muted-foreground mb-4">Finance equipment and machinery purchases.</p>
              <Button variant="outline" className="w-full">Start application →</Button>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BusinessStart;
