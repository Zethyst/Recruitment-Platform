"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const HeroSection = () => {
  const router = useRouter();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="/hero-recruitment.jpg"
          alt="Professional recruitment environment"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary-dark/80"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center text-white">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Connect Top
            <span className="block bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
              Talent with
            </span>
            Amazing Opportunities
          </h1>

          <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-2xl mx-auto leading-relaxed">
            The modern recruitment platform that matches exceptional candidates
            with forward-thinking companies using AI-powered precision.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              onClick={() => router.push("/register")}
              className="cursor-pointer bg-white text-primary hover:bg-white/90 shadow-lg px-8 py-6 text-lg font-semibold rounded-xl"
            >
              Start Hiring Today
            </Button>
            <Button
              size="lg"
              onClick={() => router.push("/register")}
              className="cursor-pointer bg-gradient-to-r from-blue-800 to-blue-900 hover:from-blue-900 hover:to-blue-950 text-white shadow-lg px-8 py-6 text-lg font-semibold rounded-xl"
            >
              Find Your Dream Job
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
