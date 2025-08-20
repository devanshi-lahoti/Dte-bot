import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GraduationCap, Mail, Lock, Eye, EyeOff, ArrowLeft, Users, UserCheck, Shield } from "lucide-react";
import "@/styles/login.css";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [selectedRole, setSelectedRole] = useState("student");

  const roles = [
    { id: "student", label: "Student", icon: GraduationCap, description: "Current or prospective student" },
    { id: "parent", label: "Parent", icon: Users, description: "Parent/Guardian of student" },
    { id: "admin", label: "Admin", icon: Shield, description: "College/DTE administrator" },
  ];

  return (
    <div className="login-page">
      <div className="login-container">
        
        {/* Card wrapper */}
        <Card className="login-card">
          <div className="login-header">
            <Link to="/" className="inline-flex items-center text-gray-500 hover:text-primary mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" /> Back to Home
            </Link>
            <div className="login-icon">
              <GraduationCap className="w-8 h-8 text-white" />
            </div>
            <h1 className="login-title">Welcome to DTE AI Assistant</h1>
            <p className="login-subtitle">Sign in to access personalized features</p>
          </div>

          <div className="card-content">
            <Tabs defaultValue="signin" className="w-full">
              <TabsList className="tabs-list flex w-full">
                <TabsTrigger value="signin" className="tabs-trigger flex-1">Sign In</TabsTrigger>
                <TabsTrigger value="signup" className="tabs-trigger flex-1">Sign Up</TabsTrigger>
              </TabsList>

              {/* Sign In Form */}
              <TabsContent value="signin" className="space-y-6 mt-6">
                <div className="role-selection">
                  <h3>Select Your Role</h3>
                  <div className="grid gap-2">
                    {roles.map((role) => (
                      <button
                        key={role.id}
                        type="button"
                        onClick={() => setSelectedRole(role.id)}
                        className={`role-button ${selectedRole === role.id ? 'selected' : ''}`}
                      >
                        <div className="role-content">
                          <role.icon className="role-icon" />
                          <div className="role-text">
                            <div className="role-label">{role.label}</div>
                            <div className="role-description">{role.description}</div>
                          </div>
                          {selectedRole === role.id && <UserCheck className="role-check" />}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <form className="form-section">
                  <div className="form-group">
                    <Label className="form-label">Email Address</Label>
                    <div className="form-input">
                      <Mail className="icon" />
                      <Input id="email" type="email" placeholder="your.email@example.com" />
                    </div>
                  </div>
                  
                  <div className="form-group">
                    <Label className="form-label">Password</Label>
                    <div className="form-input">
                      <Lock className="icon" />
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="password-toggle"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                  
                  <Button className="submit-button" variant="gradient">Sign In</Button>
                </form>
              </TabsContent>

              {/* Sign Up Form */}
              <TabsContent value="signup" className="space-y-6 mt-6">
                <form className="form-section">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="form-group">
                      <Label className="form-label">First Name</Label>
                      <div className="form-input">
                        <Input id="firstName" placeholder="John" />
                      </div>
                    </div>
                    
                    <div className="form-group">
                      <Label className="form-label">Last Name</Label>
                      <div className="form-input">
                        <Input id="lastName" placeholder="Doe" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="form-group">
                    <Label className="form-label">Email Address</Label>
                    <div className="form-input">
                      <Mail className="icon" />
                      <Input id="signupEmail" type="email" placeholder="your.email@example.com" />
                    </div>
                  </div>
                  
                  <div className="form-group">
                    <Label className="form-label">Password</Label>
                    <div className="form-input">
                      <Lock className="icon" />
                      <Input
                        id="signupPassword"
                        type="password"
                        placeholder="Create a strong password"
                      />
                    </div>
                  </div>

                  <div className="text-xs text-muted-foreground text-center">
                    By creating an account, you agree to our{" "}
                    <a href="#" className="text-primary hover:underline">Terms of Service</a> and{" "}
                    <a href="#" className="text-primary hover:underline">Privacy Policy</a>.
                  </div>

                  <Button className="submit-button" variant="gradient">
                    Create Account
                  </Button>
                </form>
              </TabsContent>

            </Tabs>
          </div>
        </Card>

        <div className="login-footer">
          <Link to="/chat">Continue as Guest without signing in</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
