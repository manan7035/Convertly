import React, { createContext, useContext, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Navbar, Footer } from "./components/Navigation";
import { HomePage } from "./pages/HomePage";
import { ToolPage } from "./pages/ToolPage";
import { motion, AnimatePresence } from "motion/react";
import { X, Check, Loader2, ArrowUp, Zap, Shield, CheckCircle2 } from "lucide-react";
import { Toaster, toast } from "sonner";

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  React.useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) setIsVisible(true);
      else setIsVisible(false);
    };
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-orange-600 text-white shadow-xl shadow-orange-600/20 transition-all hover:bg-orange-700 hover:scale-110 active:scale-95"
        >
          <ArrowUp className="h-6 w-6" />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

interface PlanContextType {
  plan: string;
  upgradePlan: (type: string) => Promise<void>;
  isUpgradeModalOpen: boolean;
  setUpgradeModalOpen: (open: boolean) => void;
}

const PlanContext = createContext<PlanContextType | undefined>(undefined);

export const usePlan = () => {
  const context = useContext(PlanContext);
  if (!context) throw new Error("usePlan must be used within a PlanProvider");
  return context;
};

const PrivacyPage = () => (
  <div className="mx-auto max-w-4xl px-4 py-24 sm:px-6 lg:px-8">
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="prose prose-zinc max-w-none"
    >
      <h1 className="text-4xl font-black text-zinc-900 mb-8">Privacy Policy</h1>
      <p className="text-zinc-500 text-lg mb-8">Last Updated: March 31, 2026</p>
      
      <div className="space-y-8 text-zinc-600 font-medium">
        <section>
          <h2 className="text-2xl font-bold text-zinc-900 mb-4">1. Introduction</h2>
          <p>Welcome to Convertly. We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our website and tell you about your privacy rights and how the law protects you.</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-zinc-900 mb-4">2. Data We Collect</h2>
          <p>We do not collect any personal data from visitors who use our free conversion tools. For Pro users, we collect:</p>
          <ul className="list-disc pl-6 space-y-2 mt-4">
            <li>Email address (for account management)</li>
            <li>Payment information (processed securely via third-party providers)</li>
            <li>Usage statistics (anonymized to improve our services)</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-zinc-900 mb-4">3. File Processing & Security</h2>
          <p>Your privacy is our top priority. Files uploaded to Convertly are processed on secure servers and are <strong>automatically deleted 30 minutes after processing</strong>. We do not store, view, or share your files with any third party.</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-zinc-900 mb-4">4. Cookies and Advertising</h2>
          <p>We use essential cookies to provide our services. We may also use third-party advertising partners (like Google AdSense) who may use cookies to serve ads based on your prior visits to our website or other websites.</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-zinc-900 mb-4">5. Contact Us</h2>
          <p>If you have any questions about this privacy policy, please contact us at support@convertly.com.</p>
        </section>
      </div>
    </motion.div>
  </div>
);

const TermsPage = () => (
  <div className="mx-auto max-w-4xl px-4 py-24 sm:px-6 lg:px-8">
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="prose prose-zinc max-w-none"
    >
      <h1 className="text-4xl font-black text-zinc-900 mb-8">Terms of Service</h1>
      <p className="text-zinc-500 text-lg mb-8">Last Updated: March 31, 2026</p>

      <div className="space-y-8 text-zinc-600 font-medium">
        <section>
          <h2 className="text-2xl font-bold text-zinc-900 mb-4">1. Acceptance of Terms</h2>
          <p>By accessing and using Convertly, you accept and agree to be bound by the terms and provision of this agreement.</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-zinc-900 mb-4">2. Description of Service</h2>
          <p>Convertly provides users with access to a collection of file conversion and manipulation tools. You understand and agree that the Service is provided "AS-IS" and that Convertly assumes no responsibility for the timeliness, deletion, or failure to store any user communications or personalization settings.</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-zinc-900 mb-4">3. User Conduct</h2>
          <p>You agree not to use the Service to process any content that is unlawful, harmful, threatening, abusive, harassing, defamatory, vulgar, obscene, or otherwise objectionable. You are solely responsible for the content you upload.</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-zinc-900 mb-4">4. Pro Subscriptions</h2>
          <p>Pro plan subscriptions provide increased limits and priority processing. Subscriptions are billed in advance on a monthly basis and are non-refundable except as required by law.</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-zinc-900 mb-4">5. Modifications to Service</h2>
          <p>Convertly reserves the right at any time to modify or discontinue, temporarily or permanently, the Service (or any part thereof) with or without notice.</p>
        </section>
      </div>
    </motion.div>
  </div>
);

