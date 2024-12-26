"use client";

import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import {
  Settings,
  Menu,
  ChevronLeft,
  Upload,
  MessagesSquare
} from "lucide-react";
import { ModeToggle } from "@/components/modetoggle";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import ChatComponent from "@/components/chatcomponent";
import ReportComponent from "@/components/ReportComponent";

const Home = () => {
  const { toast } = useToast();
  const [reportData, setreportData] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  
  const onReportConfirmation = (data: string) => {
    setreportData(data);
    toast({
      description: "Report updated successfully",
      className: "premium-card",
    });
  };

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Sidebar */}
      <aside 
        className={`
          fixed md:relative z-20 h-full animated-transform
          ${sidebarOpen ? 'w-80' : 'w-0 md:w-20'} 
          glass-panel
        `}
      >
        <div className="flex h-full flex-col">
          {/* Sidebar Header */}
          <div className="h-16 flex items-center justify-between px-4 border-b border-border/50">
            <div className={`flex items-center gap-2 animated-transform
              ${sidebarOpen ? 'opacity-100' : 'opacity-0 md:opacity-100'}`}>
              <Upload className="h-5 w-5 text-primary" />
              <span className={`font-medium ${!sidebarOpen && 'md:hidden'}`}>
                Medical Reports
              </span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="hidden md:flex text-primary"
            >
              <ChevronLeft className={`h-5 w-5 animated-transform
                ${!sidebarOpen && 'rotate-180'}`} />
            </Button>
          </div>
          
          {/* Sidebar Content */}
          <div className="flex-1 overflow-auto premium-scrollbar p-4">
            <div className="premium-card rounded-lg p-4">
              <ReportComponent onReportConfirmation={onReportConfirmation} />
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="h-16 glass-panel border-b border-border/50 flex items-center justify-between px-4">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="md:hidden"
            >
              <Menu className="h-5 w-5" />
            </Button>
            <div className="flex items-center gap-2">
              <MessagesSquare className="h-5 w-5 text-primary" />
              <span className="font-medium">AI Assistant</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <ModeToggle />
            <Button variant="ghost" size="icon">
              <Settings className="h-5 w-5" />
            </Button>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-hidden p-4">
          <div className="h-full flex flex-col">
            {/* Mobile Report Access */}
            <div className="md:hidden mb-4">
              <Drawer>
                <DrawerTrigger asChild>
                  <Button 
                    variant="outline" 
                    className="w-full premium-card premium-hover"
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    View Report
                  </Button>
                </DrawerTrigger>
                <DrawerContent>
                  <div className="p-4 max-h-[80vh] overflow-auto premium-scrollbar">
                    <ReportComponent onReportConfirmation={onReportConfirmation} />
                  </div>
                </DrawerContent>
              </Drawer>
            </div>

            {/* Chat Area */}
            <div className="flex-1 premium-card rounded-lg overflow-hidden">
              <div className="h-full overflow-auto premium-scrollbar">
                <ChatComponent reportData={reportData} />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Home;