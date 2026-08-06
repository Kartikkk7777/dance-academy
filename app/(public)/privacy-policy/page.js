export const metadata = {
  title: "Privacy Policy",
  description: "Privacy Policy for Shivangikam Sangeet Kala Kendra. Learn how we handle your data.",
};

export default function PrivacyPolicy() {
  return (
    <div className="max-w-3xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-serif text-primary mb-8">Privacy Policy</h1>
      
      <div className="prose prose-lg text-gray-700 space-y-6">
        <p>
          At <strong>Shivangikam Sangeet Kala Kendra</strong>, we are committed to protecting your privacy and ensuring your personal information is handled in a safe and responsible manner.
        </p>
        
        <h2 className="text-2xl font-bold text-primary mt-8 mb-4">Information We Collect</h2>
        <p>
          When you use our online contact or enquiry form, we collect the following personal information:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Name:</strong> To address you properly.</li>
          <li><strong>Email Address:</strong> To reply to your queries digitally.</li>
          <li><strong>Phone Number:</strong> To contact you via call or WhatsApp regarding class schedules or direct enquiries.</li>
          <li><strong>Message:</strong> The content of your enquiry to better assist you.</li>
        </ul>
        
        <h2 className="text-2xl font-bold text-primary mt-8 mb-4">How We Use Your Information</h2>
        <p>
          The information we collect is strictly used for the purpose of communicating with you. We use your data to:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Respond to your enquiries and provide information about our programs.</li>
          <li>Notify you about class schedules, events, or changes at the academy.</li>
        </ul>
        
        <h2 className="text-2xl font-bold text-primary mt-8 mb-4">Data Sharing and Security</h2>
        <p>
          We do <strong>not</strong> sell, trade, or otherwise transfer your personal information to outside parties. Your data is kept secure and is only accessible by the academy's administration for communication purposes.
        </p>
        
        <h2 className="text-2xl font-bold text-primary mt-8 mb-4">Contact Us</h2>
        <p>
          If you have any questions regarding this Privacy Policy, please contact us at:
          <br/>
          <strong>Email:</strong> <a href="mailto:shivangikamkalakendra@gmail.com" className="text-accent hover:underline">shivangikamkalakendra@gmail.com</a>
          <br/>
          <strong>Phone:</strong> +91 8604415736, +91 7905766423
        </p>
      </div>
    </div>
  );
}
