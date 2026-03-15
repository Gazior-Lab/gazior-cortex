import { useState } from "react";
import { ActivePanel } from "../types";

export function useLearnSpaceUI() {
  const [activePanel, setActivePanel] = useState<ActivePanel>("chat");
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isRightPanelOpen, setIsRightPanelOpen] = useState(true);
  const [isLeftPanelOpen, setIsLeftPanelOpen] = useState(true);

  const handlePanelChange = (panel: ActivePanel) => {
    setActivePanel(panel);
    if (window.innerWidth < 1024) setIsRightPanelOpen(false);
  };

  const toggleMobileSidebar = (open: boolean) => setIsMobileSidebarOpen(open);
  const toggleRightPanel = () => setIsRightPanelOpen(!isRightPanelOpen);
  const toggleLeftPanel = (open: boolean) => setIsLeftPanelOpen(open);

  return {
    activePanel,
    setActivePanel,
    isMobileSidebarOpen,
    setIsMobileSidebarOpen,
    isRightPanelOpen,
    setIsRightPanelOpen,
    isLeftPanelOpen,
    setIsLeftPanelOpen,
    handlePanelChange,
    toggleMobileSidebar,
    toggleRightPanel,
    toggleLeftPanel,
  };
}
