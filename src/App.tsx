import React, { createContext, useContext, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Navbar, Footer } from "./components/Navigation";
import { HomePage } from "./pages/HomePage";
import { ToolPage } from "./pages/ToolPage";
import BlogPage from "./pages/BlogPage";
import BlogPostPage from "./pages/BlogPostPage";
import { motion, AnimatePresence } from "motion/react";
import { ArrowUp, Zap, Shield, CheckCircle2 } from "lucide-react";
import { Toaster, toast } from "sonner";
const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  React.useEffect(() => {
    const toggle = () => setIsVisible(window.pageYOffset > 300);
    window.addEventListener("scroll", toggle);
    return () => window.removeEventListener("scroll", toggle);
  }, []);
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.5 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-8 right-8 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-orange-600 text-white shadow-xl shadow-orange-600/20 hover:bg-orange-700 hover:scale-110 active:scale-95 transition-all">
          <ArrowUp className="h-6 w-6" />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

interface PlanContextType {
  plan: string;
}

const PlanContext = createContext<PlanContextType | undefined>(undefined);

export const usePlan = () => {
  const context = useContext(PlanContext);
  if (!context) throw new Error("usePlan must be used within a PlanProvider");
  return context;
};

const PrivacyPage = () => (
  <div className="mx-auto max-w-4xl px-4 py-24 sm:px-6 lg:px-8">
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="prose prose-zinc max-w-none">
      <h1 className="text-4xl font-black text-zinc-900 mb-4">Privacy Policy</h1>
      <p className="text-zinc-500 text-lg mb-10">Last Updated: January 15, 2025</p>

      <div className="space-y-10 text-zinc-600 font-medium">

        <section>
          <h2 className="text-2xl font-bold text-zinc-900 mb-4">1. Introduction</h2>
          <p className="leading-relaxed">
            Welcome to Convertly ("we," "our," or "us"). We are committed to protecting your personal information and your right to privacy. This Privacy Policy explains how we collect, use, and safeguard your information when you visit our website at <strong>convertly-ruddy.vercel.app</strong> and use our file conversion tools.
          </p>
          <p className="leading-relaxed mt-3">
            Please read this policy carefully. If you disagree with its terms, please discontinue use of our site.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-zinc-900 mb-4">2. Information We Collect</h2>
          <p className="leading-relaxed mb-3">
            <strong>Files you upload:</strong> Convertly processes image files entirely within your own browser using the browser's built-in Canvas API. Your image files are <strong>never transmitted to our servers</strong>, never stored, and never seen by us. Image conversion happens 100% on your own device.
          </p>
          <p className="leading-relaxed mb-3">
            <strong>Video files:</strong> Video conversion tools require server-side processing. If you use video tools, files are temporarily processed on our servers and automatically deleted immediately after conversion is complete.
          </p>
          <p className="leading-relaxed">
            <strong>Usage data:</strong> We may collect anonymized, non-personally identifiable usage statistics (such as which tools are used most frequently) to improve our service. This data cannot be used to identify you.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-zinc-900 mb-4">3. How We Use Your Information</h2>
          <p className="leading-relaxed">We use the information we collect to:</p>
          <ul className="list-disc pl-6 space-y-2 mt-3">
            <li>Provide, operate, and maintain our file conversion tools</li>
            <li>Improve, personalize, and expand our website</li>
            <li>Understand and analyze how you use our website</li>
            <li>Develop new tools, features, and functionality</li>
            <li>Display relevant advertisements through Google AdSense</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-zinc-900 mb-4">4. Google AdSense and Advertising</h2>
          <p className="leading-relaxed mb-3">
            We use <strong>Google AdSense</strong> to display advertisements on our website. Google AdSense is an advertising service provided by Google LLC. When you visit our site, Google AdSense may use cookies and web beacons to collect information to serve ads based on your prior visits to our website or other websites on the internet.
          </p>
          <p className="leading-relaxed mb-3">
            Google's use of advertising cookies enables it and its partners to serve ads to you based on your visit to our site and/or other sites on the internet. The types of data Google may collect include:
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-3">
            <li>Your IP address</li>
            <li>Browser type and version</li>
            <li>Pages visited on our site</li>
            <li>Time and date of your visit</li>
            <li>Time spent on those pages</li>
            <li>Referring website addresses</li>
          </ul>
          <p className="leading-relaxed mb-3">
            <strong>Opting out of personalized advertising:</strong> You may opt out of personalized advertising by visiting{" "}
            <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-orange-600 underline">
              Google Ads Settings
            </a>. You can also opt out of a third-party vendor's use of cookies for personalized advertising by visiting{" "}
            <a href="https://www.aboutads.info" target="_blank" rel="noopener noreferrer" className="text-orange-600 underline">
              www.aboutads.info
            </a>.
          </p>
          <p className="leading-relaxed">
            For more information on how Google uses data when you use our website, please visit:{" "}
            <a href="https://policies.google.com/technologies/partner-sites" target="_blank" rel="noopener noreferrer" className="text-orange-600 underline">
              How Google uses data when you use our partners' sites or apps
            </a>.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-zinc-900 mb-4">5. Cookies</h2>
          <p className="leading-relaxed mb-3">
            Cookies are small data files placed on your device when you visit a website. We use the following types of cookies:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Essential cookies:</strong> Required for our website to function correctly. These cannot be disabled.</li>
            <li><strong>Analytics cookies:</strong> Help us understand how visitors interact with our website by collecting anonymous information.</li>
            <li><strong>Advertising cookies:</strong> Used by Google AdSense to serve relevant advertisements based on your browsing history. You can opt out at any time via Google Ads Settings.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-zinc-900 mb-4">6. Third-Party Services</h2>
          <p className="leading-relaxed mb-3">Our website uses the following third-party services that may collect data:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Google AdSense</strong> — Advertising service. <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-orange-600 underline">Google Privacy Policy</a></li>
            <li><strong>Vercel</strong> — Hosting and deployment platform. <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-orange-600 underline">Vercel Privacy Policy</a></li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-zinc-900 mb-4">7. Data Retention</h2>
          <p className="leading-relaxed">
            <strong>Image files:</strong> Never stored on our servers. Processed entirely in your browser.<br />
            <strong>Video files:</strong> Temporarily processed on our servers and deleted immediately after the conversion is delivered to you. We retain no copies.<br />
            <strong>Analytics data:</strong> Retained in anonymized form for up to 12 months for the purpose of improving our service.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-zinc-900 mb-4">8. Children's Privacy</h2>
          <p className="leading-relaxed">
            Our service is not directed to children under the age of 13. We do not knowingly collect personal information from children under 13. If you are a parent or guardian and believe your child has provided us with personal information, please contact us and we will delete such information.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-zinc-900 mb-4">9. Your Rights</h2>
          <p className="leading-relaxed mb-3">Depending on your location, you may have the following rights regarding your personal data:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>The right to access personal data we hold about you</li>
            <li>The right to request correction of inaccurate data</li>
            <li>The right to request deletion of your data</li>
            <li>The right to opt out of personalized advertising</li>
            <li>The right to data portability</li>
          </ul>
          <p className="leading-relaxed mt-3">To exercise any of these rights, please contact us at the address below.</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-zinc-900 mb-4">10. Changes to This Policy</h2>
          <p className="leading-relaxed">
            We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date. You are advised to review this Privacy Policy periodically for any changes.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-zinc-900 mb-4">11. Contact Us</h2>
          <p className="leading-relaxed">
            If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us:
          </p>
          <div className="mt-4 rounded-2xl bg-zinc-50 border border-zinc-100 p-6">
            <p className="font-bold text-zinc-900">Convertly</p>
            <p className="text-zinc-600 mt-1">Email: <a href="mailto:support@convertly.com" className="text-orange-600 underline">support@convertly.com</a></p>
            <p className="text-zinc-600">Website: <a href="https://convertly-ruddy.vercel.app" className="text-orange-600 underline">convertly-ruddy.vercel.app</a></p>
          </div>
        </section>

      </div>
    </motion.div>
  </div>
);

