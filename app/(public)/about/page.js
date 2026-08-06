export const metadata = {
  title: "About Us",
  description: "Learn about the mission and history of Shivangikam Sangeet Kala Kendra in Varanasi.",
};

export default function About() {
  return (
    <div className="max-w-4xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-serif text-primary mb-8 text-center">About Us</h1>
      
      <div className="prose prose-lg mx-auto">
        <p className="text-xl leading-relaxed mb-6 font-serif italic text-accent text-center">
          "Nurturing Talent - Preserving Traditions - Inspiring Futures"
        </p>
        
        <p className="mb-6">
          Welcome to <strong>Shivangikam Sangeet Kala Kendra</strong>. Located in New Colony, Kakarmatta, near I.A.I.T College, BLW, Varanasi, we are a premier institution dedicated to the preservation and teaching of Indian classical arts as well as modern dance and music forms.
        </p>
        
        <h2 className="text-2xl font-bold text-primary mt-10 mb-4">Our Mission</h2>
        <p className="mb-6">
          Our mission is to provide a nurturing environment where art meets passion and culture. We believe in providing rigorous, high-quality instruction while fostering a love for the arts that lasts a lifetime. Whether our students are stepping onto the stage for the first time or preparing for professional careers, we guide them to perform, grow, and shine.
        </p>
        
        <h2 className="text-2xl font-bold text-primary mt-10 mb-4">Our Facility</h2>
        <p className="mb-6">
          Our studios are designed to provide the optimal environment for learning. With spacious dance floors, proper acoustics for music lessons, and a welcoming atmosphere, we ensure every student feels at home.
        </p>
      </div>
    </div>
  );
}
