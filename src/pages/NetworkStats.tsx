import { Activity, Box, Shield, Cpu, HardDrive, Users } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const stats = [
  { label: "Total Blocks", value: "1,842", icon: Box },
  { label: "Transactions", value: "18,293", icon: Activity },
  { label: "Active Nodes", value: "127", icon: Cpu },
  { label: "IPFS Files", value: "4,912", icon: HardDrive },
  { label: "Verified Cases", value: "9,234", icon: Shield },
  { label: "Active Users", value: "50,000+", icon: Users },
];

const recentTx = [
  { hash: "0x7f3a...e9b2", type: "Complaint Filed", time: "12s ago", block: "1842" },
  { hash: "0xa1c4...3d7f", type: "Evidence Uploaded", time: "45s ago", block: "1841" },
  { hash: "0x9e2b...f1a8", type: "Case Resolved", time: "2m ago", block: "1840" },
  { hash: "0xd4f7...8c3e", type: "Identity Verified", time: "5m ago", block: "1839" },
  { hash: "0xb6e1...2a9d", type: "Complaint Filed", time: "8m ago", block: "1838" },
];

const NetworkStats = () => (
  <div className="min-h-screen">
    <Navbar />
    <section className="pt-28 pb-20">
      <div className="container">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold mb-2">Network <span className="text-primary">Stats</span></h1>
          <p className="text-muted-foreground">Real-time blockchain network metrics</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-12">
          {stats.map((s) => (
            <div key={s.label} className="border border-border rounded-xl bg-card p-5 hover:border-primary/30 transition-colors">
              <s.icon className="h-5 w-5 text-primary mb-3" />
              <div className="text-2xl font-bold text-primary text-glow">{s.value}</div>
              <div className="text-xs text-muted-foreground mt-1">{s.label}</div>
            </div>
          ))}
        </div>

        <div>
          <h2 className="text-xl font-bold mb-4">Recent Transactions</h2>
          <div className="border border-border rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-secondary/30">
                    <th className="text-left p-4 text-muted-foreground font-medium">Tx Hash</th>
                    <th className="text-left p-4 text-muted-foreground font-medium">Type</th>
                    <th className="text-left p-4 text-muted-foreground font-medium">Block</th>
                    <th className="text-left p-4 text-muted-foreground font-medium">Time</th>
                  </tr>
                </thead>
                <tbody>
                  {recentTx.map((tx) => (
                    <tr key={tx.hash} className="border-b border-border/50 hover:bg-secondary/20 transition-colors">
                      <td className="p-4 font-mono text-primary">{tx.hash}</td>
                      <td className="p-4">{tx.type}</td>
                      <td className="p-4 font-mono text-muted-foreground">#{tx.block}</td>
                      <td className="p-4 text-muted-foreground">{tx.time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
    <Footer />
  </div>
);

export default NetworkStats;
