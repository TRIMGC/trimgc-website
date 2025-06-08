import React, { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";

import logo from "@/assets/logo.png";
import Inchicore from "@/assets/Inchicore.jpeg"// file must exist at src/assets/logo.png

import emailjs from "@emailjs/browser";


/* Placeholder images – swap with real project photos */
const galleryImages = [
  {
    src: "https://images.unsplash.com/photo-1503389152951-9f343605f61e?auto=format&fit=crop&w=800&q=80",
    alt: "Residential build exterior",
  },
  {
    src: "https://images.unsplash.com/photo-1506452464445-2c985332a443?auto=format&fit=crop&w=800&q=80",
    alt: "Open-plan kitchen renovation",
  },
  {
    src: "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=800&q=80",
    alt: "Commercial office fit-out",
  },
] as const;

interface QuoteFormData {
  name: string;
  email: string;
  phone: string;
  address: string;
  details: string;
  budget: string;
  startDate: string;
  availability: string;
}

const TrimGCWebsite: React.FC = () => {
  const [formData, setFormData] = useState<QuoteFormData>({
    name: "",
    email: "",
    phone: "",
    address: "",
    details: "",
    budget: "",
    startDate: "",
    availability: "",
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setFormData((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  try {
    /* 1) send the quote details to you */
    await emailjs.send(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID,     // template_new_quote
      { ...formData },
      import.meta.env.VITE_EMAILJS_PUBLIC_KEY
    );

    /* 2) send auto-reply to the visitor */
    await emailjs.send(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_EMAILJS_AUTOREPLY_ID,    // template_lead_autoreply
      { name: formData.name, email: formData.email },
      import.meta.env.VITE_EMAILJS_PUBLIC_KEY
    );

    alert("Thanks! Your request was sent successfully.");
    setFormData({
      name: "", email: "", phone: "", address: "",
      details: "", budget: "", startDate: "", availability: "",
    });
  } catch (err) {
    console.error(err);
    alert("Sorry—something went wrong. Please try again.");
  }
};



  return (
    <div className="font-sans text-slate-700 scroll-smooth">

      {/* ───── Hero / Header ───── */}
      <header className="bg-[#0E3F2A] text-white">
        <div className="container mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between">
          <div className="flex flex-col md:flex-row items-center
                justify-between gap-4 md:gap-6">
            <img
              src={logo}
              alt="TRIM logo"
              className="h-14 w-14 md:h-16 md:w-16"
            />
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">
              TRIM&nbsp;General&nbsp;Contractors
            </h1>
          </div>

          <Button
            onClick={() =>
              document
                .getElementById("quote")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="mt-4 md:mt-0 px-6 py-2 rounded-xl bg-white text-[#0E3F2A] font-semibold shadow"
          >
            Request&nbsp;A&nbsp;Quote
          </Button>
        </div>
      </header>

      {/* ───── About ───── */}
      <section id="about" className="py-16 bg-white">
        <div className="container mx-auto px-6 grid md:grid-cols-2 gap-10 items-start">
          {/* left column */}
          <div className="space-y-6">
            <h2 className="text-2xl sm:text-3xl font-bold mb-6">About&nbsp;Us</h2>

            <p className="text-xl font-semibold">
              Building trust. Raising standards.
            </p>

            <p>
              Trim General Contractors (<strong>TRIM</strong>) is a fresh face
              powered by seasoned hands. After more than a decade managing
              complex builds for leading firms, our founding team created TRIM
              to deliver a smarter, more personal construction experience.
            </p>

            {/* What We Do */}
            <h3 className="text-2xl font-bold mt-4">What We Do</h3>
            <ul className="list-disc list-inside space-y-1">
              <li><strong>Ground-up construction</strong> – from green-field sites to ribbon cuttings.</li>
              <li><strong>Major renovations &amp; expansions</strong> – breathing new life into existing spaces.</li>
              <li><strong>Tenant improvements &amp; fit-outs</strong> – fast-track interiors with minimal downtime.</li>
              <li><strong>Design-build partnerships</strong> – single-source accountability from concept to completion.</li>
            </ul>

            {/* How We Work */}
            <h3 className="text-2xl font-bold mt-4">How We Work</h3>
            <ol className="list-decimal list-inside space-y-1">
              <li><strong>Listen first</strong> – understand vision, budget, constraints.</li>
              <li><strong>Plan strategically</strong> – detailed schedules, proactive risk management.</li>
              <li><strong>Build safely</strong> – rigorous protocols protect people and property.</li>
              <li><strong>Communicate openly</strong> – clear updates keep you in control.</li>
            </ol>

            {/* Promise */}
            <h3 className="text-2xl font-bold mt-4">Our Promise</h3>
            <ul className="list-disc list-inside space-y-1">
              <li><strong>On-time delivery</strong> – milestones met, schedules respected.</li>
              <li><strong>Transparent costs</strong> – honest, itemized pricing.</li>
              <li><strong>Quality craftsmanship</strong> – every detail is our signature.</li>
            </ul>

            {/* Looking Ahead */}
            <h3 className="text-2xl font-bold mt-4">Looking Ahead</h3>
            <p>
              We’re ready to turn blueprints into benchmarks. Let’s create
              spaces that stand the test of time.
            </p>

            <p className="italic">
              Trim General Contractors — built on experience, driven by
              integrity.
            </p>
          </div>

          {/* right column image */}
          <img
            src={Inchicore}
            alt="TRIM crew at work"
            className="rounded-2xl shadow-lg"
          />
        </div>
      </section>

      {/* ───── Gallery ───── */}
      <section id="gallery" className="py-16 bg-slate-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-10">Our Work</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {galleryImages.map((img, i) => (
              <motion.img
                key={i}
                {...img}
                className="w-full h-64 object-cover rounded-2xl shadow-lg"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                viewport={{ once: true, amount: 0.2 }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ───── Quote Form ───── */}
      <section id="quote" className="py-16 bg-white">
        <div className="container mx-auto px-6 max-w-3xl">
          <h2 className="text-3xl font-bold text-center mb-10">Request A Quote</h2>

          <form
            onSubmit={handleSubmit}
            className="bg-slate-50 p-8 rounded-2xl shadow-xl grid gap-6"
          >
            {/* Name */}
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                placeholder="Your full name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            {/* Email */}
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            {/* Phone */}
            <div className="grid gap-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                placeholder="+353 01 234 5678"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>

            {/* Address */}
            <div className="grid gap-2">
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                name="address"
                placeholder="Project address"
                value={formData.address}
                onChange={handleChange}
                required
              />
            </div>

            {/* Details */}
            <div className="grid gap-2">
              <Label htmlFor="details">Project Details</Label>
              <Textarea
                id="details"
                name="details"
                rows={4}
                placeholder="Describe the work you need"
                value={formData.details}
                onChange={handleChange}
                required
              />
            </div>

            {/* Budget & Start Date */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="grid gap-2">
                <Label htmlFor="budget">Budget (€)</Label>
                <Input
                  id="budget"
                  name="budget"
                  type="number"
                  min="0"
                  step="100"
                  placeholder="e.g. 50000"
                  value={formData.budget}
                  onChange={handleChange}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="startDate">Ideal Start Date</Label>
                <Input
                  id="startDate"
                  name="startDate"
                  type="date"
                  value={formData.startDate}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Availability */}
            <div className="grid gap-2">
              <Label htmlFor="availability">
                Availability for Initial Consultation
              </Label>
              <Input
                id="availability"
                name="availability"
                placeholder="e.g. Weekdays after 3 pm"
                value={formData.availability}
                onChange={handleChange}
              />
            </div>

            <Button
              type="submit"
              className="mt-4 w-full py-3 text-lg font-semibold rounded-2xl shadow-md bg-[#0E3F2A] hover:bg-[#125339] text-white"
            >
              Submit
            </Button>
          </form>
        </div>
      </section>

      {/* ───── Contact ───── */}
      <section id="contact" className="py-14 bg-[#0E3F2A] text-white">
        <div className="container mx-auto px-6 text-center space-y-4">
          <h2 className="text-3xl font-bold">Get In Touch</h2>
          <p>
            Phone:&nbsp;
            <a href="tel:+353874770882" className="underline hover:no-underline">
              +353&nbsp;087&nbsp;477&nbsp;0882
            </a>
          </p>
          <p>
            Email:&nbsp;
            <a href="mailto:info@trimgc.ie" className="underline hover:no-underline">
              info@trimgc.ie
            </a>
          </p>
          <p className="text-sm">
            © {new Date().getFullYear()} TRIM General Contractors Ltd. All
            rights reserved.
          </p>
        </div>
      </section>
    </div>
  );
};

export default TrimGCWebsite;
