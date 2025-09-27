"use client"
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const Header = () => {
  const router = useRouter();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center space-x-2">
          <span className="text-xl font-bold text-foreground">TalentHub</span>
        </div>

        <nav className="hidden md:flex items-center space-x-6">
          <a
            href="#features"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            Features
          </a>
          <a
            href="#how-it-works"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            How it Works
          </a>
          <a
            href="#pricing"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            Pricing
          </a>
        </nav>

        <div className="flex items-center space-x-3">
          <Button
            variant="ghost"
            onClick={() => router.push("/login")}
            className="cursor-pointer text-muted-foreground hover:text-foreground"
          >
            Sign In
          </Button>
          <Button
            variant="default"
            onClick={() => router.push("/register")}
           className="cursor-pointer bg-gradient-to-r from-blue-800 to-blue-900 hover:from-blue-900 hover:to-blue-950 shadow-md"

          >
            Get Started
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