const ContactPage = () => (
  <div className="mx-auto max-w-5xl px-4 py-24 sm:px-6 lg:px-8">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
      >
        <h1 className="text-5xl font-black text-zinc-900 mb-6">Get in Touch</h1>
        <p className="text-xl text-zinc-500 font-medium leading-relaxed mb-10">
          Have questions about our tools or need help with your Pro subscription? Our team is here to help you 24/7.
        </p>
        
        <div className="space-y-8">
          <div className="flex items-center gap-6">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-50 text-orange-600">
              <Zap className="h-7 w-7 fill-current" />
            </div>
            <div>
              <h4 className="font-bold text-zinc-900">Email Us</h4>
              <p className="text-zinc-500 font-medium">support@convertly.com</p>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
              <Shield className="h-7 w-7" />
            </div>
            <div>
              <h4 className="font-bold text-zinc-900">Secure Support</h4>
              <p className="text-zinc-500 font-medium">Encrypted communication</p>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="rounded-[3rem] bg-zinc-50 border border-zinc-200 p-8 sm:p-12 shadow-xl shadow-zinc-200/20"
      >
        <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); toast.success("Message sent! We'll get back to you soon."); }}>
          <div className="space-y-2">
            <label className="text-sm font-bold text-zinc-900 ml-2">Full Name</label>
            <input type="text" required className="w-full rounded-2xl border border-zinc-200 bg-white px-6 py-4 text-sm font-medium focus:border-orange-600 focus:outline-none transition-all shadow-sm" placeholder="John Doe" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-zinc-900 ml-2">Email Address</label>
            <input type="email" required className="w-full rounded-2xl border border-zinc-200 bg-white px-6 py-4 text-sm font-medium focus:border-orange-600 focus:outline-none transition-all shadow-sm" placeholder="john@example.com" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-zinc-900 ml-2">Message</label>
            <textarea required rows={5} className="w-full rounded-2xl border border-zinc-200 bg-white px-6 py-4 text-sm font-medium focus:border-orange-600 focus:outline-none transition-all shadow-sm resize-none" placeholder="How can we help you today?" />
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
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="prose prose-zinc max-w-none"
    >
      <h1 className="text-4xl font-black text-zinc-900 mb-8">About Convertly</h1>
      <p className="text-zinc-500 text-lg mb-8 font-medium">
        Convertly is a leading provider of high-performance file conversion and manipulation tools. Our mission is to make file processing fast, secure, and accessible to everyone.
      </p>

      <div className="space-y-12 text-zinc-600 font-medium">
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-2xl font-bold text-zinc-900 mb-4">Our Mission</h2>
            <p>
              We believe that powerful software should be simple to use. Convertly was built to eliminate the frustration of complex file conversions, providing a streamlined experience that respects user privacy and data security.
            </p>
          </div>
          <div className="bg-orange-50 p-8 rounded-3xl border border-orange-100">
            <Zap className="h-12 w-12 text-orange-600 mb-4 fill-current" />
            <h3 className="text-xl font-bold text-zinc-900 mb-2">Speed First</h3>
            <p className="text-sm">Our cloud-native architecture ensures your files are processed in seconds, not minutes.</p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-zinc-900 mb-4">Why Choose Convertly?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="flex gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-green-50 text-green-600">
                <Shield className="h-5 w-5" />
              </div>
              <div>
                <h4 className="font-bold text-zinc-900">Privacy Guaranteed</h4>
                <p className="text-sm text-zinc-500">Files are automatically deleted 30 minutes after processing.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <CheckCircle2 className="h-5 w-5" />
              </div>
              <div>
                <h4 className="font-bold text-zinc-900">High Quality</h4>
                <p className="text-sm text-zinc-500">We use industry-standard libraries to ensure perfect results.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-zinc-900 rounded-[3rem] p-12 text-white text-center">
          <h2 className="text-3xl font-black mb-4">Ready to get started?</h2>
          <p className="text-zinc-400 mb-8 max-w-xl mx-auto">Join thousands of users who trust Convertly for their daily file processing needs.</p>
          <Link to="/" className="inline-block rounded-full bg-orange-600 px-10 py-4 font-black transition-all hover:bg-orange-700 hover:scale-105 active:scale-95">
            Explore Tools
          </Link>
        </section>
      </div>
    </motion.div>
  </div>
);

