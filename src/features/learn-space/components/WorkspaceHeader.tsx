import { ArrowLeft, Menu, PanelLeft, PanelRight, Search } from "lucide-react";
import { Badge } from "./ui/Badge";
import { Button } from "./ui/Button";
import { Tooltip } from "./ui/Tooltip";
import { ActivePanel } from "../types";

interface WorkspaceHeaderProps {
  activeSessionTitle: string;
  activePanel: ActivePanel;
  isLeftPanelOpen: boolean;
  isRightPanelOpen: boolean;
  onMobileSidebarToggle: () => void;
  onLeftPanelToggle: (open: boolean) => void;
  onRightPanelToggle: () => void;
  onBackToChat: () => void;
}

export function WorkspaceHeader({
  activeSessionTitle,
  activePanel,
  isLeftPanelOpen,
  isRightPanelOpen,
  onMobileSidebarToggle,
  onLeftPanelToggle,
  onRightPanelToggle,
  onBackToChat,
}: WorkspaceHeaderProps) {
  return (
    <header className="h-14 bg-white border-b border-slate-100 flex items-center justify-between px-4 lg:px-6">
      <div className="flex items-center gap-3">
        <button
          onClick={onMobileSidebarToggle}
          className="lg:hidden p-1.5 hover:bg-slate-100 rounded-lg text-slate-500 transition-colors"
        >
          <Menu className="w-5 h-5" />
        </button>

        {!isLeftPanelOpen && (
          <Tooltip content="Open sidebar">
            <button
              onClick={() => onLeftPanelToggle(true)}
              className="hidden lg:flex p-1.5 hover:bg-slate-100 rounded-lg text-slate-500 transition-colors"
            >
              <PanelLeft className="w-5 h-5" />
            </button>
          </Tooltip>
        )}

        <div className="flex items-center gap-3 ml-1 lg:ml-0">
          <Badge
            variant="outline"
            className="hidden sm:inline-flex bg-slate-50/50"
          >
            Notebook
          </Badge>
          <h1 className="text-sm font-semibold text-slate-900 truncate max-w-50 md:max-w-md">
            {activeSessionTitle}
          </h1>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Tooltip content="Search in session">
          <Button variant="ghost" size="sm" className="text-slate-400">
            <Search className="w-4 h-4" />
          </Button>
        </Tooltip>

        {activePanel !== "chat" && (
          <Button
            variant="outline"
            size="xs"
            onClick={onBackToChat}
            className="gap-1.5 hidden sm:flex"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Chat
          </Button>
        )}

        <Tooltip content={isRightPanelOpen ? "Close toolbox" : "Open toolbox"}>
          <button
            onClick={onRightPanelToggle}
            className={`p-1.5 rounded-lg transition-colors ml-1 ${
              !isRightPanelOpen
                ? "text-slate-800 hover:bg-slate-100 bg-slate-100/50"
                : "text-slate-500 hover:bg-slate-100"
            }`}
          >
            <PanelRight className="w-5 h-5" />
          </button>
        </Tooltip>

        <div className="w-8 h-8 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center ml-2 sm:ml-4 shrink-0">
          <span className="text-xs font-bold text-slate-500">JD</span>
        </div>
      </div>
    </header>
  );
}
