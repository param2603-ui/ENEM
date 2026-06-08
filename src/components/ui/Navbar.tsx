import { useState } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

export default function Navbar({ isVisible = true, mobileMenuOpen, toggleMobileMenu }: { isVisible?: boolean; mobileMenuOpen?: boolean; toggleMobileMenu?: () => void }) {
  const [internalMobileMenuOpen, setInternalMobileMenuOpen] = useState(false);

  const isMobileMenuOpen = mobileMenuOpen !== undefined ? mobileMenuOpen : internalMobileMenuOpen;
  const handleToggle = toggleMobileMenu || (() => setInternalMobileMenuOpen(!internalMobileMenuOpen));

  const handleLinkClick = () => {
    if (isMobileMenuOpen && handleToggle) {
      handleToggle();
    }
  };

  return (
    <nav className={cn(
      "fixed top-0 left-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border/30 transition-all duration-300",
      isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full pointer-events-none"
    )}>
      <div className="flex items-center justify-between px-4 py-4 sm:px-4 sm:py-4">
        <div className="flex items-center gap-3">
          <Link to="/" onClick={handleLinkClick}>
            <img
              src="/logo.png"
              alt="ENEM Corporation"
              className="h-16 w-auto sm:h-20 object-contain scale-[1.15] origin-left"
            />
          </Link>
          <Link to="/" onClick={handleLinkClick}>
            <span className="font-semibold text-foreground text-base sm:text-lg">ENEM Corporation</span>
          </Link>
        </div>

        <div className="hidden sm:flex items-center gap-6 text-base text-muted-foreground">
          <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
          <Link to="/about" className="hover:text-foreground transition-colors">About</Link>
          <Link to="/services" className="hover:text-foreground transition-colors">Products</Link>
          <Link to="/contact" className="hover:text-foreground transition-colors">Contact</Link>
          <a href="mailto:Info@enemcorporation.com" className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors">Get a Quote</a>
        </div>

        <button
          type="button"
          onClick={handleToggle}
          className="flex sm:hidden items-center justify-center rounded-md p-2 text-muted-foreground hover:text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
          aria-expanded={isMobileMenuOpen}
          aria-label="Toggle navigation menu"
        >
          <div className="space-y-1">
            <span className="block h-0.5 w-6 bg-current" />
            <span className="block h-0.5 w-6 bg-current" />
            <span className="block h-0.5 w-6 bg-current" />
          </div>
        </button>
      </div>

      <div className={cn(
        "sm:hidden overflow-hidden transition-all duration-300",
        isMobileMenuOpen ? "max-h-[400px]" : "max-h-0"
      )}>
        <div className="flex flex-col gap-2 px-4 pb-4 pt-2 text-base text-muted-foreground bg-background/95 border-t border-border/30 backdrop-blur-md">
          <Link to="/" onClick={handleLinkClick} className="block rounded-md px-3 py-2 hover:bg-background/80">Home</Link>
          <Link to="/about" onClick={handleLinkClick} className="block rounded-md px-3 py-2 hover:bg-background/80">About</Link>
          <Link to="/services" onClick={handleLinkClick} className="block rounded-md px-3 py-2 hover:bg-background/80">Products</Link>
          <Link to="/contact" onClick={handleLinkClick} className="block rounded-md px-3 py-2 hover:bg-background/80">Contact</Link>
        </div>
      </div>
    </nav>
  );
}
