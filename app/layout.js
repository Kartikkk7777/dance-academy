import WhatsAppButton from "@/components/WhatsAppButton";
import "./globals.css";

export const metadata = {
  title: {
    template: "%s | Shivangikam Sangeet Kala Kendra",
    default: "Shivangikam Sangeet Kala Kendra - Dance & Music Academy Varanasi",
  },
  description: "Where Art Meets Passion and Culture. Nurturing Talent, Preserving Traditions, Inspiring Futures. Join our Classical, Bollywood, Zumba, and Music classes.",
  openGraph: {
    title: "Shivangikam Sangeet Kala Kendra",
    description: "Learn, Perform, Grow, Shine in Varanasi. Expert instruction in Dance and Music.",
    url: "https://shivangikamkalakendra.com", 
    siteName: "Shivangikam Sangeet Kala Kendra",
    locale: "en_IN",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "DanceGroup",
    "additionalType": ["EducationalOrganization", "LocalBusiness"],
    "name": "Shivangikam Sangeet Kala Kendra",
    "description": "Premier Dance and Music Academy in Varanasi. Offering Kathak, Classical Dance, Vocal Music, Yoga, Zumba, and Wedding Choreography.",
    "url": "https://shivangikamkalakendra.com",
    "telephone": "+918604415736",
    "email": "shivangikamkalakendra@gmail.com",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "New Colony, Kakarmatta, Near I.A.I.T College, BLW",
      "addressLocality": "Varanasi",
      "addressRegion": "Uttar Pradesh",
      "postalCode": "221004",
      "addressCountry": "IN"
    },
    "sameAs": [
      "https://instagram.com/Shivangikam_kala_kendra"
    ]
  };

  return (
    <html
      lang="en"
      className="h-full antialiased"
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600&display=swap" rel="stylesheet" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground font-sans">
        {children}
        <WhatsAppButton />
      </body>
    </html>
  );
}
