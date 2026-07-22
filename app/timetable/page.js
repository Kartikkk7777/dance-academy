export const metadata = {
  title: "Class Timetable",
  description: "View the weekly schedule for all dance and music classes at Shivangikam Sangeet Kala Kendra.",
};

export default function Timetable() {
  return (
    <div className="max-w-5xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-serif text-primary mb-4 text-center">Class Timetable</h1>
      <p className="text-center text-lg opacity-80 max-w-2xl mx-auto mb-12">
        Find the perfect time to join us. Our schedule is designed to accommodate students, working professionals, and hobbyists alike.
      </p>

      <div className="bg-cream/50 p-8 rounded-xl border border-accent/30 text-center mb-8">
        <h2 className="text-2xl font-bold text-primary mb-4">Current Weekly Schedule</h2>
        
        <div className="py-12 px-4 border-2 border-dashed border-gray-300 rounded-lg bg-white mt-6">
          <p className="text-gray-500 font-medium text-lg">
            [PLACEHOLDER: Add Current Schedule Table Here]
          </p>
          <p className="text-sm text-gray-400 mt-2">
            The timetable will be populated once the exact class timings are provided.
          </p>
        </div>
      </div>
      
      <div className="text-center mt-8">
        <p className="mb-4">Need a specific time slot for private lessons or Wedding Choreography?</p>
        <a href="/contact" className="inline-block bg-primary text-cream px-6 py-2 rounded-full font-bold hover:bg-opacity-90 transition-colors">
          Contact Us for Custom Slots
        </a>
      </div>
    </div>
  );
}
