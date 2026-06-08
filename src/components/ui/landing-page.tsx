import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import Globe from "@/components/ui/Globe";
import SpaceBackground from "@/components/ui/space-background";
import Navbar from "@/components/ui/Navbar";
import { cn } from "@/lib/utils";

// Reusable ScrollGlobe component following shadcn/ui patterns
interface ScrollGlobeProps {
  sections: {
    id: string;
    badge?: string;
    title: string;
    subtitle?: string;
    description: string | string[];
    align?: 'left' | 'center' | 'right';
    features?: { title: string; description: string }[];
    actions?: { label: string; variant: 'primary' | 'secondary'; onClick?: () => void }[];
  }[];
  globeConfig?: {
    positions: {
      top: string;
      left: string;
      scale: number;
    }[];
  };
  className?: string;
}

const defaultGlobeConfig = {
  positions: [
    { top: "50%", left: "75%", scale: 1.4 },  // Hero: Right side, balanced
    { top: "25%", left: "50%", scale: 0.9 },  // Innovation: Top side, subtle
    { top: "15%", left: "90%", scale: 2 },  // Discovery: Left side, medium
    { top: "50%", left: "50%", scale: 1.8 },  // Future: Center, large backdrop
  ]
};

// Parse percentage string to number
const parsePercent = (str: string): number => parseFloat(str.replace('%', ''));

