import Link from "next/link";
import PlaceholderImage from "@/components/PlaceholderImage";
import { Quote } from "lucide-react";

export default function Home() {
  const testimonials = [
    {
      quote: "Learning Kathak at Shivangikam has been a transformative experience. The instructors focus deeply on traditional technique and grace while giving personal attention to every student.",
      name: "Ananya Sharma",
      program: "Classical Dance",
    },
    {
      quote: "The vocal music classes helped me discover my voice confidence. The structured curriculum and supportive atmosphere make every practice session enjoyable.",
      name: "Rohan Verma",
      program: "Vocal Music",
    },
    {
      quote: "Zumba and Yoga sessions here are energetic and uplifting. It is the best place in Varanasi to stay fit while connecting with arts and culture.",
      name: "Pooja Gupta",
      program: "Zumba & Fitness",
    },
  ];

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

      {/* Native Testimonials Section */}
      {/* Note: Update with actual student quotes via Admin Panel or DB seed */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-cream">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-serif text-primary mb-4 text-center">What Our Students Say</h2>
          <p className="text-center text-sm opacity-70 mb-12 max-w-xl mx-auto">
            Stories from our vibrant community of dancers, singers, and artists in Varanasi.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((item, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-accent/20 flex flex-col justify-between">
                <div>
                  <Quote className="w-8 h-8 text-accent/40 mb-4" />
                  <p className="italic text-gray-700 text-sm leading-relaxed mb-6">
                    "{item.quote}"
                  </p>
                </div>
                <div className="border-t border-gray-100 pt-4">
                  <h4 className="font-bold text-primary text-base">{item.name}</h4>
                  <span className="text-xs text-accent font-medium">{item.program}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link href="/contact" className="inline-flex items-center gap-2 bg-primary text-cream px-6 py-2.5 rounded-full font-semibold hover:bg-maroon-dark transition-colors">
              <span>Become a Student</span>
              <span>&rarr;</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
