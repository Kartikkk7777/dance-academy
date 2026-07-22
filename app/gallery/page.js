import PlaceholderImage from "@/components/PlaceholderImage";

export const metadata = {
  title: "Gallery",
  description: "View photos and videos from performances, classes, and events at Shivangikam Sangeet Kala Kendra.",
};

export default function Gallery() {
  // Using an array of 6 to simulate a grid of images
  const placeholders = Array.from({ length: 6 });

  return (
    <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-serif text-primary mb-4 text-center">Our Gallery</h1>
      <p className="text-center text-lg opacity-80 max-w-2xl mx-auto mb-12">
        A glimpse into the vibrant life at Shivangikam. Explore moments from our daily classes, annual performances, and special workshops.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
        {placeholders.map((_, i) => (
          <div key={i} className="rounded-xl overflow-hidden hover:opacity-90 transition-opacity cursor-pointer shadow-sm">
            <PlaceholderImage label={`Gallery Image ${i + 1}`} height="h-64" />
          </div>
        ))}
      </div>
    </div>
  );
}
