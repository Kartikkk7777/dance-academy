import prisma from "@/lib/db";

export const metadata = {
  title: "Events",
  description: "Discover upcoming workshops, performances, and special events at Shivangikam Sangeet Kala Kendra.",
};

export const revalidate = 0;

export default async function Events() {
  const events = await prisma.event.findMany({
    where: { isActive: true },
    orderBy: { date: 'asc' },
  });

  return (
    <div className="max-w-5xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-serif text-primary mb-4 text-center">Upcoming Events</h1>
      <p className="text-center text-lg opacity-80 max-w-2xl mx-auto mb-12">
        Join us for our special performances, guest workshops, and annual showcases.
      </p>

      {events.length === 0 ? (
        <div className="bg-cream/50 p-12 rounded-xl border border-accent/30 text-center">
          <svg className="w-16 h-16 mx-auto text-accent mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <h2 className="text-2xl font-bold text-primary mb-2">No Upcoming Events</h2>
          <p className="text-gray-600">
            There are currently no scheduled events. Please check back later!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {events.map((event) => (
            <div key={event.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col justify-between transition-all hover:shadow-md">
              <div className="space-y-3">
                <div className="flex justify-between items-start gap-4">
                  <h2 className="text-xl font-bold text-gray-900 leading-snug">{event.title}</h2>
                  <span className="bg-accent/20 text-primary text-xs font-semibold px-2.5 py-1 rounded-md shrink-0">
                    {new Date(event.date).toLocaleDateString(undefined, {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </span>
                </div>
                <p className="text-gray-600 text-sm whitespace-pre-wrap leading-relaxed">
                  {event.description}
                </p>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-50 text-xs text-gray-400">
                Scheduled Date: {new Date(event.date).toLocaleDateString()}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
