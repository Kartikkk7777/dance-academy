export const metadata = {
  title: "Events",
  description: "Discover upcoming workshops, performances, and special events at Shivangikam Sangeet Kala Kendra.",
};

export default function Events() {
  return (
    <div className="max-w-5xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-serif text-primary mb-4 text-center">Upcoming Events</h1>
      <p className="text-center text-lg opacity-80 max-w-2xl mx-auto mb-12">
        Join us for our special performances, guest workshops, and annual showcases.
      </p>

      <div className="bg-cream/50 p-12 rounded-xl border border-accent/30 text-center">
        <svg className="w-16 h-16 mx-auto text-accent mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
        <h2 className="text-2xl font-bold text-primary mb-2">No Upcoming Events</h2>
        <p className="text-gray-600 mb-6">
          [PLACEHOLDER: Add real event details here. For now, there are no scheduled events.]
        </p>
        <button className="bg-primary text-cream px-6 py-2 rounded-full font-bold hover:bg-opacity-90 transition-colors">
          Subscribe for Updates
        </button>
      </div>
    </div>
  );
}