const TermsPage = () => (
  <div className="mx-auto max-w-4xl px-4 py-24 sm:px-6 lg:px-8">
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="prose prose-zinc max-w-none">
      <h1 className="text-4xl font-black text-zinc-900 mb-4">Terms of Service</h1>
      <p className="text-zinc-500 text-lg mb-10">Last Updated: January 15, 2025</p>
      <div className="space-y-8 text-zinc-600 font-medium">
        <section>
          <h2 className="text-2xl font-bold text-zinc-900 mb-4">1. Acceptance of Terms</h2>
          <p>By accessing and using Convertly, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to these terms, please do not use our service.</p>
        </section>
        <section>
          <h2 className="text-2xl font-bold text-zinc-900 mb-4">2. Description of Service</h2>
          <p>Convertly provides users with access to a collection of free online file conversion and image manipulation tools. Image tools run entirely in your browser. Video tools are processed server-side. The Service is provided "AS-IS" without warranties of any kind.</p>
        </section>
        <section>
          <h2 className="text-2xl font-bold text-zinc-900 mb-4">3. Acceptable Use</h2>
          <p>You agree not to use the Service to process any content that is unlawful, harmful, infringing, or otherwise objectionable. You are solely responsible for the content you process using our tools. You agree not to attempt to reverse engineer, abuse, or overload our service infrastructure.</p>
        </section>
        <section>
          <h2 className="text-2xl font-bold text-zinc-900 mb-4">4. Intellectual Property</h2>
          <p>You retain full ownership of all files you convert using our service. Convertly claims no rights over your files or their contents. The Convertly website design, code, and branding are the property of Convertly and may not be copied or reproduced without permission.</p>
        </section>
        <section>
          <h2 className="text-2xl font-bold text-zinc-900 mb-4">5. Advertising</h2>
          <p>Convertly displays advertisements through Google AdSense. By using the site, you agree to the display of these advertisements.</p>
        </section>
        <section>
          <h2 className="text-2xl font-bold text-zinc-900 mb-4">6. Limitation of Liability</h2>
          <p>Convertly shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of or inability to use the service. Our total liability shall not exceed the amount you paid us in the past 12 months.</p>
        </section>
        <section>
          <h2 className="text-2xl font-bold text-zinc-900 mb-4">7. Changes to Terms</h2>
          <p>We reserve the right to modify these terms at any time. Continued use of our service after changes constitutes acceptance of the new terms.</p>
        </section>
      </div>
    </motion.div>
  </div>
);

