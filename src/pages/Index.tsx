import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Shield, Lock, Eye, Bot, ChevronDown, ChevronUp, FileText, Users, Globe } from "lucide-react";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const features = [
  { icon: Lock, title: "Anonymous Reporting", desc: "Submit complaints without revealing your identity. Blockchain ensures immutability." },
  { icon: Shield, title: "Blockchain Verified", desc: "Every complaint is stored on Ethereum for tamper-proof records." },
  { icon: Bot, title: "AI-Powered Assistance", desc: "Multilingual chatbot guides you through filing complaints in your language." },
  { icon: Eye, title: "Real-Time Tracking", desc: "Track your case status in real-time without compromising privacy." },
  { icon: FileText, title: "Secure Evidence", desc: "Upload evidence via IPFS for decentralized, tamper-proof storage." },
  { icon: Users, title: "Police Dashboard", desc: "Law enforcement can investigate cases with AI-powered triage and analytics." },
];

const faqs = [
  { q: "How does anonymous reporting work?", a: "CyberSentinel uses Decentralized Identity (DID) to let you report without revealing personal information. Your identity stays hidden until you consent to share it." },
  { q: "Is my data truly secure?", a: "Yes. Complaints are stored on the Ethereum blockchain, and evidence is uploaded to IPFS — both are decentralized and tamper-proof." },
  { q: "What languages are supported?", a: "Our AI chatbot supports Hindi, Marathi, Bengali, English and more, making it accessible across India." },
  { q: "How can police access cases?", a: "Authorized officers access the Investigator Dashboard with role-based authentication. Victim identity remains hidden until consent is given." },
];

const FAQ = ({ q, a }: { q: string; a: string }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-border rounded-lg overflow-hidden">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between p-4 text-left hover:bg-secondary/50 transition-colors">
        <span className="font-medium text-sm">{q}</span>
        {open ? <ChevronUp className="h-4 w-4 text-muted-foreground" /> : <ChevronDown className="h-4 w-4 text-muted-foreground" />}
      </button>
      {open && <div className="px-4 pb-4 text-sm text-muted-foreground">{a}</div>}
    </div>
  );
};

const Index = () => (
  <div className="min-h-screen">
    <Navbar />

    {/* Hero */}
    <section className="relative pt-32 pb-20 md:pt-44 md:pb-32 overflow-hidden">
      <div className="absolute inset-0 bg-grid gradient-radial" />
      <div className="container relative text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-1.5 text-xs text-muted-foreground mb-6">
          <span className="h-1.5 w-1.5 rounded-full bg-cyber-green animate-pulse-glow" />
          Powered by Ethereum & IPFS
        </div>
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-tight mb-6">
          Justice Secured by{" "}
          <span className="text-primary text-glow">Decentralization.</span>
        </h1>
        <p className="text-muted-foreground text-lg md:text-xl mb-10 max-w-2xl mx-auto">
          Report cybercrimes anonymously, securely, and in your language. Blockchain-verified, AI-assisted, privacy-first.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/report">
            <Button size="lg" className="glow-blue text-base px-8">Report a Crime</Button>
          </Link>
          <Link to="/track">
            <Button size="lg" variant="outline" className="text-base px-8 border-border">Track Case</Button>
          </Link>
        </div>
      </div>
    </section>

    {/* Features */}
    <section className="py-20 border-t border-border/50">
      <div className="container">
        <div className="text-center mb-14">
          <h2 className="text-sm font-semibold text-primary uppercase tracking-wider mb-2">Key Features</h2>
          <p className="text-2xl md:text-3xl font-bold">Our Solution</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f) => (
            <div key={f.title} className="group p-6 rounded-xl border border-border bg-card hover:border-primary/30 hover:glow-blue-sm transition-all duration-300">
              <f.icon className="h-8 w-8 text-primary mb-4" />
              <h3 className="font-semibold mb-2">{f.title}</h3>
              <p className="text-sm text-muted-foreground">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Stats */}
    <section className="py-16 border-t border-border/50">
      <div className="container">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { label: "Cases Reported", value: "12,847" },
            { label: "Cases Resolved", value: "9,234" },
            { label: "Active Officers", value: "1,502" },
            { label: "States Covered", value: "28" },
          ].map((s) => (
            <div key={s.label}>
              <div className="text-2xl md:text-3xl font-bold text-primary text-glow">{s.value}</div>
              <div className="text-sm text-muted-foreground mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* FAQ */}
    <section className="py-20 border-t border-border/50">
      <div className="container max-w-2xl">
        <h2 className="text-2xl font-bold text-center mb-10">Frequently Asked Questions</h2>
        <div className="space-y-3">
          {faqs.map((f) => <FAQ key={f.q} {...f} />)}
        </div>
      </div>
    </section>

    <Footer />
  </div>
);

export default Index;
