import PageLayout from '@/components/ui/PageLayout'
import { Button } from '@/components/ui/button'

export default function ContactPage() {
  const contacts = [
    { name: "Shivam Acharya", phone: "+91 9428897772", role: "Sourcing & Operations" },
    { name: "Nitin Mavar", phone: "+91 6352-688331", role: "Trade & Logistics" },
    { name: "General Inquiries", phone: "Info@enemcorporation.com", role: "Support" }
  ]

  return (
    <PageLayout
      title="Get In Touch"
      subtitle="Let's Start a Partnership"
      description="Whether you're looking for specific raw materials or seeking a reliable trade partner, our team is ready to assist you."
    >
      <div className="grid lg:grid-cols-5 gap-8 items-start">
        {/* Info Cards */}
        <div className="lg:col-span-2 space-y-6">
          {contacts.map((contact, i) => (
            <div key={i} className="glass-card rounded-2xl p-6 hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(59,130,246,0.15)] transition-all duration-300 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              <p className="text-xs font-semibold text-primary/80 uppercase tracking-wider mb-2 relative z-10">{contact.role}</p>
              <h3 className="text-xl font-bold mb-1 relative z-10 group-hover:text-primary transition-colors">{contact.name}</h3>
              <p className="text-muted-foreground relative z-10">{contact.phone}</p>
            </div>
          ))}

          <div className="glass-card rounded-2xl p-6 bg-primary/5 border-primary/10">
            <h3 className="text-lg font-bold mb-2">Office Location</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              B-1204 INFINITY TOWER PRAHLADNAGAR NEAR RAMADA HOTEL CORPORATE ROAD Ahmedabad, Gujarat, India
            </p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-3 glass-card rounded-[2.5rem] p-8 sm:p-10 border-white/10 relative overflow-hidden shadow-[0_0_50px_rgba(59,130,246,0.05)]">
          <div className="absolute top-[-50%] right-[-50%] w-full h-full bg-primary/5 blur-[100px] pointer-events-none rounded-full" />
          <div className="relative z-10">
            <form className="grid gap-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground ml-1">Full Name</label>
                  <input
                    type="text"
                    placeholder="John Doe"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-foreground focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/30 transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground ml-1">Email Address</label>
                  <input
                    type="email"
                    placeholder="john@example.com"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-foreground focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/30 transition-all"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground ml-1">Subject</label>
                <input
                  type="text"
                  placeholder="Product Inquiry"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-foreground focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/30 transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground ml-1">Message</label>
                <textarea
                  rows={5}
                  placeholder="How can we help you?"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-foreground focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/30 transition-all"
                ></textarea>
              </div>

              <Button variant="solid" className="w-fit px-8 py-6 h-auto text-lg rounded-xl mt-2">
                Send Message
              </Button>
            </form>
          </div>
        </div>
      </div>
    </PageLayout>
  )
}
                