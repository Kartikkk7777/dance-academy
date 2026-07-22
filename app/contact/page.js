import EnquiryForm from "@/components/EnquiryForm";

export const metadata = {
  title: "Contact Us",
  description: "Get in touch with Shivangikam Sangeet Kala Kendra. Find our location in Varanasi, contact numbers, and email.",
};

export default function Contact() {
  return (
    <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-serif text-primary mb-12 text-center">Contact Us</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Contact Info and Map */}
        <div>
          <h2 className="text-2xl font-bold text-primary mb-6">Our Location</h2>
          <address className="not-italic text-lg space-y-4 opacity-90 mb-8">
            <p className="font-semibold">Shivangikam Sangeet Kala Kendra</p>
            <p>New Colony, Kakarmatta</p>
            <p>Near I.A.I.T College, BLW</p>
            <p>Varanasi, Uttar Pradesh, India</p>
            
            <div className="pt-4 space-y-2">
              <a href="tel:+918604415736" className="flex items-center gap-3 hover:text-accent transition-colors">
                <span className="text-xl">📞</span> +91 8604415736
              </a>
              <a href="tel:+917905766423" className="flex items-center gap-3 hover:text-accent transition-colors">
                <span className="text-xl">📞</span> +91 7905766423
              </a>
              <a href="mailto:shivangikamkalakendra@gmail.com" className="flex items-center gap-3 hover:text-accent transition-colors">
                <span className="text-xl">✉️</span> shivangikamkalakendra@gmail.com
              </a>
              <a 
                href="https://instagram.com/Shivangikam_kala_kendra" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-3 hover:text-accent transition-colors"
              >
                <svg className="w-5 h-5 text-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                @Shivangikam_kala_kendra
              </a>
            </div>
          </address>

          <div className="rounded-xl overflow-hidden shadow-md h-64 bg-gray-200">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14431.114751846985!2d82.9772!3d25.277!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x398e321526487e41%3A0x6b4458f310f823f3!2sKakarmatta%2C%20Varanasi%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Shivangikam Sangeet Kala Kendra Location"
            ></iframe>
          </div>
        </div>

        {/* Enquiry Form */}
        <EnquiryForm />
      </div>
    </div>
  );
}