function ScrollGlobe({ sections, globeConfig = defaultGlobeConfig, className }: ScrollGlobeProps) {
  const [activeSection, setActiveSection] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [globeTransform, setGlobeTransform] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);
  const animationFrameId = useRef<number | null>(null);
  const navLabelTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const toggleMobileMenu = () => setMobileMenuOpen((prev) => !prev);
  
  // Pre-calculate positions for performance
  const calculatedPositions = useMemo(() => {
    return globeConfig.positions.map(pos => ({
      top: parsePercent(pos.top),
      left: parsePercent(pos.left),
      scale: pos.scale
    }));
  }, [globeConfig.positions]);

  const handleActionClick = (sectionId: string, action: { label: string; variant: 'primary' | 'secondary'; onClick?: () => void }) => {
    if (sectionId === 'contact' && action.label === 'Send Enquiry') {
      setIsFormOpen(true);
      return;
    }

    action.onClick?.();
  };

  // Simple, direct scroll tracking
  const updateScrollPosition = useCallback(() => {
    const scrollTop = window.pageYOffset;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = Math.min(Math.max(scrollTop / docHeight, 0), 1);
    
    setScrollProgress(progress);

    // Simple section detection
    const viewportCenter = window.innerHeight / 2;
    let newActiveSection = 0;
    let minDistance = Infinity;

    sectionRefs.current.forEach((ref, index) => {
      if (ref) {
        const rect = ref.getBoundingClientRect();
        const sectionCenter = rect.top + rect.height / 2;
        const distance = Math.abs(sectionCenter - viewportCenter);
        
        if (distance < minDistance) {
          minDistance = distance;
          newActiveSection = index;
        }
      }
    });

    // Direct position update - no interpolation
    const currentPos = calculatedPositions[newActiveSection];
    const transform = `translate3d(${currentPos.left}vw, ${currentPos.top}vh, 0) translate3d(-50%, -50%, 0) scale3d(${currentPos.scale}, ${currentPos.scale}, 1)`;
    
    setGlobeTransform(transform);

    setActiveSection(newActiveSection);
  }, [calculatedPositions]);

  // Throttled scroll handler with RAF
  useEffect(() => {
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        animationFrameId.current = requestAnimationFrame(() => {
          updateScrollPosition();
          ticking = false;
        });
        ticking = true;
      }
    };

    // Use passive listeners and immediate execution
    window.addEventListener('scroll', handleScroll, { passive: true });
    // eslint-disable-next-line react-hooks/set-state-in-effect
    updateScrollPosition(); // Initial call
    const timeout = navLabelTimeoutRef.current;
    const frameId = animationFrameId.current;
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (frameId !== null) {
        cancelAnimationFrame(frameId);
      }
      if (timeout !== null) {
        clearTimeout(timeout);
      }
    };
  }, [updateScrollPosition]);

  // Initial globe position
  useEffect(() => {
    const initialPos = calculatedPositions[0];
    const initialTransform = `translate3d(${initialPos.left}vw, ${initialPos.top}vh, 0) translate3d(-50%, -50%, 0) scale3d(${initialPos.scale}, ${initialPos.scale}, 1)`;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setGlobeTransform(initialTransform);
  }, [calculatedPositions]);

  return (
    <div 
      ref={containerRef}
      className={cn(
        "relative w-full max-w-screen overflow-x-hidden min-h-screen bg-background text-foreground",
        className
      )}
    >
      {/* Conditional Navbar - Hidden on hero, visible after scroll */}
      <Navbar isVisible={activeSection !== 0} mobileMenuOpen={mobileMenuOpen} toggleMobileMenu={toggleMobileMenu} />

      {/* Animated background */}
      <div className="relative z-0">
        <SpaceBackground className="fixed inset-0 z-0 pointer-events-none" />
      </div>

      {/* Hero Logo - moved out of z-0 wrapper to ensure visibility above sections */}
      <div className={cn(
        "fixed top-0 left-1/2 -translate-x-1/2 z-50 p-4 sm:p-6 md:p-8 transition-all duration-300",
        activeSection === 0 ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full pointer-events-none"
      )}>
        <img src="/logo.png" alt="ENEM Corporation" className="h-32 sm:h-40 md:h-52 lg:h-64 w-auto" />
      </div>

      {/* Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-0.5 bg-gradient-to-r from-border/20 via-border/40 to-border/20 z-50">
        <div 
          className="h-full bg-gradient-to-r from-primary via-blue-600 to-blue-900 will-change-transform shadow-sm"
          style={{ 
            transform: `scaleX(${scrollProgress})`,
            transformOrigin: 'left center',
            transition: 'transform 0.15s ease-out',
            filter: 'drop-shadow(0 0 2px rgba(59, 130, 246, 0.3))'
          }}
        />
      </div>

      {/* Enhanced Navigation with auto-hiding labels - Fully Responsive */}
      <div className="hidden sm:flex fixed right-2 sm:right-4 lg:right-8 top-1/2 -translate-y-1/2 z-40">
        <div className="space-y-3 sm:space-y-4 lg:space-y-6">
          {sections.map((section, index) => (
            <div key={index} className="relative group">
              {/* Auto-hiding section label - Always visible but with responsive sizing */}
              <div
                className={cn(
                  "nav-label absolute right-5 sm:right-6 lg:right-8 top-1/2 -translate-y-1/2",
                  "px-2 sm:px-3 lg:px-4 py-1 sm:py-1.5 lg:py-2 rounded-md sm:rounded-lg text-xs sm:text-sm font-medium whitespace-nowrap",
                  "bg-background/95 backdrop-blur-md border border-border/60 shadow-xl z-50",
                  activeSection === index ? "animate-fadeOut" : "opacity-0"
                )}
              >
                <div className="flex items-center gap-1 sm:gap-1.5 lg:gap-2">
                  <div className="w-1 sm:w-1.5 lg:w-2 h-1 sm:h-1.5 lg:h-2 rounded-full bg-primary animate-pulse" />
                  <span className="text-xs sm:text-sm lg:text-base">
                    {section.badge || `Section ${index + 1}`}
                  </span>
                </div>
              </div>

              <button
                onClick={() => {
                  sectionRefs.current[index]?.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'center'
                  });
                }}
                className={cn(
                  "relative w-2 h-2 sm:w-2.5 sm:h-2.5 lg:w-3 lg:h-3 rounded-full border-2 transition-all duration-300 hover:scale-125",
                  "before:absolute before:inset-0 before:rounded-full before:transition-all before:duration-300",
                  activeSection === index 
                    ? "bg-primary border-primary shadow-lg before:animate-ping before:bg-primary/20" 
                    : "bg-transparent border-muted-foreground/40 hover:border-primary/60 hover:bg-primary/10"
                )}
                aria-label={`Go to ${section.badge || `section ${index + 1}`}`}
              />
            </div>
          ))}
        </div>
        
        {/* Enhanced navigation line - Responsive */}
        <div className="absolute left-1/2 top-0 bottom-0 w-0.5 lg:w-px bg-gradient-to-b from-transparent via-primary/20 to-transparent -translate-x-1/2 -z-10" />
      </div>

      {/* Ultra-smooth Globe with responsive scaling */}
      <div
        className="fixed z-10 pointer-events-none will-change-transform transition-all duration-[1400ms] ease-[cubic-bezier(0.23,1,0.32,1)]"
        style={{
          transform: globeTransform,
          filter: `opacity(${activeSection === 3 ? 0.4 : 0.85})`,
        }}
      >
        <div className="scale-75 sm:scale-90 lg:scale-100">
          <Globe />
        </div>
      </div>

      {/* Dynamic sections - fully responsive */}
      {sections.map((section, index) => (
        <div key={section.id} className="w-full">
          <section
            id={section.id}
            ref={(el) => { sectionRefs.current[index] = el }}
            className={cn(
              "relative min-h-[70vh] sm:min-h-screen flex flex-col justify-center px-4 sm:px-6 md:px-8 lg:px-12 z-20 py-8 sm:py-12 lg:py-20",
              "w-full max-w-full overflow-hidden",
              section.align === 'center' && "items-center text-center",
              section.align === 'right' && "items-end text-right",
              section.align !== 'center' && section.align !== 'right' && "items-start text-left"
            )}
          >
          <div className={cn(
            "w-full max-w-sm sm:max-w-lg md:max-w-2xl lg:max-w-4xl xl:max-w-5xl will-change-transform transition-all duration-700",
            index === 0 ? "mt-24 sm:mt-32 md:mt-40 lg:mt-48" : "",
            "opacity-100 translate-y-0"
          )}>
            
            <h1 className={cn(
              "font-bold mb-4 sm:mb-8 leading-[1.1] tracking-tight",
              index === 0 
                ? "text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl" 
                : "text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl"
            )}>
              {section.subtitle ? (
                <div className="space-y-1 sm:space-y-2">
                  <div className="bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
                    {section.title}
                  </div>
                  <div className="text-muted-foreground/90 text-[0.6em] sm:text-[0.7em] font-medium tracking-wider">
                    {section.subtitle}
                  </div>
                </div>
              ) : (
                <div className="bg-gradient-to-r from-foreground via-foreground to-foreground/80 bg-clip-text text-transparent">
                  {section.title}
                </div>
              )}
            </h1>
            
            <div className={cn(
              "text-muted-foreground/80 leading-relaxed mb-8 sm:mb-10 text-base sm:text-lg lg:text-xl font-light",
              section.id === 'about' ? "max-w-full text-justify" : (section.align === 'center' ? "max-w-full mx-auto text-center" : "max-w-full")
            )}>
              {section.id === 'about' && (
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-3">About Us</h2>
              )}

              {Array.isArray(section.description)
                ? section.description.map((para, i) => (
                    <p key={i} className="mb-3 sm:mb-4">{para}</p>
                  ))
                : (
                    <p className="mb-3 sm:mb-4">{section.description}</p>
                  )
              }
              {index === 0 && (
                <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs sm:text-sm text-muted-foreground/60 mt-4 sm:mt-6">
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <div className="w-1 h-1 rounded-full bg-primary animate-pulse" />
                    <span>Interactive Experience</span>
                  </div>
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <div className="w-1 h-1 rounded-full bg-primary animate-pulse" style={{ animationDelay: '0.5s' }} />
                    <span>Scroll to Explore</span>
                  </div>
                </div>
              )}
            </div>

            {/* Enhanced Features - Responsive grid */}
            {section.features && section.id !== 'contact' && (
              <div className="grid gap-2 sm:gap-4 mb-6 sm:mb-10">
                {section.features.map((feature, featureIndex) => (
                  <div 
                    key={feature.title}
                    className={cn(
                      "group p-4 sm:p-5 lg:p-6 rounded-lg sm:rounded-xl border border-white/20 bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-all duration-300 hover:shadow-[0_0_15px_rgba(255,255,255,0.1)]",
                      "hover:border-white/40 hover:-translate-y-1"
                    )}
                    style={{ animationDelay: `${featureIndex * 0.1}s` }}
                  >
                    <div className="flex items-start gap-3 sm:gap-4">
                      <div className="w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-primary/60 mt-1.5 sm:mt-2 group-hover:bg-primary transition-colors flex-shrink-0" />
                      <div className="flex-1 space-y-1.5 sm:space-y-2 min-w-0">
                        <h3 className="font-semibold text-card-foreground text-base sm:text-lg">{feature.title}</h3>
                        <p className="text-muted-foreground/80 leading-relaxed text-sm sm:text-base">{feature.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {section.features && section.id === 'contact' && (
              <div className="grid gap-3 sm:grid-cols-2 justify-items-center mb-8">
                {section.features.map((feature) => (
                  <div key={feature.title} className="w-full max-w-sm rounded-3xl border border-white/20 bg-background/80 p-3 sm:p-4 shadow-[0_0_15px_rgba(255,255,255,0.05)] backdrop-blur-xl transition-transform duration-300 hover:-translate-y-0.5 hover:border-white/40">
                    <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/15 text-primary text-base sm:text-lg">
                      {(() => {
                        switch (feature.title) {
                          case 'Nitin Mavar':
                          case 'Shivam Acharya':
                            return (
                              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                                <circle cx="10" cy="7" r="4" />
                              </svg>
                            );
                          case 'Email':
                            return (
                              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                                <path d="M4 6h16M4 6l8 6 8-6M4 18h16V6" />
                              </svg>
                            );
                          case 'Location':
                            return (
                              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                                <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0Z" />
                                <circle cx="12" cy="10" r="3" />
                              </svg>
                            );
                          default:
                            return (
                              <div className="text-xs font-semibold">•</div>
                            );
                        }
                      })()}
                    </div>
                    <h3 className="text-base font-semibold text-foreground mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground/80 leading-relaxed text-sm">{feature.description}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Enhanced Actions - Responsive buttons */}
            {section.actions && (
              <div className={cn(
                "flex flex-col sm:flex-row flex-wrap gap-2 sm:gap-4",
                section.align === 'center' && "justify-center",
                section.align === 'right' && "justify-end",
                (!section.align || section.align === 'left') && "justify-start"
              )}>
                {section.actions.map((action, actionIndex) => (
                  <button
                    key={action.label}
                    onClick={() => handleActionClick(section.id, action)}
                    className={cn(
                      "group relative px-6 sm:px-8 py-3 sm:py-4 rounded-lg sm:rounded-xl font-medium transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] text-sm sm:text-base",
                      "hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary/20 w-full sm:w-auto",
                      action.variant === 'primary' 
                        ? "bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/20 hover:shadow-primary/30" 
                        : "border-2 border-border/60 bg-background/50 backdrop-blur-sm hover:bg-accent/50 hover:border-primary/30 text-foreground"
                    )}
                    style={{ animationDelay: `${actionIndex * 0.1 + 0.2}s` }}
                  >
                    <span className="relative z-10">{action.label}</span>
                    {action.variant === 'primary' && (
                      <div className="absolute inset-0 rounded-lg sm:rounded-xl bg-gradient-to-r from-primary to-primary/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        </section>
        {index < sections.length - 1 && (
          <div className="mx-auto w-full overflow-hidden py-2">
            <div
              className="h-10 w-full"
              style={{
                background: 'linear-gradient(90deg, rgba(59,130,246,0.35) 0%, rgba(96,165,250,0.25) 50%, rgba(59,130,246,0.35) 100%)',
                clipPath: 'polygon(0 45%, 5% 55%, 10% 40%, 15% 60%, 20% 45%, 25% 65%, 30% 50%, 35% 70%, 40% 55%, 45% 75%, 50% 60%, 55% 80%, 60% 65%, 65% 85%, 70% 70%, 75% 90%, 80% 75%, 85% 95%, 90% 80%, 95% 100%, 100% 85%, 100% 100%, 0% 100%)',
              }}
            />
          </div>
        )}
      </div>
      ))}

      {isFormOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4">
          <div className="w-full max-w-2xl rounded-3xl border border-border/80 bg-background/95 p-6 shadow-2xl backdrop-blur-2xl">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between mb-6">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-primary">Send Enquiry</p>
                <h2 className="mt-2 text-2xl font-semibold text-foreground">Let’s get your request started</h2>
              </div>
              <button
                type="button"
                onClick={() => setIsFormOpen(false)}
                className="self-start rounded-2xl border border-border/60 bg-background/80 px-4 py-2 text-sm text-muted-foreground transition hover:bg-background"
              >
                Close
              </button>
            </div>

            <form
              onSubmit={(event) => {
                event.preventDefault();
                setIsFormOpen(false);
              }}
              className="grid gap-4"
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="space-y-2 text-sm text-foreground">
                  <span>Name</span>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(event) => setFormData((prev) => ({ ...prev, name: event.target.value }))}
                    placeholder="Your full name"
                    className="w-full rounded-2xl border border-border/70 bg-background px-4 py-3 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />
                </label>
                <label className="space-y-2 text-sm text-foreground">
                  <span>Email</span>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(event) => setFormData((prev) => ({ ...prev, email: event.target.value }))}
                    placeholder="info@example.com"
                    className="w-full rounded-2xl border border-border/70 bg-background px-4 py-3 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />
                </label>
              </div>

              <label className="space-y-2 text-sm text-foreground">
                <span>Message</span>
                <textarea
                  value={formData.message}
                  onChange={(event) => setFormData((prev) => ({ ...prev, message: event.target.value }))}
                  placeholder="Tell us what you need"
                  rows={5}
                  className="w-full rounded-3xl border border-border/70 bg-background px-4 py-3 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
              </label>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-xs text-muted-foreground/80">We’ll follow up within 24 hours.</p>
                <button
                  type="submit"
                  className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
                >
                  Submit Enquiry
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

// Demo component showcasing the ScrollGlobe
export default function GlobeScrollDemo() {
  const demoSections = [
    {
      id: "hero",
      badge: "Welcome",
      title: "",
      subtitle: "Global Sourcing, Trusted Deliveries",
      description: "Premium Coated Calcium Carbonate & Industrial Chemicals — Import & Export Specialists. Connecting global manufacturers, distributors, and end-users through reliable sourcing and efficient supply chain solutions.",
      align: "left" as const,
      actions: [
        { label: "Explore Products", variant: "secondary" as const, onClick: () => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth', block: 'center' }) },
        { label: "Contact Us", variant: "secondary" as const, onClick: () => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth', block: 'center' }) },
      ]
    },
    {
      id: "about",
      badge: "About Us",
      title: "About us",
      description: [
        "Founded in 2024 and headquartered in Ahmedabad, Gujarat, India, ENEM Corporation is a trading company focused on importing and exporting high-quality chemical and industrial raw materials. We connect global manufacturers, distributors, and end-users through reliable sourcing and efficient supply chain solutions.",
        "Our core product portfolio includes Coated Calcium Carbonate and a wide range of specialty chemicals and industrial minerals serving industries such as plastics, paints, coatings, rubber, paper, construction, and adhesives. We prioritize quality and consistency in every shipment.",
        "We build long-term relationships through trust, transparency, and timely delivery. Leveraging a strong global supplier network and deep market knowledge, ENEM Corporation delivers dependable products and sustainable value to partners worldwide."
      ],
      align: "center" as const,
    },
    {
      id: "products",
      badge: "Products",
      title: "Our",
      subtitle: "Core Portfolio",
      description: "Our core product portfolio includes Coated Calcium Carbonate and a wide range of specialty chemicals and industrial minerals. We cater to industries demanding the highest quality raw materials.",
      align: "left" as const,
      features: [
        { title: "Coated Calcium Carbonate", description: "High-purity coated CaCO₃ for plastics, paints, coatings, rubber, paper, construction, and adhesives industries." },
        { title: "Specialty Chemicals", description: "Wide range of industrial minerals and chemical raw materials sourced from trusted global suppliers." },
        { title: "Global Supply Chain", description: "Seamless procurement and timely delivery for domestic and international markets with competitive pricing." }
      ]
    },
    {
      id: "contact",
      badge: "Contact",
      title: "",
      subtitle: "Get In Touch",
      description: "Reach out to our team for sourcing inquiries, pricing, or partnership opportunities. We ensure a response within 24 hours.",
      align: "center" as const,
      features: [
        { title: "Shivam Acharya", description: "+91 9428897772" },
        { title: "Nitin Mavar", description: "+91 6352-688331" },
        { title: "Email", description: "Info@enemcorporation.com" },
        { title: "Location", description: "Ahmedabad, Gujarat, India" }
      ],
      actions: [
        { label: "Send Enquiry", variant: "secondary" as const }
      ]
    }
  ];

  return (
    <ScrollGlobe
      sections={demoSections}
      className="bg-gradient-to-br from-background via-muted/20 to-background pt-16"
    />
  );
}