const ContactPage = () => (
  <div className="mx-auto max-w-5xl px-4 py-24 sm:px-6 lg:px-8">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
      <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
        <h1 className="text-5xl font-black text-zinc-900 mb-6">Get in Touch</h1>
        <p className="text-xl text-zinc-500 font-medium leading-relaxed mb-10">
          Have questions about our tools or need help? Our team is here to help.
        </p>
        <div className="space-y-8">
          <div className="flex items-center gap-6">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-50 text-orange-600">
              <Zap className="h-7 w-7 fill-current" />
            </div>
            <div>
              <h4 className="font-bold text-zinc-900">Email Us</h4>
              <p className="text-zinc-500 font-medium">support@convertly.app</p>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
              <Shield className="h-7 w-7" />
            </div>
            <div>
              <h4 className="font-bold text-zinc-900">Privacy Questions</h4>
              <p className="text-zinc-500 font-medium">privacy@convertly.app</p>
            </div>
          </div>
        </div>
      </motion.div>
      <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
        className="rounded-[3rem] bg-zinc-50 border border-zinc-200 p-8 sm:p-12 shadow-xl shadow-zinc-200/20">
        <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); toast.success("Message sent! We'll get back to you soon."); }}>
          <div className="space-y-2">
            <label className="text-sm font-bold text-zinc-900 ml-2">Full Name</label>
            <input type="text" required className="w-full rounded-2xl border border-zinc-200 bg-white px-6 py-4 text-sm font-medium focus:border-orange-600 focus:outline-none shadow-sm" placeholder="John Doe" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-zinc-900 ml-2">Email Address</label>
            <input type="email" required className="w-full rounded-2xl border border-zinc-200 bg-white px-6 py-4 text-sm font-medium focus:border-orange-600 focus:outline-none shadow-sm" placeholder="john@example.com" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-zinc-900 ml-2">Message</label>
            <textarea required rows={5} className="w-full rounded-2xl border border-zinc-200 bg-white px-6 py-4 text-sm font-medium focus:border-orange-600 focus:outline-none shadow-sm resize-none" placeholder="How can we help you?" />
          </div>
          <button type="submit" className="w-full rounded-full bg-orange-600 py-5 text-lg font-black text-white shadow-lg shadow-orange-600/20 transition-all hover:bg-orange-700 hover:scale-[1.02] active:scale-[0.98]">
            Send Message
          </button>
        </form>
      </motion.div>
    </div>
  </div>
);

