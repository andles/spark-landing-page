import { Button, Container } from '../components';

export function BookDemo() {
  const openCalendly = () => {
    // Replace with your actual Calendly or HubSpot booking link
    window.open('https://calendly.com/spark-inventory/demo', '_blank');
  };

  return (
    <section id="book-demo" className="py-20 lg:py-28 bg-[#faf8f5]">
      <Container>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Ready to Scale your Inventory Operations?
            </h2>
            <p className="text-lg text-gray-600">
              Book a personalized demo with our team and see how Spark can transform your business.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 lg:p-12 shadow-sm border border-gray-100">
            <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); openCalendly(); }}>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                    placeholder="John Smith"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Work Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                    placeholder="john@company.com"
                    required
                  />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
                    Company Name
                  </label>
                  <input
                    type="text"
                    id="company"
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                    placeholder="Acme Inc."
                    required
                  />
                </div>
                <div>
                  <label htmlFor="size" className="block text-sm font-medium text-gray-700 mb-2">
                    Company Size
                  </label>
                  <select
                    id="size"
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all bg-white"
                    required
                  >
                    <option value="">Select...</option>
                    <option value="1-10">1-10 employees</option>
                    <option value="11-50">11-50 employees</option>
                    <option value="51-200">51-200 employees</option>
                    <option value="201+">201+ employees</option>
                  </select>
                </div>
              </div>
              <div className="text-center pt-4">
                <Button type="submit" size="lg">
                  Book a free demo today!
                </Button>
              </div>
            </form>
          </div>
        </div>
      </Container>
    </section>
  );
}
