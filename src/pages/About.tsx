import PageLayout from '@/components/ui/PageLayout'
import { Button } from '@/components/ui/button'

export default function AboutPage() {
  return (
    <PageLayout 
      title="About ENEM" 
      subtitle="Connecting Global Markets"
      description="Founded in 2024 and headquartered in Ahmedabad, India, ENEM Corporation bridges the gap between global manufacturers and industrial end-users through reliable sourcing and efficient supply chain solutions."
    >
      <div className="grid gap-8 lg:gap-12">
        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          <div className="glass-card rounded-[2rem] p-8 sm:p-10 flex flex-col justify-between hover:-translate-y-2 hover:shadow-[0_0_40px_rgba(59,130,246,0.2)] transition-all duration-500 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            <div className="relative z-10">
              <div className="w-12 h-12 rounded-2xl bg-primary/15 flex items-center justify-center text-primary mb-6 shadow-[0_0_15px_rgba(59,130,246,0.5)]">
                 <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
              </div>
              <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
              <p className="text-muted-foreground/90 leading-relaxed">To deliver consistent quality and timely service while building long-term partnerships founded on trust. We focus on sustainable sourcing and dependable logistics to provide lasting value for our partners worldwide.</p>
            </div>
          </div>

          <div className="glass-card rounded-[2rem] p-8 sm:p-10 flex flex-col justify-between hover:-translate-y-2 hover:shadow-[0_0_40px_rgba(59,130,246,0.2)] transition-all duration-500 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-bl from-blue-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
             <div className="relative z-10">
              <div className="w-12 h-12 rounded-2xl bg-blue-500/15 flex items-center justify-center text-blue-400 mb-6 shadow-[0_0_15px_rgba(59,130,246,0.5)]">
                 <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><circle cx="12" cy="12" r="10"/><path d="M22 12h-4M6 12H2M12 2v4M12 18v4M4.9 4.9l2.8 2.8M16.3 16.3l2.8 2.8M19.1 4.9l-2.8 2.8M7.7 16.3l-2.8 2.8"/></svg>
              </div>
              <h2 className="text-2xl font-bold mb-4">Our Vision</h2>
              <p className="text-muted-foreground/90 leading-relaxed">To be the most preferred trade partner globally for industrial minerals and chemical raw materials, known for our integrity and excellence in global supply chain management.</p>
            </div>
          </div>
        </div>

        {/* Core Values Section */}
        <section className="py-12">
          <h2 className="text-3xl font-bold mb-12 text-center bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">Our Core Values</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Integrity", desc: "Honesty and transparency in every transaction." },
              { title: "Quality", desc: "Uncompromising standards for every product." },
              { title: "Efficiency", desc: "Optimised logistics for timely deliveries." },
              { title: "Innovation", desc: "Adapting to global market shifts." },
            ].map((value, i) => (
              <div key={i} className="glass-card p-6 rounded-2xl">
                <h3 className="font-semibold text-lg mb-2">{value.title}</h3>
                <p className="text-sm text-muted-foreground/70 leading-relaxed">{value.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Team / Contact CTA */}
        <div className="glass-card rounded-[3rem] p-10 sm:p-16 text-center overflow-hidden relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] h-[300px] bg-primary/10 blur-[100px] -z-10" />
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">Expertise Across Regions</h2>
          <p className="text-muted-foreground/80 max-w-2xl mx-auto mb-10 text-lg">Our team of sourcing experts and logistics specialists collaborates globally to ensure operational excellence and high-purity chemical distribution.</p>
          <div className="flex flex-wrap items-center justify-center gap-4">
             <Button variant="solid" onClick={() => window.location.href = '/contact'}>Work With Us</Button>
             <Button variant="outline" onClick={() => window.location.href = '/services'}>View Products</Button>
          </div>
        </div>
      </div>
    </PageLayout>
  )
}
