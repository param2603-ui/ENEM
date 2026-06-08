import PageLayout from '@/components/ui/PageLayout'
import { Button } from '@/components/ui/button'

export default function ServicesPage() {
  const products = [
    {
      title: "Coated Calcium Carbonate",
      description: "High-purity CaCO₃ treated with stearic acid for enhanced dispersion. Essential for plastics, rubber, and coatings industries.",
      features: ["Superfine Particle Size", "High Whiteness", "Excellent Dispersion", "Improved Flow Properties"]
    },
    {
      title: "Specialty Chemicals",
      description: "A diverse range of industrial minerals and chemical raw materials tailored for specific manufacturing needs.",
      features: ["Global Sourcing", "Strict Quality Control", "Consistent Supply", "Technical Support"]
    },
    {
      title: "Global Supply Chain",
      description: "End-to-end logistics and procurement solutions connecting manufacturers to end-users across borders.",
      features: ["Seamless Procurement", "Timely Delivery", "Competitive Pricing", "Multimodal Logistics"]
    }
  ]

  return (
    <PageLayout 
      title="Our Portfolio" 
      subtitle="Quality Raw Materials"
      description="We provide high-quality chemical and industrial raw materials, ensuring consistency and performance for your manufacturing processes."
    >
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {products.map((product, i) => (
          <div key={i} className="glass-card rounded-[2rem] p-8 flex flex-col hover:-translate-y-2 hover:shadow-[0_0_40px_rgba(59,130,246,0.2)] transition-all duration-500 group relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            <h3 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors">{product.title}</h3>
            <p className="text-muted-foreground/90 mb-6 flex-grow">{product.description}</p>
            
            <ul className="space-y-3 mb-8">
              {product.features.map((feature, idx) => (
                <li key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary/60" />
                  {feature}
                </li>
              ))}
            </ul>

            <Button variant="outline" className="w-full" onClick={() => window.location.href = '/contact'}>
              Enquire Now
            </Button>
          </div>
        ))}
      </div>

      {/* Industries Served Section */}
      <section className="mt-24 py-16 border-t border-white/5">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Industries We Serve</h2>
          <p className="text-muted-foreground/70">Our products power critical manufacturing sectors worldwide.</p>
        </div>
        <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
          {['Plastics', 'Paints', 'Coatings', 'Rubber', 'Paper', 'Construction', 'Adhesives'].map((industry) => (
            <div key={industry} className="px-6 py-3 rounded-full bg-white/5 border border-white/10 text-sm font-medium hover:bg-white/10 transition-colors">
              {industry}
            </div>
          ))}
        </div>
      </section>
    </PageLayout>
  )
}
