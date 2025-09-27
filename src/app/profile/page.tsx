"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import toast from 'react-hot-toast';
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  User,
  MapPin,
  Mail,
  Phone,
  Calendar,
  Briefcase,
  Star,
} from "lucide-react";

interface UserData {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  userType: "jobseeker" | "employer";
  location?: string;
  joinDate: string;
  profileImage?: string;
  bio?: string;
  skills: string[];
  experience: Array<{
    title: string;
    company: string;
    duration: string;
    description: string;
  }>;
  stats: {
    profileViews: number;
    applications: number;
    interviews: number;
    offers: number;
  };
}

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Get user data from localStorage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        setUserData({
          ...user,
          skills: ["React", "TypeScript", "Node.js", "Python", "AWS", "MongoDB"],
          experience: user.experience || [],
          stats: user.stats || {
            profileViews: 0,
            applications: 0,
            interviews: 0,
            offers: 0,
          },
        });
      } catch (error) {
        console.error("Error parsing user data:", error);
        toast.error("Error loading user data");
        router.push("/login");
      }
    } else {
      router.push("/login");
    }
    setIsLoading(false);
  }, [router]);

  const handleSave = () => {
    // In real app, this would update data via Supabase
    setIsEditing(false);
    toast.success("Your profile has been successfully updated")
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    toast.success("You have been successfully logged out");
    router.push("/");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-primary/5 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-primary/5 flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground mb-4">No user data found</p>
          <Button onClick={() => router.push("/login")}>
            Go to Login
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-primary/5">
      {/* Header */}
      <div className="bg-background/80 backdrop-blur border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-foreground">My Profile</h1>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => router.push("/")} className="cursor-pointer">
              Back to Home
            </Button>
            <Button variant="outline" onClick={handleLogout} className="cursor-pointer">
              Logout
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <Card className="shadow-lg border-0 bg-card/80 backdrop-blur">
              <CardHeader className="text-center">
                <Avatar className="w-24 h-24 mx-auto mb-4">
                  <AvatarImage
                    src={userData.profileImage}
                    alt={`${userData.firstName} ${userData.lastName}`}
                  />
                  <AvatarFallback className="text-2xl">
                    {userData.firstName[0]}
                    {userData.lastName[0]}
                  </AvatarFallback>
                </Avatar>
                <CardTitle className="text-xl">
                  {userData.firstName} {userData.lastName}
                </CardTitle>
                <CardDescription className="flex items-center justify-center gap-1 text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  {userData.location || "Not specified"}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3 text-sm">
                  <Mail className="w-4 h-4 text-muted-foreground" />
                  <span>{userData.email}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Phone className="w-4 h-4 text-muted-foreground" />
                  <span>{userData.phone || "Not provided"}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <span>
                    Joined {new Date(userData.joinDate).toLocaleDateString()}
                  </span>
                </div>

                <Separator />

                <div>
                  <h4 className="font-semibold mb-2">Skills</h4>
                  <div className="flex flex-wrap gap-2">
                    {userData.skills.length > 0 ? (
                      userData.skills.map((skill, index) => (
                        <Badge key={index} variant="secondary">
                          {skill}
                        </Badge>
                      ))
                    ) : (
                      <p className="text-sm text-muted-foreground">No skills added yet</p>
                    )}
                  </div>
                </div>

                <Button
                  className="cursor-pointer w-full bg-gradient-to-r from-blue-800 to-blue-900 hover:from-blue-900 hover:to-blue-950 shadow-md"
                  onClick={() => setIsEditing(!isEditing)}
                >
                  {isEditing ? "Cancel Edit" : "Edit Profile"}
                </Button>
              </CardContent>
            </Card>

            {/* Stats Card */}
            <Card className="mt-6 shadow-lg border-0 bg-card/80 backdrop-blur">
              <CardHeader>
                <CardTitle className="text-lg">Profile Stats</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-primary">
                      {userData.stats.profileViews}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Profile Views
                    </div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-success">
                      {userData.stats.applications}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Applications
                    </div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-warning">
                      {userData.stats.interviews}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Interviews
                    </div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-primary-dark">
                      {userData.stats.offers}
                    </div>
                    <div className="text-sm text-muted-foreground">Offers</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Bio Section */}
            <Card className="shadow-lg border-0 bg-card/80 backdrop-blur">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  About Me
                </CardTitle>
              </CardHeader>
              <CardContent>
                {isEditing ? (
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="bio">Bio</Label>
                      <textarea
                        id="bio"
                        className="w-full mt-1 p-3 border rounded-md resize-none h-32"
                        value={userData.bio}
                        onChange={(e) =>
                          setUserData((prev) => 
                            prev ? ({
                              ...prev,
                              bio: e.target.value,
                            }) : null
                          )
                        }
                      />
                    </div>
                    <Button
                      onClick={handleSave}
                      className="bg-gradient-to-r from-success to-success-light"
                    >
                      Save Changes
                    </Button>
                  </div>
                ) : (
                  <p className="text-muted-foreground leading-relaxed">
                    {userData.bio || "No bio added yet"}
                  </p>
                )}
              </CardContent>
            </Card>

            {/* Experience Section */}
            <Card className="shadow-lg border-0 bg-card/80 backdrop-blur">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Briefcase className="w-5 h-5" />
                  Experience
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {userData.experience.length > 0 ? (
                  userData.experience.map((exp, index) => (
                    <div
                      key={index}
                      className="border-l-2 border-primary/20 pl-4"
                    >
                      <h4 className="font-semibold text-foreground">
                        {exp.title}
                      </h4>
                      <p className="text-primary font-medium">{exp.company}</p>
                      <p className="text-sm text-muted-foreground mb-2">
                        {exp.duration}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {exp.description}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="text-muted-foreground">No experience added yet</p>
                )}
              </CardContent>
            </Card>

            {/* Job Recommendations */}
            <Card className="shadow-lg border-0 bg-card/80 backdrop-blur">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="w-5 h-5" />
                  Recommended Jobs
                </CardTitle>
                <CardDescription>
                  Based on your skills and experience
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      title: "Senior React Developer",
                      company: "TechStartup Co.",
                      match: "95%",
                      location: "Remote",
                    },
                    {
                      title: "Full Stack Engineer",
                      company: "InnovCorp",
                      match: "89%",
                      location: "San Francisco, CA",
                    },
                    {
                      title: "Frontend Lead",
                      company: "DesignHub",
                      match: "87%",
                      location: "New York, NY",
                    },
                  ].map((job, index) => (
                    <div
                      key={index}
                      className="p-4 bg-secondary/50 rounded-lg border border-border/50"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-semibold text-foreground">
                            {job.title}
                          </h4>
                          <p className="text-sm text-primary">{job.company}</p>
                          <p className="text-xs text-muted-foreground">
                            {job.location}
                          </p>
                        </div>
                        <Badge
                          variant="secondary"
                          className="bg-success/20 text-success"
                        >
                          {job.match} match
                        </Badge>
                      </div>
                      <Button size="sm" variant="outline" className="mt-2">
                        View Details
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
