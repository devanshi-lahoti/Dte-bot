import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useNavigate } from "react-router-dom";

import { 
  Send, 
  Paperclip, 
  GraduationCap, 
  ArrowLeft,
  Bot,
  User,
  Clock,
  DollarSign,
  Award,
  BookOpen,
  Building,
  FileText,
  Users,
  MessageSquare,
  Lightbulb
} from "lucide-react";


const ChatInterface = () => {
  const [messages, setMessages] = useState([
    {
      id: "1",
      type: "bot",
      content: "Hello! I'm your DTE AI Assistant. I'm here to help you with information about engineering and polytechnic colleges, admissions, fees, scholarships, and placements. What would you like to know?",
      timestamp: new Date()
    }
  ]);
  const isLoggedIn = !!localStorage.getItem("token"); // true if user logged in

  const navigate = useNavigate();
const token = localStorage.getItem("token"); // check if user is logged in


  const [inputMessage, setInputMessage] = useState("");
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);

  const handleLogout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("role");
  localStorage.removeItem("user");

  setMessages([
    {
      id: "1",
      type: "bot",
      content: "Hello! I'm your DTE AI Assistant. You can chat as guest or log in.",
      timestamp: new Date()
    }
  ]);

  navigate("/login"); // Make sure `useNavigate` is imported from react-router-dom
};


  const categories = [
    { id: "admission", label: "Admission Process", icon: GraduationCap, color: "bg-primary" },
    { id: "fees", label: "Fee Structure", icon: DollarSign, color: "bg-success" },
    { id: "scholarships", label: "Scholarships", icon: Award, color: "bg-warning" },
    { id: "colleges", label: "College Information", icon: Building, color: "bg-secondary" },
    { id: "courses", label: "Course Details", icon: BookOpen, color: "bg-accent" },
    { id: "placement", label: "Placement Records", icon: Users, color: "bg-muted" },
    { id: "documents", label: "Required Documents", icon: FileText, color: "bg-destructive" },
  ];

  const quickQuestions = [
    "What are the admission requirements for engineering?",
    "Tell me about scholarship opportunities",
    "What is the fee structure for polytechnic courses?",
    "Which colleges have the best placement records?",
  ];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

 const handleSendMessage = async () => {
  if (!inputMessage.trim()) return;

  const userMessage = {
    id: Date.now().toString(),
    type: "user",
    content: inputMessage,
    timestamp: new Date()
  };

  setMessages(prev => [...prev, userMessage]);
  setInputMessage("");

  // Typing indicator
  const typingMessage = {
    id: "typing",
    type: "bot",
    content: "Typing...",
    timestamp: new Date()
  };
  setMessages(prev => [...prev, typingMessage]);

  try {
    const token = localStorage.getItem("token") || undefined;

    const response = await fetch("http://localhost:8080/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` })
      },
      body: JSON.stringify({ message: userMessage.content })
    });

    // Remove typing
    setMessages(prev => prev.filter(msg => msg.id !== "typing"));

    if (!response.ok) {
      throw new Error("Network response not ok");
    }

    const data = await response.json();

    const botMessage = {
      id: Date.now().toString() + "_bot",
      type: "bot",
      content: data.reply || "I couldn't understand that.",
      timestamp: new Date()
    };

    setMessages(prev => [...prev, botMessage]);

  } catch (err) {
    console.error(err);

    setMessages(prev => prev.filter(msg => msg.id !== "typing"));

    setMessages(prev => [
      ...prev,
      {
        id: Date.now().toString() + "_error",
        type: "bot",
        content: "Sorry, something went wrong. Please try again.",
        timestamp: new Date()
      }
    ]);
  }
};



  

    

  const getBotResponse = (userInput) => {
    const input = userInput.toLowerCase();
    
    if (input.includes("admission") || input.includes("eligibility")) {
      return "For engineering admissions, you typically need to:\n\n1. Complete 12th grade with Physics, Chemistry, and Mathematics\n2. Appear for entrance exams like JEE Main, MHT-CET\n3. Meet the minimum percentage criteria (usually 50% for general category)\n4. Complete the counseling process\n\nWould you like specific information about any particular college or course?";
    }
    
    if (input.includes("scholarship") || input.includes("financial aid")) {
      return "There are several scholarship opportunities available:\n\n1. **Government Scholarships:**\n   - EBC Scholarship\n   - Minority Scholarship\n   - SC/ST/OBC Scholarships\n\n2. **Merit-based Scholarships:**\n   - Top rankers in entrance exams\n   - Academic excellence awards\n\n3. **Institution-specific Scholarships:**\n   - College-specific merit scholarships\n   - Need-based assistance\n\nWould you like detailed information about eligibility criteria for any specific scholarship?";
    }
    
    if (input.includes("fee") || input.includes("cost")) {
      return "Fee structure varies by institution and course type:\n\n**Government Colleges:**\n- Engineering: ₹50,000 - ₹1,50,000 per year\n- Polytechnic: ₹25,000 - ₹75,000 per year\n\n**Private Colleges:**\n- Engineering: ₹2,00,000 - ₹8,00,000 per year\n- Polytechnic: ₹1,00,000 - ₹3,00,000 per year\n\n*Additional costs include hostel, books, and other expenses.*\n\nWould you like detailed fee information for specific colleges?";
    }
    
    if (input.includes("placement") || input.includes("job")) {
      return "Placement records vary across institutions:\n\n**Top Engineering Colleges:**\n- Average package: ₹6-12 LPA\n- Highest package: ₹25-50 LPA\n- Placement rate: 80-95%\n\n**Major Recruiters:**\n- TCS, Infosys, Wipro, Cognizant\n- L&T, Mahindra, Bajaj\n- Amazon, Microsoft, Google\n\n**Polytechnic Placements:**\n- Average package: ₹2-4 LPA\n- Placement rate: 60-80%\n\nWould you like placement details for specific colleges or branches?";
    }
    
    return "I understand you're looking for information about technical education. I can help you with:\n\n• Admission processes and eligibility\n• College recommendations\n• Fee structures and financial aid\n• Scholarship opportunities\n• Course details and specializations\n• Placement records and career prospects\n• Required documents and deadlines\n\nPlease ask me something specific, or choose from the quick questions above!";
  };

  const handleQuickQuestion = (question) => {
    setInputMessage(question);
  };

  const handleFileUpload = () => {
    fileInputRef.current?.click();
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background flex">
      {/* Sidebar */}
      <div className="w-80 border-r bg-white/80 backdrop-blur-sm flex flex-col">
        {/* Sidebar Header */}
        <div className="p-4 border-b">
          <div className="flex items-center justify-between mb-4">
                {isLoggedIn && (
                <Link to="/dashboard" className="flex items-center text-muted-foreground hover:text-primary">
                <ArrowLeft className="w-4 h-4 mr-2" />
                   Back to Dashboard
                </Link>
                )}

                 <div className="p-4 border-t mt-auto">
  {localStorage.getItem("token") ? (
    <Button 
      onClick={handleLogout}
      >
      Log Out
    </Button>
  ) : (
    <Button
      onClick={() => {
        setMessages([
          {
            id: "1",
            type: "bot",
            content: "Hello! I'm your DTE AI Assistant. You can chat as guest or log in.",
            timestamp: new Date()
          }
        ]);
      }}
      variant="outline"
      className="w-full"
    >
      Reset Guest
    </Button>
  )}
</div>
          </div>

          

          
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-foreground">AI Assistant</h1>
              <p className="text-xs text-muted-foreground">Online and ready to help</p>
            </div>
          </div>

          

         

          
        </div>

        {/* Categories */}
        <div className="p-4">
          <h3 className="text-sm font-semibold text-foreground mb-3">Query Categories</h3>
          <div className="space-y-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => handleQuickQuestion(`Tell me about ${category.label.toLowerCase()}`)}
                className="w-full flex items-center space-x-3 p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors text-left"
              >
                <div className={`w-8 h-8 ${category.color} rounded-lg flex items-center justify-center`}>
                  <category.icon className="w-4 h-4 text-white" />
                </div>
                <span className="text-sm font-medium text-foreground">{category.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Quick Questions */}
        <div className="p-4 border-t mt-auto">
          <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center">
            <Lightbulb className="w-4 h-4 mr-2" />
            Quick Questions
          </h3>
          <div className="space-y-2">
            {quickQuestions.map((question, index) => (
              <button
                key={index}
                onClick={() => handleQuickQuestion(question)}
                className="w-full text-left p-2 text-xs text-muted-foreground hover:text-primary hover:bg-muted/30 rounded-md transition-colors"
              >
                "{question}"
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        {token ? (
    <>
      {/* Chat Header */}
      <div className="space-y-4 max-w-5xl mx-auto">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <MessageSquare className="w-7 h-6 text-white" />
            </div>
            <div>
              <h2 className="font-semibold text-foreground">DTE AI Assistant</h2>
              <p className="text-xs text-muted-foreground">Ask me anything about technical education</p>
            </div>
          </div>
          <Badge variant="secondary" className="bg-success/10 text-success border-success/20">
            Online
          </Badge>
        </div>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4 max-w-4xl mx-auto">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex items-start space-x-3 ${
                message.type === "user" ? "flex-row-reverse space-x-reverse" : ""
              }`}
            >
              {/* Avatar */}
              <div
                className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                  message.type === "user" ? "bg-primary text-white" : "bg-gradient-primary text-white"
                }`}
              >
                {message.type === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              {/* Message */}
              <div className={`flex-1 ${message.type === "user" ? "text-right" : ""}`}>
               <div
  className={`inline-block w-full max-w-[100%] p-4 rounded-lg break-words ${
    message.type === "user"
      ? "bg-primary text-white ml-auto text-right"
      : "bg-white shadow-lg border-0 mr-auto text-left"
  }`}
>
  <p className="text-sm whitespace-pre-wrap">{message.content}</p>
</div>

                <div className="flex items-center space-x-2 mt-1">
                  <Clock className="w-3 h-3 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

    {/* Input Area */}
<div className="p-4 border-t bg-white/80 backdrop-blur-sm">
  <div className="w-full max-w-20xl mx-auto flex items-center space-x-3">
    {/* Input container */}
    <div className="relative flex-1">
      <Input
        value={inputMessage}
        onChange={(e) => setInputMessage(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="Type your question about admissions, colleges, fees, scholarships..."
        className="w-full pr-16 py-4 text-sm rounded-xl border border-border shadow-sm"
      />

      
    </div>

    {/* Send Button */}
    <Button
      onClick={handleSendMessage}
      disabled={!inputMessage.trim()}
      className="px-7.5 py-3 rounded-xl"
      variant="gradient"
    >
      <Send className="w-5 h-5" />
    </Button>
  </div>
</div>



    </>
  ) : (
    // Guest view
    <div className="flex-1 flex flex-col items-center justify-center p-4">
      <h2 className="text-lg font-semibold text-foreground mb-2">
        Please log in to chat with the AI Assistant
      </h2>
      <p className="text-sm text-muted-foreground mb-4">
        Guest access is not allowed. You need an account to ask questions.
      </p>
      <Button onClick={() => navigate("/login")} variant="primary">
        Go to Login
      </Button>
    </div>
  )}
      </div>
    </div>
  );
};

export default ChatInterface;