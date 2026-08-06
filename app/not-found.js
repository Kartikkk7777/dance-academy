import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Page Not Found | Shivangikam Sangeet Kala Kendra",
  description: "The page you are looking for could not be found.",
};

export default function NotFound() {
  return (
    <>
      <style>{`
        .nf-btn-primary:hover { opacity: 0.85; }
        .nf-btn-outline:hover { background-color: rgba(107, 28, 46, 0.08); }
      `}</style>
      <Navbar />
      <main
        className="flex-grow flex items-center justify-center px-4 py-20"
        style={{ backgroundColor: "var(--color-cream, #fdf6ee)", minHeight: "70vh" }}
      >
        <div className="text-center" style={{ maxWidth: "480px", margin: "0 auto" }}>
          {/* Big gradient numeral */}
          <p
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(100px, 20vw, 180px)",
              fontWeight: "700",
              lineHeight: "1",
              background:
                "linear-gradient(135deg, var(--color-primary, #6b1c2e), var(--color-accent, #c9a84c))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              userSelect: "none",
              margin: "0 0 8px",
            }}
          >
            404
          </p>

          {/* Gold divider */}
          <div
            style={{
              width: "60px",
              height: "3px",
              background: "var(--color-accent, #c9a84c)",
              margin: "0 auto 24px",
              borderRadius: "2px",
            }}
          />

          <h1
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(22px, 4vw, 32px)",
              fontWeight: "600",
              color: "var(--color-primary, #6b1c2e)",
              marginBottom: "16px",
            }}
          >
            Page Not Found
          </h1>

          <p
            style={{
              fontSize: "16px",
              color: "#6b7280",
              lineHeight: "1.7",
              marginBottom: "40px",
            }}
          >
            The page you&apos;re looking for doesn&apos;t exist or may have
            been moved. Let&apos;s get you back to the dance floor.
          </p>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "center",
              gap: "16px",
            }}
          >
            <Link
              href="/"
              className="nf-btn-primary"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "14px 32px",
                borderRadius: "9999px",
                backgroundColor: "var(--color-primary, #6b1c2e)",
                color: "var(--color-cream, #fdf6ee)",
                fontWeight: "600",
                fontSize: "15px",
                textDecoration: "none",
                transition: "opacity 0.2s ease",
              }}
            >
              ← Back to Home
            </Link>
            <Link
              href="/contact"
              className="nf-btn-outline"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "14px 32px",
                borderRadius: "9999px",
                border: "2px solid var(--color-primary, #6b1c2e)",
                color: "var(--color-primary, #6b1c2e)",
                fontWeight: "600",
                fontSize: "15px",
                textDecoration: "none",
                transition: "background-color 0.2s ease",
              }}
            >
              Contact Us
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
