import PlaceholderImage from "@/components/PlaceholderImage";
import Image from "next/image";

export const metadata = {
  title: "Our Instructors",
  description: "Meet the professional dance and music instructors at Shivangikam Sangeet Kala Kendra, Varanasi.",
};

export default function Instructors() {
  const instructors = [
    {
      name: "Shivani Patel",
      image: "/shivani.jpeg",
      role: "Kathak / Semi-Classical / Folk / Bollywood Instructor",
      bio: "Shivani Patel is a passionate Kathak artist, performer, and dance educator dedicated to preserving the beauty of Indian classical dance while inspiring the next generation of artists. Over her 10 years of Kathak training, she has combined strong technical knowledge with expressive artistry, training rigorously in the Lucknow Gharana under Guru Smt. Vasundhara Sharma and Pt. Jaikishan Maharaj. At Shivangikam, she teaches Kathak, Semi-Classical, Folk, and Bollywood.",
      quote: "Dance is not just about movement — it is a journey of expression, discipline, culture, and self-discovery.",
      credentials: [
        "Diploma, Bachelor's & Master's in Kathak from Banaras Hindu University (BHU)",
        "Prabhakar from Prayag Sangeet Samiti",
        "10 years rigorous training in Lucknow Gharana",
        "Doordarshan B Grade Artist",
        "Performances at Taj Mahotsav (2025), Kashi Vandan (2025), Ghat Sandhya (2021/2024/2025), Ramotsav (2024), Kashi Tamil Sangamam (2024), G20 Summit Varanasi (2023)",
        "Winner of Pratispardha District Level Competition (2020)"
      ]
    },
    {
      name: "Premchand",
      image: "/tabla.jpeg",
      role: "Tabla Instructor",
      bio: "A trained and dedicated Tabla artist with extensive experience in accompaniment, solo performance, and music teaching. Premchand is highly skilled in providing Tabla accompaniment for vocal, instrumental (flute and sitar), and dance performances. He is experienced in teaching Tabla and conducting practical music sessions in a simple, disciplined, and student-friendly manner. He has completed a one-year internship at the BHU Music Department and has performed on stage with Grammy-awarded Pt. Rajendra Prasanna and other renowned senior artists.",
      credentials: [
        "Master of Performing Arts (Tabla), BHU (2024)",
        "Bachelor of Performing Arts (Tabla), BHU (2022) — Gold Medalist",
        "Sangeet Prabhakar (Tabla), Prayag Sangeet Samiti, Allahabad (2019)",
        "One-year internship, BHU Music Department",
        "Winner of Sangeet Natak Akademi Competition",
        "Winner of Sapandan Youth Fest (BHU)"
      ]
    },
    {
      name: "Gaurav Singh",
      image: "/guitar.jpeg",
      role: "Guitar Instructor",
      bio: "Gaurav Singh is a highly qualified and dedicated Guitar Instructor with 10 years of teaching and performance experience. His strong foundation in academic music allows him to blend practical playing technique with music theory for a deep, holistic understanding. He nurtures talent across all ages (from beginner to advanced), specializing in Hindustani classical themes, classic Bollywood, traditional Indian compositions, as well as Western genres.",
      credentials: [
        "Postgraduate Degree (M.A./M.Mus. in Music) from Banaras Hindu University (BHU)",
        "Sangeet Prabhakar (6-year course in Hindustani Classical Music)",
        "10 years of guitar teaching and performance experience"
      ]
    },
    {
      name: "Ms. Aradhana Mishra",
      image: "/vocal.jpeg",
      role: "Vocal Music Instructor",
      bio: "Ms. Aradhana Mishra is our Vocal Music Instructor at Shivangikam Sangeet Kala Kendra. She combines strong academic knowledge with practical teaching experience, committed to helping students master the fundamentals of Sur, Taal, rhythm, voice culture, and musical expression. Her warm, patient, and encouraging teaching style makes learning enjoyable for students of all age groups, whether taking their first step into music or refining their vocal skills.",
      credentials: [
        "Postgraduate in Music from Banaras Hindu University (BHU)",
        "Completed a one-year internship in vocal music",
        "Specializes in teaching fundamentals of Sur, Taal, rhythm, and voice culture"
      ]
    },
    {
      name: "Komal",
      image: "/Komal.jpg",
      role: "Yoga Instructor",
      bio: "Komal is a dedicated Yoga instructor at Shivangikam. She specializes in guiding students through traditional yoga practices, promoting physical alignment, mindfulness, and overall wellness.",
      credentials: [
        "MA in Yogacharya (pursuing)",
        "200hrs Yoga & Wellness Teacher Training Course (Swasthit Wellness)",
        "2 years of Yoga teaching experience"
      ]
    },
    {
      name: "Vaishnavi",
      image: "/Vaishnavi.jpg",
      role: "Yoga Instructor",
      bio: "Vaishnavi is an experienced Yoga educator committed to helping students refine their yoga postures, breath control, and meditation techniques in an encouraging and supportive environment.",
      credentials: [
        "MA in Yogacharya (pursuing)",
        "200hrs Yoga & Wellness Teacher Training Course (Swasthit Wellness)",
        "2 years of Yoga teaching experience"
      ]
    },
    {
      name: "Amrita Singh",
      image: "/amrita.jpeg",
      role: "Aerobics & Zumba Instructor",
      bio: "Amrita Singh is an enthusiastic fitness instructor passionate about dance, movement, and group motivation. As an active participant in group fitness routines, she brings energy and rhythm to her classes to help students stay active and healthy.",
      credentials: [
        "Master of Arts (M.A.)",
        "Enthusiastic and energetic fitness enthusiast, passionate about dance and movement",
        "Regular participant in Aerobics and Zumba fitness classes",
        "Strong interest in dance, fitness, and an active lifestyle",
        "Comfortable following and practicing group fitness routines",
        "Key skills: basic Aerobics & Zumba practice, dance/rhythm coordination, group motivation"
      ]
    }
  ];

  return (
    <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
      {/* Page Heading */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-serif text-primary mb-4 font-bold">Our Instructors</h1>
        <p className="text-lg opacity-80 max-w-2xl mx-auto">
          Learn from dedicated and highly qualified artists. Our instructors are committed to guiding you on your artistic journey.
        </p>
      </div>

      {/* Director's Message Section */}
      <section className="bg-cream/40 rounded-2xl border border-accent/20 p-8 md:p-12 mb-20 shadow-sm">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Director Photo and Quick Info */}
          <div className="lg:col-span-4 flex flex-col items-center">
            <Image 
              src="/shivam.jpeg"
              alt="Shivam Gupta Photo" 
              width={320}
              height={320}
              className="rounded-2xl max-w-xs shadow-md border border-gray-100 h-80 object-cover" 
            />
            <div className="text-center mt-6">
              <h2 className="text-2xl font-serif text-primary font-bold">Shivam Gupta</h2>
              <p className="text-accent font-semibold text-sm uppercase tracking-wider mt-1">Director</p>
              <p className="text-xs text-gray-500 mt-2 font-medium">
                Kathak & Bollywood Choreographer
              </p>
            </div>
          </div>

          {/* Message Content */}
          <div className="lg:col-span-8 space-y-6">
            <div className="inline-block bg-primary/10 text-primary font-bold px-4 py-1.5 rounded-full text-xs uppercase tracking-wider">
              Director's Message
            </div>
            
            <blockquote className="border-l-4 border-accent pl-5 my-4 italic text-primary text-lg font-serif leading-relaxed">
              "Art has the power to inspire, transform, and create a lasting impact."
            </blockquote>

            <div className="space-y-4 text-sm md:text-base opacity-90 leading-relaxed text-gray-700">
              <p>
                As Director of Shivangikam Sangeet Kala Kendra, I am deeply committed to nurturing talent and preserving the rich traditions of Indian performing arts. Our vision is to provide students with quality training in a positive, disciplined, and inspiring environment where every learner can grow with confidence and creativity.
              </p>
              <p>
                Under the guidance of Guru Smt. Vasundhara Sharma, I have received dedicated training in Kathak for over three years. Having performed on the prestigious Sur Ganga stage and choreographed extensively, I strive to bring together the elegance of classical dance with the energy of contemporary performances. 
              </p>
              <p>
                My artistic journey is complemented by a Diploma in Kathak and Prabhakar (BHU), and I am currently pursuing my Bachelor's in Kathak from Indira Kala Sangeet Vishwavidyalaya, Khairagarh. Additionally, my Bachelor of Business Administration (BBA) provides strong leadership and organizational skills to guide this institution.
              </p>
              <p className="font-semibold text-primary">
                At Shivangikam, we believe dance is more than an art form — it is a path to confidence, discipline, cultural awareness, and self-expression.
              </p>
            </div>

            {/* Director Credentials */}
            <div className="pt-4 border-t border-accent/20">
              <h4 className="text-xs font-bold uppercase tracking-wider text-accent mb-2">Qualifications & Background</h4>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-1.5 text-xs text-gray-600">
                <li className="flex items-start gap-1.5">
                  <span className="text-accent">✓</span> Diploma in Kathak & Prabhakar (BHU)
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-accent">✓</span> Pursuing B.A. in Kathak (IKSVV Khairagarh)
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-accent">✓</span> Trained under Guru Smt. Vasundhara Sharma
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-accent">✓</span> Bachelor of Business Administration (BBA)
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Instructors Section */}
      <section>
        <h2 className="text-3xl font-serif text-primary text-center mb-12 font-bold">Meet Our Faculty</h2>
        
        <div className="space-y-12">
          {instructors.map((inst, index) => (
            <div 
              key={index} 
              className="bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow p-6 md:p-8 flex flex-col md:flex-row gap-8 items-start"
            >
              {/* Instructor Photo */}
              <div className="w-full md:w-56 flex-shrink-0 flex justify-center">
                {inst.image ? (
                  <Image 
                    src={inst.image}
                    alt={`${inst.name} Photo`} 
                    width={240}
                    height={256}
                    className="rounded-xl shadow-sm border border-gray-100 w-full max-w-[240px] h-64 object-cover" 
                  />
                ) : (
                  <PlaceholderImage 
                    label={`${inst.name} Photo`} 
                    height="h-64" 
                    className="rounded-xl shadow-sm border border-gray-100 w-full max-w-[240px]" 
                  />
                )}
              </div>

              {/* Instructor Bio & Info */}
              <div className="flex-grow space-y-4 w-full">
                <div>
                  <h3 className="text-2xl font-serif font-bold text-primary">{inst.name}</h3>
                  <p className="text-accent font-semibold text-sm uppercase tracking-wider mt-1">{inst.role}</p>
                </div>

                {inst.quote && (
                  <blockquote className="border-l-2 border-accent pl-4 italic text-primary/95 text-sm md:text-base font-serif">
                    "{inst.quote}"
                  </blockquote>
                )}

                <p className="text-gray-700 text-sm md:text-base leading-relaxed opacity-90">
                  {inst.bio}
                </p>

                {/* Credentials List */}
                <div className="pt-4 border-t border-gray-100">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-accent mb-3">Professional Credentials</h4>
                  <ul className="space-y-1.5">
                    {inst.credentials.map((cred, idx) => (
                      <li key={idx} className="text-xs md:text-sm text-gray-600 flex items-start gap-2">
                        <span className="text-accent mt-0.5">•</span>
                        <span>{cred}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
