import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

export interface ConnectionItem {
  emoji: string;
  title: string;
  description: string;
  key: string;
}

interface Props {
  item: ConnectionItem;
  connected: boolean;
  onConnect: (key: string) => void;
}

const ConnectionCard = ({ item, connected, onConnect }: Props) => {
  const [connecting, setConnecting] = useState(false);

  const handleConnect = () => {
    if (connected || connecting) return;
    setConnecting(true);
    setTimeout(() => { setConnecting(false); onConnect(item.key); }, 1200);
  };

  return (
    <Card className={`transition-all ${connected ? "border-primary/50 bg-primary/5" : "hover:border-primary/30"}`}>
      <CardContent className="flex flex-col items-center gap-3 p-6 text-center">
        <span className="text-5xl">{item.emoji}</span>
        <h3 className="text-lg font-bold">{item.title}</h3>
        <p className="text-sm text-muted-foreground leading-snug">{item.description}</p>
        <Button variant={connected ? "default" : "outline"} className="w-full gap-2 mt-1"
          onClick={handleConnect} disabled={connecting || connected}>
          {connecting && <Loader2 className="h-4 w-4 animate-spin" />}
          {connecting ? "Connecting…" : connected ? "✓ Connected" : "Connect"}
        </Button>
      </CardContent>
    </Card>
  );
};

export default ConnectionCard;
