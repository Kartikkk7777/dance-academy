export const metadata = {
  title: "Testimonials",
  description: "Read what our students and parents say about their experience at Shivangikam Sangeet Kala Kendra.",
};

export default function Testimonials() {
  const placeholders = Array.from({ length: 4 });

  return (
    <div className="max-w-4xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-serif text-primary mb-4 text-center">Testimonials</h1>
      <p className="text-center text-lg opacity-80 mx-auto mb-12">
        We are proud of the impact we make. Here is what our community has to say about learning with us.
      </p>

      <div className="space-y-8">
        {placeholders.map((_, i) => (
          <div key={i} className="bg-cream/40 p-8 rounded-2xl border border-accent/20 relative shadow-sm">
            <div className="text-5xl text-accent/20 absolute top-4 left-4 font-serif">"</div>
            <p className="text-lg italic leading-relaxed relative z-10 text-gray-700 pl-6">
              [PLACEHOLDER: Add real testimonial text here. Describe how the academy helped the student grow, the quality of the teachers, and the welcoming environment.]
            </p>
            <div className="mt-6 flex items-center gap-4 pl-6">
              <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center text-gray-400">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
              </div>
              <div>
                <p className="font-bold text-primary">Student Name {i + 1}</p>
                <p className="text-sm opacity-70">Enrolled Program</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
