import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  MessageSquare, 
  Search, 
  GraduationCap, 
  DollarSign, 
  Award, 
  TrendingUp, 
  FileText, 
  History,
  Bell,
  Settings,
  LogOut,
  ChevronRight,
  Clock,
  Users,
  BookOpen
} from "lucide-react";

const Dashboard = () => {
  const services = [
    {
      title: "Start Chat",
      description: "Get instant answers from our AI assistant",
      icon: MessageSquare,
      color: "bg-gradient-primary",
      link: "/chat",
      badge: "AI Powered"
    },
    {
      title: "College Finder",
      description: "Find the perfect college for your goals",
      icon: Search,
      color: "bg-gradient-secondary",
      link: "/college-finder",
      badge: "Popular"
    },
    {
      title: "Admission Info",
      description: "Complete admission process guidance",
      icon: GraduationCap,
      color: "bg-accent",
      link: "/admission-fees",
      badge: null
    },
    {
      title: "Fee Structure",
      description: "Detailed fee information for all courses",
      icon: DollarSign,
      color: "bg-success",
      link: "/admission-fees",
      badge: null
    },
    {
      title: "Scholarships",
      description: "Discover available scholarship opportunities",
      icon: Award,
      color: "bg-warning",
      link: "/scholarships-placement",
      badge: "Updated"
    },
    {
      title: "Placement Info",
      description: "Placement records and career guidance",
      icon: TrendingUp,
      color: "bg-secondary",
      link: "/scholarships-placement",
      badge: null
    },
    {
      title: "My Documents",
      description: "Manage your uploaded documents",
      icon: FileText,
      color: "bg-muted",
      link: "#",
      badge: null
    },
    {
      title: "Query History",
      description: "View your past conversations",
      icon: History,
      color: "bg-primary",
      link: "/query-history",
      badge: null
    },
  ];

  const recentActivity = [
    { type: "chat", title: "Asked about MBA admission criteria", time: "2 hours ago" },
    { type: "search", title: "Searched for engineering colleges in Pune", time: "1 day ago" },
    { type: "document", title: "Uploaded mark sheet", time: "3 days ago" },
  ];

  const notifications = [
    { title: "New scholarship scheme announced", time: "1 hour ago", type: "info" },
    { title: "Admission deadline reminder", time: "1 day ago", type: "warning" },
    { title: "Profile completion pending", time: "2 days ago", type: "alert" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-foreground">DTE AI Assistant</h1>
                <p className="text-xs text-muted-foreground">Dashboard</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="ghost" size="sm">
                <Bell className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Settings className="w-4 h-4" />
              </Button>
              <Link to="/">
                <Button variant="ghost" size="sm">
                  <LogOut className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Welcome back, Priya! 👋</h1>
              <p className="text-muted-foreground">
                Ready to continue your educational journey? Let's help you find what you need.
              </p>
            </div>
            <Badge variant="secondary" className="hidden md:flex">
              <Users className="w-3 h-3 mr-1" />
              Student
            </Badge>
          </div>
          
          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <Card className="p-4 shadow-card border-0">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <MessageSquare className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div className="text-lg font-bold text-foreground">24</div>
                  <div className="text-xs text-muted-foreground">Chat Sessions</div>
                </div>
              </div>
            </Card>
            <Card className="p-4 shadow-card border-0">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-secondary" />
                </div>
                <div>
                  <div className="text-lg font-bold text-foreground">12</div>
                  <div className="text-xs text-muted-foreground">Colleges Saved</div>
                </div>
              </div>
            </Card>
            <Card className="p-4 shadow-card border-0">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                  <Award className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <div className="text-lg font-bold text-foreground">8</div>
                  <div className="text-xs text-muted-foreground">Scholarships</div>
                </div>
              </div>
            </Card>
            <Card className="p-4 shadow-card border-0">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
                  <FileText className="w-5 h-5 text-success" />
                </div>
                <div>
                  <div className="text-lg font-bold text-foreground">6</div>
                  <div className="text-xs text-muted-foreground">Documents</div>
                </div>
              </div>
            </Card>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Services */}
          <div className="lg:col-span-2">
            <h2 className="text-xl font-bold text-foreground mb-6">Services</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {services.map((service, index) => (
                <Link key={index} to={service.link}>
                  <Card className="p-6 hover:shadow-elevated transition-all duration-300 hover:-translate-y-1 border-0 shadow-card group cursor-pointer">
                    <CardContent className="p-0">
                      <div className="flex items-start justify-between mb-4">
                        <div className={`w-12 h-12 ${service.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform`}>
                          <service.icon className="w-6 h-6 text-white" />
                        </div>
                        {service.badge && (
                          <Badge variant="secondary" className="text-xs">
                            {service.badge}
                          </Badge>
                        )}
                      </div>
                      <div className="space-y-2">
                        <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                          {service.title}
                        </h3>
                        <p className="text-sm text-muted-foreground">{service.description}</p>
                      </div>
                      <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all mt-3" />
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Recent Activity */}
            <Card className="shadow-card border-0">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center">
                  <Clock className="w-5 h-5 mr-2 text-primary" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 rounded-lg bg-muted/30">
                    <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      {activity.type === "chat" && <MessageSquare className="w-4 h-4 text-primary" />}
                      {activity.type === "search" && <Search className="w-4 h-4 text-primary" />}
                      {activity.type === "document" && <FileText className="w-4 h-4 text-primary" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground">{activity.title}</p>
                      <p className="text-xs text-muted-foreground">{activity.time}</p>
                    </div>
                  </div>
                ))}
                <Button variant="ghost" className="w-full text-sm">
                  View All Activity
                </Button>
              </CardContent>
            </Card>

            {/* Notifications */}
            <Card className="shadow-card border-0">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center">
                  <Bell className="w-5 h-5 mr-2 text-accent" />
                  Notifications
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {notifications.map((notification, index) => (
                  <div key={index} className="p-3 rounded-lg bg-muted/30">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p className="text-sm font-medium text-foreground">{notification.title}</p>
                        <p className="text-xs text-muted-foreground">{notification.time}</p>
                      </div>
                      <div className={`w-2 h-2 rounded-full flex-shrink-0 mt-2 ${
                        notification.type === "info" ? "bg-primary" :
                        notification.type === "warning" ? "bg-warning" : "bg-destructive"
                      }`} />
                    </div>
                  </div>
                ))}
                <Button variant="ghost" className="w-full text-sm">
                  View All Notifications
                </Button>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="shadow-card border-0 bg-gradient-primary text-white">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-3">Need Help?</h3>
                <p className="text-sm opacity-90 mb-4">
                  Our AI assistant is here to answer any questions you might have.
                </p>
                <Link to="/chat">
                  <Button variant="secondary" className="w-full">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Start Chat
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;