const AboutPage = () => (
  <div className="mx-auto max-w-4xl px-4 py-24 sm:px-6 lg:px-8">
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <h1 className="text-4xl font-black text-zinc-900 mb-4">About Convertly</h1>
      <p className="text-zinc-500 text-lg mb-12 font-medium leading-relaxed">
        Convertly is a free online file conversion platform built for speed, privacy, and simplicity. We believe powerful tools should be accessible to everyone — no sign-up, no account, no cost.
      </p>
      <div className="space-y-10 text-zinc-600 font-medium">

        <section className="rounded-3xl bg-zinc-50 border border-zinc-100 p-8">
          <h2 className="text-2xl font-bold text-zinc-900 mb-4">Our Story</h2>
          <p className="leading-relaxed mb-4">
            Convertly started from a simple frustration: every file conversion tool online either demanded an account, charged a fee, uploaded your private files to unknown servers, or buried the download button under layers of ads. We decided to build something better.
          </p>
          <p className="leading-relaxed mb-4">
            We launched Convertly with one goal — give people a fast, private, and genuinely free way to convert images and videos without any of the usual friction. No watermarks. No file size tricks. No dark patterns.
          </p>
          <p className="leading-relaxed">
            Today, Convertly supports over a dozen conversion tools used by web developers, photographers, content creators, and everyday users who just need to convert a file quickly and get on with their day.
          </p>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="rounded-3xl bg-orange-50 border border-orange-100 p-8">
            <Zap className="h-10 w-10 text-orange-600 mb-4 fill-current" />
            <h3 className="text-xl font-bold text-zinc-900 mb-2">Browser-First Technology</h3>
            <p className="text-sm leading-relaxed">All image tools run entirely inside your browser using the Canvas API. Your files are processed locally on your own device — they are never sent to any server, never stored, and never seen by us. This is privacy by architecture, not just by policy.</p>
          </div>
          <div className="rounded-3xl bg-zinc-50 border border-zinc-100 p-8">
            <Shield className="h-10 w-10 text-zinc-700 mb-4" />
            <h3 className="text-xl font-bold text-zinc-900 mb-2">Our Mission</h3>
            <p className="text-sm leading-relaxed">We believe that utility software should be free, fast, and respectful of your privacy. Convertly will always offer its core tools at no cost. We sustain the platform through non-intrusive advertising — never by selling your data or restricting features behind paywalls.</p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-zinc-900 mb-6">What We Offer</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { icon: Shield, title: "Privacy by Design", desc: "Image files never leave your device. Conversion happens 100% locally in your browser using the Canvas API." },
              { icon: CheckCircle2, title: "Completely Free", desc: "All tools are free with no artificial quality limits, no watermarks, and no hidden fees." },
              { icon: Zap, title: "Instant Results", desc: "Browser-based processing means zero upload time. Most conversions complete in under a second." },
              { icon: CheckCircle2, title: "No Account Needed", desc: "Open a tool, upload your file, download the result. No sign-up, no email, no tracking." },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex gap-4 p-6 rounded-2xl bg-white border border-zinc-100 shadow-sm">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-50 text-orange-600">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-bold text-zinc-900">{title}</h4>
                  <p className="text-sm text-zinc-500 mt-1">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-3xl bg-zinc-50 border border-zinc-100 p-8">
          <h2 className="text-2xl font-bold text-zinc-900 mb-4">How We Keep the Lights On</h2>
          <p className="leading-relaxed mb-4">
            Convertly is free to use and always will be. We sustain the platform through Google AdSense advertisements displayed on the site. These ads are served by Google and are clearly labeled. We do not sell user data, run affiliate schemes, or use deceptive monetization practices.
          </p>
          <p className="leading-relaxed">
            If you find Convertly useful, the best way to support us is simply to use the tools and share the site with others who might find it helpful.
          </p>
        </section>

        <section className="bg-zinc-900 rounded-[3rem] p-12 text-white text-center">
          <h2 className="text-3xl font-black mb-4">Ready to convert something?</h2>
          <p className="text-zinc-400 mb-8 max-w-xl mx-auto">All tools are free, instant, and private. No account required.</p>
          <Link to="/" className="inline-block rounded-full bg-orange-600 px-10 py-4 font-black transition-all hover:bg-orange-700 hover:scale-105 active:scale-95">
            Explore All Tools
          </Link>
        </section>
      </div>
    </motion.div>
  </div>
);

const CookieBanner = () => {
  const [visible, setVisible] = React.useState(() => !localStorage.getItem("cookie_consent"));
  if (!visible) return null;
  return (
    <div className="fixed bottom-0 left-0 right-0 z-[200] bg-zinc-900 text-white px-4 py-4 sm:px-6">
      <div className="mx-auto max-w-7xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <p className="text-sm text-zinc-300 leading-relaxed max-w-2xl">
          We use cookies to improve your experience and display relevant ads via Google AdSense.
          By continuing to use this site, you agree to our{" "}
          <Link to="/privacy" className="underline text-orange-400 hover:text-orange-300">Privacy Policy</Link>.
        </p>
        <div className="flex gap-3 shrink-0">
          <button
            onClick={() => { localStorage.setItem("cookie_consent", "1"); setVisible(false); }}
            className="rounded-full bg-orange-600 px-5 py-2 text-sm font-bold hover:bg-orange-700 transition-colors"
          >
            Accept
          </button>
          <button
            onClick={() => { localStorage.setItem("cookie_consent", "0"); setVisible(false); }}
            className="rounded-full border border-zinc-600 px-5 py-2 text-sm font-bold text-zinc-300 hover:bg-zinc-800 transition-colors"
          >
            Decline
          </button>
        </div>
      </div>
    </div>
  );
};

export default function App() {
  const plan = "Free";

  return (
    <PlanContext.Provider value={{ plan }}>
      <Router>
        <Toaster position="top-center" richColors />
        <ScrollToTop />
        <div className="min-h-screen bg-white font-sans text-zinc-900 selection:bg-orange-100 selection:text-orange-900">
          <Navbar />
          <main>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/tool/:toolId" element={<ToolPage />} />
              <Route path="/blog" element={<BlogPage />} />
              <Route path="/blog/:slug" element={<BlogPostPage />} />
              <Route path="/privacy" element={<PrivacyPage />} />
              <Route path="/terms" element={<TermsPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/about" element={<AboutPage />} />
            </Routes>
          </main>
          <Footer />
          <CookieBanner />
        </div>
      </Router>
    </PlanContext.Provider>
  );
}