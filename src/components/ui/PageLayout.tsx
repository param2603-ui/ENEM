import type { ReactNode } from "react";
import Navbar from "./Navbar";
import SpaceBackground from "./space-background";
import { cn } from "@/lib/utils";

interface PageLayoutProps {
  children: ReactNode;
  title: string;
  subtitle?: string;
  description?: string | string[];
  className?: string;
  containerClassName?: string;
}

export default function PageLayout({
  children,
  title,
  subtitle,
  description,
  className,
  containerClassName,
}: PageLayoutProps) {
  return (
    <div className={cn("relative min-h-screen w-full bg-background text-foreground overflow-x-hidden", className)}>
      {/* Visual background layers */}
      <SpaceBackground className="fixed inset-0 z-0 pointer-events-none" />
      
      {/* Glowing Overlays for Depth */}
      <div className="fixed top-[-15%] left-[-15%] w-[50vw] h-[50vw] rounded-full bg-primary/15 blur-[140px] pointer-events-none z-0" />
      <div className="fixed bottom-[-15%] right-[-15%] w-[50vw] h-[50vw] rounded-full bg-blue-500/12 blur-[140px] pointer-events-none z-0" />
      <div className="fixed top-[30%] right-[-10%] w-[35vw] h-[35vw] rounded-full bg-indigo-500/8 blur-[110px] pointer-events-none z-0" />
      
      <Navbar isVisible={true} />

      <main className={cn("relative z-10 pt-28 pb-20 px-4 sm:px-6 lg:px-8", containerClassName)}>
        {/* Page Hero Section */}
        <section className="max-w-7xl mx-auto mb-16 sm:mb-24">
          <div className="max-w-4xl">
            <h1 className="font-bold mb-6 sm:mb-8 leading-[1.1] tracking-tight text-4xl sm:text-5xl md:text-6xl lg:text-7xl">
              {subtitle ? (
                <div className="space-y-1 sm:space-y-2">
                  <div className="bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
                    {title}
                  </div>
                  <div className="text-muted-foreground/90 text-[0.6em] sm:text-[0.7em] font-medium tracking-wider uppercase">
                    {subtitle}
                  </div>
                </div>
              ) : (
                <div className="bg-gradient-to-r from-foreground via-foreground to-foreground/80 bg-clip-text text-transparent">
                  {title}
                </div>
              )}
            </h1>

            {description && (
              <div className="text-muted-foreground/80 leading-relaxed text-lg sm:text-xl font-light max-w-3xl">
                {Array.isArray(description) ? (
                  description.map((para, i) => (
                    <p key={i} className="mb-4">{para}</p>
                  ))
                ) : (
                  <p>{description}</p>
                )}
              </div>
            )}
          </div>
        </section>

        {/* Page Content */}
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </main>

      {/* Footer / Gradient bottom */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-background to-transparent z-0 pointer-events-none" />
    </div>
  );
}
