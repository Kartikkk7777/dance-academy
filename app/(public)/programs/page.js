import Link from "next/link";
import PlaceholderImage from "@/components/PlaceholderImage";

export const metadata = {
  title: "Our Programs",
  description: "Explore our classes in Classical Dance, Bollywood, Zumba, Yoga, Vocal Music, Guitar, Tabla, and Wedding Choreography.",
};

export default function Programs() {
  const programs = [
    "Classical Dance",
    "Semi-Classical",
    "Bollywood",
    "Zumba",
    "Yoga",
    "Vocal Music",
    "Guitar",
    "Tabla",
    "Wedding Choreography"
  ];

  return (
    <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-serif text-primary mb-4 text-center">Our Programs</h1>
      <p className="text-center text-lg opacity-80 max-w-2xl mx-auto mb-12">
        We offer a diverse range of programs taught by experienced professionals. Find the perfect class for your age and skill level.
      </p>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {programs.map((program, index) => {
          const programImages = {
            "Classical Dance": "/clasical.jpg",
            "Semi-Classical": "/semi-clasical.jpg",
            "Bollywood": "/bollywood.jpg",
            "Zumba": "/zumba.jpg",
            "Yoga": "/yoga.jpg",
            "Vocal Music": "/vocal1.jpg",
            "Guitar": "/guitar1.jpg",
            "Tabla": "/tabla1.jpg",
            "Wedding Choreography": "/wedding.jpg",
          };
          const imageSrc = programImages[program];
          return (
            <div key={index} className="border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow bg-white flex flex-col">
              {imageSrc ? (
                <img 
                  src={imageSrc} 
                  alt={program} 
                  className={`w-full h-48 object-cover ${
                    program === "Classical Dance" || program === "Semi-Classical" ? "object-top" : ""
                  }`} 
                />
              ) : (
                <PlaceholderImage label={program} height="h-48" />
              )}
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-bold text-primary mb-2">{program}</h3>
                <p className="text-sm opacity-80 mb-4 flex-grow">
                  Join our {program.toLowerCase()} classes to learn fundamental techniques, improve your skills, and express yourself.
                </p>
                <Link 
                  href={`/contact?program=${encodeURIComponent(program)}`} 
                  className="text-accent font-semibold text-left hover:underline w-full inline-block mt-auto"
                >
                  Enquire Now &rarr;
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
