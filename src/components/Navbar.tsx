import { Link, useLocation } from "react-router-dom";
import { Shield, Menu, X, LogOut, User } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";

const Navbar = () => {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, hasRole, signOut } = useAuth();

  const navItems = [
    { label: "Home", path: "/" },
    { label: "Report Crime", path: "/report" },
    { label: "Track Case", path: "/track" },
    { label: "Network", path: "/network" },
    ...(hasRole("investigator") || hasRole("admin")
      ? [{ label: "Investigator", path: "/investigator" }]
      : []),
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <Shield className="h-7 w-7 text-primary" />
          <span className="text-lg font-bold tracking-tight">
            Cyber<span className="text-primary">Sentinel</span>
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                location.pathname === item.path
                  ? "text-primary bg-primary/10"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <>
              <span className="text-xs text-muted-foreground flex items-center gap-1.5">
                <User className="h-3.5 w-3.5" />
                {user.email}
              </span>
              <Button size="sm" variant="outline" onClick={signOut}>
                <LogOut className="h-4 w-4 mr-1" /> Sign Out
              </Button>
            </>
          ) : (
            <>
              <Link to="/signin">
                <Button size="sm" variant="outline">Sign In</Button>
              </Link>
              <Link to="/report">
                <Button size="sm" className="glow-blue-sm">Report Crime</Button>
              </Link>
            </>
          )}
        </div>

        <button className="md:hidden text-foreground" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-border bg-background/95 backdrop-blur-xl">
          <div className="container py-4 flex flex-col gap-2">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMobileOpen(false)}
                className={`px-4 py-3 rounded-md text-sm font-medium ${
                  location.pathname === item.path
                    ? "text-primary bg-primary/10"
                    : "text-muted-foreground"
                }`}
              >
                {item.label}
              </Link>
            ))}
            <div className="border-t border-border mt-2 pt-2">
              {user ? (
                <>
                  <p className="px-4 py-2 text-xs text-muted-foreground">{user.email}</p>
                  <button onClick={() => { signOut(); setMobileOpen(false); }} className="px-4 py-3 text-sm text-destructive font-medium w-full text-left">
                    Sign Out
                  </button>
                </>
              ) : (
                <Link to="/signin" onClick={() => setMobileOpen(false)} className="px-4 py-3 text-sm text-primary font-medium block">
                  Sign In
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
