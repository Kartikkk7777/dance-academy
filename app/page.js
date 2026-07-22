import Link from "next/link";
import PlaceholderImage from "@/components/PlaceholderImage";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-primary text-cream py-20 px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-5xl md:text-7xl font-serif mb-6 leading-tight">
          Where Art Meets <br className="hidden md:block"/> Passion and Culture
        </h1>
        <p className="text-xl md:text-2xl font-serif italic text-accent max-w-3xl mx-auto mb-10">
          "Nurturing Talent - Preserving Traditions - Inspiring Futures"
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link href="/programs" className="bg-accent text-primary px-8 py-3 rounded-full font-bold text-lg hover:bg-white transition-colors">
            Explore Programs
          </Link>
          <Link href="/contact" className="border-2 border-accent text-accent px-8 py-3 rounded-full font-bold text-lg hover:bg-accent hover:text-primary transition-colors">
            Contact Us
          </Link>
        </div>
      </section>

      {/* Intro Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
        <h2 className="text-3xl font-serif text-primary mb-6">Welcome to Shivangikam</h2>
        <p className="text-lg opacity-90 max-w-4xl mx-auto leading-relaxed">
          Located in the heart of Varanasi, we are dedicated to providing expert instruction in traditional and modern arts. Whether you are looking to master Classical Dance, learn Bollywood routines, or find your voice, our academy offers a nurturing environment to learn, perform, grow, and shine.
        </p>
      </section>

      {/* Programs Preview Section */}
      <section className="bg-white py-16 px-4 sm:px-6 lg:px-8 border-y border-gray-200">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-serif text-primary mb-10 text-center">Our Programs</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {['Classical Dance', 'Vocal Music', 'Yoga & Zumba'].map((program, i) => (
              <div key={i} className="rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-gray-100 bg-cream/30">
                <PlaceholderImage label={`${program} Image`} height="h-48" />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-primary mb-2">{program}</h3>
                  <p className="text-sm opacity-80 mb-4">Join our expert instructors to master the art of {program.toLowerCase()}.</p>
                  <Link href="/programs" className="text-accent font-semibold hover:underline">
                    Learn more &rarr;
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link href="/programs" className="inline-block border-2 border-primary text-primary px-6 py-2 rounded-full font-bold hover:bg-primary hover:text-white transition-colors">
              View All Programs
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Preview Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-cream text-center">
        <h2 className="text-3xl font-serif text-primary mb-10">What Our Students Say</h2>
        <div className="max-w-3xl mx-auto italic text-lg opacity-80 mb-8 border-l-4 border-accent pl-6 text-left">
          "[PLACEHOLDER: Add featured testimonial here regarding the quality of instruction and the welcoming environment at Shivangikam.]"
          <br/>
          <span className="block mt-4 text-sm font-bold not-italic text-primary">- Student Name</span>
        </div>
        <Link href="/testimonials" className="text-primary font-semibold hover:underline">
          Read more testimonials &rarr;
        </Link>
      </section>
    </div>
  );
}
