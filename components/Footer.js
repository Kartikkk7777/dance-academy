import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin } from "lucide-react";

function InstagramIcon({ className = "w-4 h-4" }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
    </svg>
  );
}

export default function Footer() {
  return (
    <footer 
      className="bg-dark-maroon text-cream border-t border-accent/20"
      itemScope 
      itemType="https://schema.org/EducationalOrganization"
    >
      <meta itemProp="name" content="Shivangikam Sangeet Kala Kendra" />
      <meta itemProp="description" content="Where Art Meets Passion and Culture. Dance and Music classes in Varanasi." />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div>
            <h3 className="font-serif text-2xl font-bold mb-4 flex items-center gap-3">
              <div className="relative h-9 w-9 rounded-full overflow-hidden ring-1 ring-accent/25 bg-white flex items-center justify-center shrink-0">
                <Image
                  src="/logo.jpeg"
                  alt="Shivangikam Logo"
                  fill
                  sizes="36px"
                  className="object-cover"
                />
              </div>
              <span>Shivangikam Sangeet Kala Kendra</span>
            </h3>
            <p className="mb-4 font-serif italic text-accent">
              "Nurturing Talent - Preserving Traditions - Inspiring Futures"
            </p>
            <p className="text-sm opacity-80">
              Where Art Meets Passion and Culture. Join us to Learn, Perform, Grow, and Shine.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-4 text-accent">Contact Us</h4>
            <address 
              className="not-italic text-sm space-y-2 opacity-90"
              itemProp="address" 
              itemScope 
              itemType="https://schema.org/PostalAddress"
            >
              <p itemProp="streetAddress" className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                <span>New Colony, Kakarmatta, Near I.A.I.T College, BLW</span>
              </p>
              <p className="pl-6"><span itemProp="addressLocality">Varanasi</span>, <span itemProp="addressRegion">Uttar Pradesh</span></p>
              <meta itemProp="addressCountry" content="IN" />
              
              <div className="pt-2 space-y-1">
                <a href="tel:+918604415736" className="flex items-center gap-2 hover:text-accent transition-colors" itemProp="telephone">
                  <Phone className="w-4 h-4 text-accent shrink-0" />
                  <span>+91 8604415736</span>
                </a>
                <a href="tel:+917905766423" className="flex items-center gap-2 hover:text-accent transition-colors" itemProp="telephone">
                  <Phone className="w-4 h-4 text-accent shrink-0" />
                  <span>+91 7905766423</span>
                </a>
              </div>
              <div className="pt-2">
                <a href="mailto:shivangikamkalakendra@gmail.com" className="flex items-center gap-2 hover:text-accent transition-colors" itemProp="email">
                  <Mail className="w-4 h-4 text-accent shrink-0" />
                  <span>shivangikamkalakendra@gmail.com</span>
                </a>
              </div>
              <div className="pt-2">
                <a 
                  href="https://instagram.com/Shivangikam_kala_kendra" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-accent transition-colors inline-flex items-center gap-2"
                  itemProp="sameAs"
                >
                  <InstagramIcon className="w-4 h-4 text-accent shrink-0" />
                  <span>@Shivangikam_kala_kendra</span>
                </a>
              </div>
            </address>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-4 text-accent">Quick Links</h4>
            <ul className="space-y-2 text-sm opacity-90">
              <li><Link href="/programs" className="hover:text-accent transition-colors">Programs</Link></li>
              <li><Link href="/instructors" className="hover:text-accent transition-colors">Our Instructors</Link></li>
              <li><Link href="/events" className="hover:text-accent transition-colors">Upcoming Events</Link></li>
              <li><Link href="/gallery" className="hover:text-accent transition-colors">Gallery</Link></li>
              <li><Link href="/contact" className="hover:text-accent transition-colors">Contact Us</Link></li>
              <li><Link href="/privacy-policy" className="hover:text-accent transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-white/10 text-center text-sm opacity-70">
          <p>&copy; {new Date().getFullYear()} Shivangikam Sangeet Kala Kendra. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
