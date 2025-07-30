import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { 
  Search, 
  MapPin, 
  Star, 
  TrendingUp, 
  Users, 
  DollarSign,
  ArrowLeft,
  GraduationCap,
  Building,
  Award,
  Filter,
  ChevronRight
} from "lucide-react";

const CollegeRecommendation = () => {
  const [formData, setFormData] = useState({
    marks: [75],
    location: "",
    stream: "",
    preferences: "",
    budget: [500000],
    courseType: ""
  });
  
  const [showResults, setShowResults] = useState(false);
  const [filteredColleges, setFilteredColleges] = useState([]);

  const sampleColleges = [
    {
      id: "1",
      name: "College of Engineering Pune (COEP)",
      location: "Pune, Maharashtra",
      type: "Government",
      rating: 4.5,
      fees: { min: 80000, max: 120000 },
      placements: { average: 850000, highest: 2500000, percentage: 92 },
      courses: ["Computer Engineering", "Mechanical Engineering", "Electrical Engineering"],
      specializations: ["AI/ML", "Data Science", "Robotics"],
      established: 1854,
      image: "https://images.unsplash.com/photo-1562774053-701939374585?w=400"
    },
    {
      id: "2",
      name: "Veermata Jijabai Technological Institute (VJTI)",
      location: "Mumbai, Maharashtra",
      type: "Government",
      rating: 4.4,
      fees: { min: 75000, max: 110000 },
      placements: { average: 780000, highest: 2000000, percentage: 88 },
      courses: ["Computer Engineering", "Information Technology", "Electronics"],
      specializations: ["Cybersecurity", "IoT", "Blockchain"],
      established: 1887,
      image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=400"
    },
    {
      id: "3",
      name: "Pune Institute of Computer Technology (PICT)",
      location: "Pune, Maharashtra",
      type: "Private",
      rating: 4.3,
      fees: { min: 180000, max: 220000 },
      placements: { average: 950000, highest: 3000000, percentage: 95 },
      courses: ["Computer Engineering", "Information Technology"],
      specializations: ["AI/ML", "Data Science", "Cloud Computing"],
      established: 1999,
      image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400"
    }
  ];

  const locations = [
    "Mumbai", "Pune", "Nashik", "Nagpur", "Aurangabad", "Solapur", "Kolhapur", "Sangli"
  ];

  const streams = [
    "Computer Engineering", "Information Technology", "Mechanical Engineering", 
    "Electrical Engineering", "Civil Engineering", "Electronics Engineering",
    "Chemical Engineering", "Instrumentation Engineering"
  ];

  const handleSearch = () => {
    // Filter colleges based on form data
    let filtered = sampleColleges.filter(college => {
      const marksMatch = formData.marks[0] >= 60; // Assuming 60% minimum for these colleges
      const locationMatch = !formData.location || college.location.toLowerCase().includes(formData.location.toLowerCase());
      const streamMatch = !formData.stream || college.courses.some(course => course.toLowerCase().includes(formData.stream.toLowerCase()));
      const budgetMatch = college.fees.max <= formData.budget[0];
      
      return marksMatch && locationMatch && streamMatch && budgetMatch;
    });

    setFilteredColleges(filtered);
    setShowResults(true);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Link to="/dashboard" className="text-muted-foreground hover:text-primary">
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <div className="w-10 h-10 bg-gradient-secondary rounded-xl flex items-center justify-center">
                <Search className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-foreground">College Finder</h1>
                <p className="text-xs text-muted-foreground">Find your perfect college match</p>
              </div>
            </div>
            <Badge variant="secondary">
              <Filter className="w-3 h-3 mr-1" />
              Smart Recommendations
            </Badge>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Search Form */}
          <div className="lg:col-span-1">
            <Card className="shadow-elevated border-0 sticky top-24">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Search className="w-5 h-5 mr-2 text-primary" />
                  Find Your College
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Marks */}
                <div className="space-y-2">
                  <Label>Academic Marks/Percentage</Label>
                  <div className="px-3 py-2 bg-muted/30 rounded-lg">
                    <Slider
                      value={formData.marks}
                      onValueChange={(value) => setFormData({ ...formData, marks: value })}
                      max={100}
                      min={40}
                      step={1}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground mt-2">
                      <span>40%</span>
                      <span className="font-medium text-primary">{formData.marks[0]}%</span>
                      <span>100%</span>
                    </div>
                  </div>
                </div>

                {/* Location */}
                <div className="space-y-2">
                  <Label>Preferred Location</Label>
                  <Select value={formData.location} onValueChange={(value) => setFormData({ ...formData, location: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select city" />
                    </SelectTrigger>
                    <SelectContent>
                      {locations.map((location) => (
                        <SelectItem key={location} value={location}>{location}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Stream */}
                <div className="space-y-2">
                  <Label>Engineering Stream</Label>
                  <Select value={formData.stream} onValueChange={(value) => setFormData({ ...formData, stream: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select stream" />
                    </SelectTrigger>
                    <SelectContent>
                      {streams.map((stream) => (
                        <SelectItem key={stream} value={stream}>{stream}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Budget */}
                <div className="space-y-2">
                  <Label>Annual Budget</Label>
                  <div className="px-3 py-2 bg-muted/30 rounded-lg">
                    <Slider
                      value={formData.budget}
                      onValueChange={(value) => setFormData({ ...formData, budget: value })}
                      max={1000000}
                      min={50000}
                      step={25000}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground mt-2">
                      <span>₹50k</span>
                      <span className="font-medium text-primary">{formatCurrency(formData.budget[0])}</span>
                      <span>₹10L</span>
                    </div>
                  </div>
                </div>

                {/* Course Type */}
                <div className="space-y-2">
                  <Label>Course Type</Label>
                  <Select value={formData.courseType} onValueChange={(value) => setFormData({ ...formData, courseType: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select course type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="engineering">Engineering (B.Tech)</SelectItem>
                      <SelectItem value="polytechnic">Polytechnic (Diploma)</SelectItem>
                      <SelectItem value="postgraduate">Post Graduate (M.Tech)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Additional Preferences */}
                <div className="space-y-2">
                  <Label>Additional Preferences (Optional)</Label>
                  <Input
                    placeholder="e.g., hostel facility, research opportunities..."
                    value={formData.preferences}
                    onChange={(e) => setFormData({ ...formData, preferences: e.target.value })}
                  />
                </div>

                <Button onClick={handleSearch} className="w-full" size="lg" variant="gradient">
                  <Search className="w-4 h-4 mr-2" />
                  Find Colleges
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Results */}
          <div className="lg:col-span-2">
            {!showResults ? (
              <div className="text-center py-20">
                <div className="w-20 h-20 bg-gradient-secondary rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Search className="w-10 h-10 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-foreground mb-4">Find Your Perfect College</h2>
                <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                  Fill in your preferences and academic details to get personalized college recommendations.
                </p>
                <div className="grid md:grid-cols-3 gap-4 max-w-2xl mx-auto">
                  <Card className="p-4 shadow-card border-0">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                      <GraduationCap className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="font-semibold text-sm">Academic Match</h3>
                    <p className="text-xs text-muted-foreground">Based on your marks</p>
                  </Card>
                  <Card className="p-4 shadow-card border-0">
                    <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                      <MapPin className="w-6 h-6 text-secondary" />
                    </div>
                    <h3 className="font-semibold text-sm">Location Filter</h3>
                    <p className="text-xs text-muted-foreground">Preferred cities</p>
                  </Card>
                  <Card className="p-4 shadow-card border-0">
                    <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                      <DollarSign className="w-6 h-6 text-accent" />
                    </div>
                    <h3 className="font-semibold text-sm">Budget Friendly</h3>
                    <p className="text-xs text-muted-foreground">Within your range</p>
                  </Card>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-foreground">
                    Recommended Colleges ({filteredColleges.length})
                  </h2>
                  <Badge variant="secondary">
                    {formData.marks[0]}% Marks • {formData.location || "All Locations"}
                  </Badge>
                </div>

                {filteredColleges.length === 0 ? (
                  <Card className="p-8 text-center shadow-card border-0">
                    <div className="w-16 h-16 bg-muted rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <Search className="w-8 h-8 text-muted-foreground" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">No colleges found</h3>
                    <p className="text-muted-foreground mb-4">
                      Try adjusting your filters or budget to see more options.
                    </p>
                    <Button variant="outline" onClick={() => setShowResults(false)}>
                      Modify Search
                    </Button>
                  </Card>
                ) : (
                  <div className="space-y-4">
                    {filteredColleges.map((college) => (
                      <Card key={college.id} className="p-6 shadow-elevated border-0 hover:shadow-primary/10 transition-all duration-300 hover:-translate-y-1">
                        <div className="flex gap-6">
                          <img 
                            src={college.image} 
                            alt={college.name}
                            className="w-24 h-24 rounded-xl object-cover"
                          />
                          
                          <div className="flex-1 space-y-3">
                            <div className="flex items-start justify-between">
                              <div>
                                <h3 className="text-xl font-bold text-foreground">{college.name}</h3>
                                <div className="flex items-center space-x-4 text-sm text-muted-foreground mt-1">
                                  <div className="flex items-center">
                                    <MapPin className="w-4 h-4 mr-1" />
                                    {college.location}
                                  </div>
                                  <div className="flex items-center">
                                    <Building className="w-4 h-4 mr-1" />
                                    {college.type}
                                  </div>
                                  <div className="flex items-center">
                                    <Star className="w-4 h-4 mr-1 text-warning" />
                                    {college.rating}
                                  </div>
                                </div>
                              </div>
                              <Badge variant={college.type === "Government" ? "secondary" : "outline"}>
                                Est. {college.established}
                              </Badge>
                            </div>

                            <div className="grid md:grid-cols-3 gap-4">
                              <div className="flex items-center space-x-2">
                                <div className="w-8 h-8 bg-success/10 rounded-lg flex items-center justify-center">
                                  <DollarSign className="w-4 h-4 text-success" />
                                </div>
                                <div>
                                  <div className="text-sm font-medium">{formatCurrency(college.fees.min)} - {formatCurrency(college.fees.max)}</div>
                                  <div className="text-xs text-muted-foreground">Annual Fees</div>
                                </div>
                              </div>
                              
                              <div className="flex items-center space-x-2">
                                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                                  <TrendingUp className="w-4 h-4 text-primary" />
                                </div>
                                <div>
                                  <div className="text-sm font-medium">{formatCurrency(college.placements.average)}</div>
                                  <div className="text-xs text-muted-foreground">Avg. Package</div>
                                </div>
                              </div>
                              
                              <div className="flex items-center space-x-2">
                                <div className="w-8 h-8 bg-warning/10 rounded-lg flex items-center justify-center">
                                  <Users className="w-4 h-4 text-warning" />
                                </div>
                                <div>
                                  <div className="text-sm font-medium">{college.placements.percentage}%</div>
                                  <div className="text-xs text-muted-foreground">Placement Rate</div>
                                </div>
                              </div>
                            </div>

                            <div className="space-y-2">
                              <div className="flex flex-wrap gap-2">
                                {college.courses.slice(0, 3).map((course, i) => (
                                  <Badge key={i} variant="outline" className="text-xs">
                                    {course}
                                  </Badge>
                                ))}
                              </div>
                              
                              <div className="flex items-center justify-between">
                                <div className="flex flex-wrap gap-1">
                                  {college.specializations.slice(0, 3).map((spec, i) => (
                                    <Badge key={i} variant="secondary" className="text-xs bg-accent/10 text-accent">
                                      {spec}
                                    </Badge>
                                  ))}
                                </div>
                                <Button variant="outline" size="sm">
                                  View Details
                                  <ChevronRight className="w-3 h-3 ml-1" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollegeRecommendation;