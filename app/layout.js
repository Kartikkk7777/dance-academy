import { Inter, Playfair_Display } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

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
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <Navbar />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
