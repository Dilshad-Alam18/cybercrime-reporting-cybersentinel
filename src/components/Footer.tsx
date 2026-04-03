import { Shield } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="border-t border-border/50 bg-background py-12">
    <div className="container">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-primary" />
          <span className="font-bold">Cyber<span className="text-primary">Sentinel</span></span>
        </div>
        <div className="flex gap-6 text-sm text-muted-foreground">
          <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
          <Link to="/report" className="hover:text-foreground transition-colors">Report</Link>
          <Link to="/track" className="hover:text-foreground transition-colors">Track</Link>
          <Link to="/network" className="hover:text-foreground transition-colors">Network</Link>
        </div>
        <p className="text-xs text-muted-foreground">© 2026 CyberSentinel. Decentralized & Secure.</p>
      </div>
    </div>
  </footer>
);

export default Footer;
