import PlaceholderImage from "@/components/PlaceholderImage";

export const metadata = {
  title: "Gallery",
  description: "View photos and videos from performances, classes, and events at Shivangikam Sangeet Kala Kendra.",
};

export default function Gallery() {
  const photos = [
    { src: "/video/WhatsApp%20Image%202026-07-31%20at%2010.22.56%20PM.jpeg", alt: "Kathak student performance group photo" },
    { src: "/video/WhatsApp%20Image%202026-07-31%20at%2010.22.57%20PM%20(1).jpeg", alt: "Students posing during academy performance" },
    { src: "/video/WhatsApp%20Image%202026-07-31%20at%2010.22.57%20PM%20(2).jpeg", alt: "Academy music students group photo" },
    { src: "/video/WhatsApp%20Image%202026-07-31%20at%2010.22.57%20PM.jpeg", alt: "Kathak dancers group photo in performance attire" },
    { src: "/video/WhatsApp%20Image%202026-07-31%20at%2010.22.58%20PM%20(1).jpeg", alt: "Group photo of dance academy students" },
    { src: "/video/WhatsApp%20Image%202026-07-31%20at%2010.22.58%20PM%20(2).jpeg", alt: "Performance group photo at Shivangikam" },
    { src: "/video/WhatsApp%20Image%202026-07-31%20at%2010.22.58%20PM.jpeg", alt: "Dance students holding certificates on stage" },
    { src: "/video/WhatsApp%20Image%202026-07-31%20at%2010.22.59%20PM.jpeg", alt: "Tabla and vocal students on stage with guru" },
    { src: "/video/WhatsApp%20Image%202026-07-31%20at%2010.23.00%20PM.jpeg", alt: "Traditional music concert performance group photo" },
    // Ghungroo Puja blessing ceremony photos
    { src: "/WhatsApp%20Image%202026-08-07%20at%208.50.16%20PM.jpeg", alt: "Ghungroo Puja tilak blessing ceremony for a male student" },
    { src: "/WhatsApp%20Image%202026-08-07%20at%208.50.48%20PM.jpeg", alt: "Ghungroo Puja tilak blessing ceremony for a young boy student" },
    { src: "/WhatsApp%20Image%202026-08-07%20at%208.50.51%20PM.jpeg", alt: "Guru Shivani Patel tying ghungroos on a female student's wrist during Ghungroo Puja" },
    { src: "/WhatsApp%20Image%202026-08-07%20at%208.50.52%20PM.jpeg", alt: "Guru Shivani Patel applying tilak during Ghungroo Puja blessing ceremony" },
    { src: "/WhatsApp%20Image%202026-08-07%20at%208.50.55%20PM.jpeg", alt: "Guru Shivani Patel offering sweet blessings during Ghungroo Puja" },
    { src: "/WhatsApp%20Image%202026-08-07%20at%208.50.57%20PM.jpeg", alt: "Ghungroo Puja tilak blessing ceremony for an adult student" }
  ];

  const videos = [
    "/video/video1.mp4",
    "/video/WhatsApp%20Video%202026-07-31%20at%2010.22.55%20PM%20(1).mp4",
    "/video/Video2.mp4"
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
          {photos.map((photo, i) => (
            <div key={i} className="rounded-xl overflow-hidden hover:opacity-90 transition-opacity cursor-pointer shadow-sm">
              <img 
                src={photo.src} 
                alt={photo.alt} 
                className="w-full h-64 object-cover" 
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
