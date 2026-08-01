import PlaceholderImage from "@/components/PlaceholderImage";

export const metadata = {
  title: "Gallery",
  description: "View photos and videos from performances, classes, and events at Shivangikam Sangeet Kala Kendra.",
};

export default function Gallery() {
  const photos = [
    "/video/WhatsApp Image 2026-07-31 at 10.22.56 PM.jpeg",
    "/video/WhatsApp Image 2026-07-31 at 10.22.57 PM (1).jpeg",
    "/video/WhatsApp Image 2026-07-31 at 10.22.57 PM (2).jpeg",
    "/video/WhatsApp Image 2026-07-31 at 10.22.57 PM.jpeg",
    "/video/WhatsApp Image 2026-07-31 at 10.22.58 PM (1).jpeg",
    "/video/WhatsApp Image 2026-07-31 at 10.22.58 PM (2).jpeg",
    "/video/WhatsApp Image 2026-07-31 at 10.22.58 PM.jpeg",
    "/video/WhatsApp Image 2026-07-31 at 10.22.59 PM (1).jpeg",
    "/video/WhatsApp Image 2026-07-31 at 10.22.59 PM (2).jpeg",
    "/video/WhatsApp Image 2026-07-31 at 10.22.59 PM.jpeg",
    "/video/WhatsApp Image 2026-07-31 at 10.23.00 PM.jpeg"
  ];

  const videos = [
    "/video/WhatsApp Video 2026-07-31 at 10.22.54 PM.mp4",
    "/video/WhatsApp Video 2026-07-31 at 10.22.55 PM (1).mp4",
    "/video/WhatsApp Video 2026-07-31 at 10.22.55 PM.mp4",
    "/video/WhatsApp Video 2026-07-31 at 10.22.56 PM (1).mp4",
    "/video/WhatsApp Video 2026-07-31 at 10.22.56 PM.mp4",
  ];

  return (
    <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-serif text-primary mb-4 text-center">Our Gallery</h1>
      <p className="text-center text-lg opacity-80 max-w-2xl mx-auto mb-12">
        A glimpse into the vibrant life at Shivangikam. Explore moments from our daily classes, annual performances, and special workshops.
      </p>

      {/* Videos Section */}
      <div className="mb-16">
        <h2 className="text-3xl font-serif text-primary mb-8 border-b pb-4">Videos</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {videos.map((videoPath, i) => (
            <div key={i} className="rounded-xl overflow-hidden bg-black shadow-sm">
              <video 
                src={videoPath} 
                controls 
                className="w-full h-auto max-h-80 object-cover" 
              />
            </div>
          ))}
        </div>
      </div>

      {/* Photos Section */}
      <div>
        <h2 className="text-3xl font-serif text-primary mb-8 border-b pb-4">Photos</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {photos.map((photoPath, i) => (
            <div key={i} className="rounded-xl overflow-hidden hover:opacity-90 transition-opacity cursor-pointer shadow-sm">
              <img 
                src={photoPath} 
                alt={`Gallery photo ${i + 1}`} 
                className="w-full h-64 object-cover" 
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
