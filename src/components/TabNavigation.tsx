import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Film, Users, Calendar, MessageCircle } from "@/lib/icon-imports";

const TabNavigation = React.memo(() => {
  const location = useLocation();
  
  const tabs = [
    {
      path: "/cortometrajes",
      label: "Cortos",
      icon: Film,
    },
    {
      path: "/artistas", 
      label: "Artistas",
      icon: Users,
    },
    {
      path: "/eventos",
      label: "Eventos", 
      icon: Calendar,
    },
    {
      path: "/comunidad",
      label: "Comunidad",
      icon: MessageCircle,
    },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-background/95 backdrop-blur-sm border-t border-border md:hidden">
      <div className="flex items-center justify-around py-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const active = isActive(tab.path);
          
          return (
            <Link
              key={tab.path}
              to={tab.path}
              className={`flex flex-col items-center py-2 px-3 rounded-lg transition-colors ${
                active 
                  ? "text-primary bg-primary/10" 
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Icon className="h-5 w-5 mb-1" />
              <span className="text-xs font-medium">{tab.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
});

TabNavigation.displayName = 'TabNavigation';

export default TabNavigation;