export default function App() {
  const [plan, setPlan] = useState("Free");
  const [isUpgradeModalOpen, setUpgradeModalOpen] = useState(false);
  const [isUpgrading, setIsUpgrading] = useState(false);

  const upgradePlan = async (type: string) => {
    setIsUpgrading(true);
    try {
      const response = await fetch("/api/plan/upgrade", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ planType: type }),
      });
      
      const data = await response.json();
      
      if (data.success) {
        toast.info("Redirecting to secure checkout...", {
          description: "Processing your payment securely."
        });
        
        await new Promise(resolve => setTimeout(resolve, 2500));
        
        setPlan(type);
        setUpgradeModalOpen(false);
        toast.success(`Successfully upgraded to ${type}!`);
      } else {
        throw new Error(data.message || "Upgrade failed");
      }
    } catch (error) {
      console.error("Upgrade failed:", error);
      toast.error("Checkout failed. Please try again.");
    } finally {
      setIsUpgrading(false);
    }
  };

  return (
    <PlanContext.Provider value={{ plan, upgradePlan, isUpgradeModalOpen, setUpgradeModalOpen }}>
      <Router>
        <Toaster position="top-center" richColors />
        <ScrollToTop />
        <div className="min-h-screen bg-white font-sans text-zinc-900 selection:bg-orange-100 selection:text-orange-900">
          <Navbar />
          <main>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/tool/:toolId" element={<ToolPage />} />
              <Route path="/privacy" element={<PrivacyPage />} />
              <Route path="/terms" element={<TermsPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/about" element={<AboutPage />} />
            </Routes>
          </main>
          <Footer />

          {/* Upgrade Modal */}
          <AnimatePresence>
            {isUpgradeModalOpen && (
              <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setUpgradeModalOpen(false)}
                  className="absolute inset-0 bg-zinc-900/60 backdrop-blur-sm"
                />
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: 20 }}
                  className="relative w-full max-w-lg overflow-hidden rounded-[2.5rem] bg-white shadow-2xl"
                >
                  {isUpgrading ? (
                    <div className="flex flex-col items-center justify-center p-16 text-center">
                      <div className="relative mb-8">
                        <div className="h-20 w-20 rounded-full border-4 border-zinc-100 border-t-orange-600 animate-spin" />
                        <Zap className="absolute top-1/2 left-1/2 h-8 w-8 -translate-x-1/2 -translate-y-1/2 text-orange-600 fill-current" />
                      </div>
                      <h2 className="text-2xl font-black text-zinc-900 mb-2">Secure Checkout</h2>
                      <p className="text-zinc-500 font-medium">Processing your payment through our encrypted gateway...</p>
                    </div>
                  ) : (
                    <>
                      <div className="bg-orange-600 p-10 text-center text-white relative overflow-hidden">
                        <div className="absolute top-0 left-0 h-full w-full opacity-20 pointer-events-none">
                          <Zap className="absolute -top-10 -left-10 h-40 w-40 rotate-12 fill-current" />
                        </div>
                        <Zap className="mx-auto mb-4 h-12 w-12 fill-current relative z-10" />
                        <h2 className="text-3xl font-black tracking-tight relative z-10">Upgrade to Pro</h2>
                        <p className="mt-2 text-orange-100 font-medium relative z-10">Unlock the full power of Convertly</p>
                      </div>
                      <div className="p-10">
                        <div className="mb-10 space-y-5">
                          {[
                            "Unlimited bulk conversions (up to 50 files)",
                            "Massive 2GB file size limit",
                            "Priority processing (10x faster)",
                            "No advertisements forever",
                            "Premium 24/7 support"
                          ].map((feature) => (
                            <div key={feature} className="flex items-center gap-4 text-sm font-bold text-zinc-700">
                              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-orange-50 text-orange-600 shrink-0">
                                <Check className="h-3.5 w-3.5 stroke-[3]" />
                              </div>
                              {feature}
                            </div>
                          ))}
                        </div>
                        <div className="flex flex-col gap-4">
                          <button
                            onClick={() => upgradePlan("Pro")}
                            className="w-full rounded-full bg-orange-600 py-5 text-lg font-black text-white shadow-lg shadow-orange-600/30 transition-all hover:bg-orange-700 hover:scale-[1.02] active:scale-[0.98]"
                          >
                            Proceed to Checkout • $9/mo
                          </button>
                          <button
                            onClick={() => setUpgradeModalOpen(false)}
                            className="w-full rounded-full py-3 text-sm font-bold text-zinc-400 hover:text-zinc-600 transition-colors"
                          >
                            Maybe later
                          </button>
                        </div>
                        <p className="mt-8 text-center text-[10px] text-zinc-400 font-black uppercase tracking-[0.2em]">
                          Secure 256-bit SSL Encrypted Payment
                        </p>
                      </div>
                    </>
                  )}
                </motion.div>
              </div>
            )}
          </AnimatePresence>
        </div>
      </Router>
    </PlanContext.Provider>
  );
}
