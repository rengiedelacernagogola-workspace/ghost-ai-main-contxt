"use client"

import { PanelLeftClose, PanelLeftOpen } from "lucide-react"

import { Button } from "@/components/ui/button"

type EditorNavbarProps = {
  sidebarOpen: boolean
  onToggleSidebar: () => void
}

export function EditorNavbar({
  sidebarOpen,
  onToggleSidebar,
}: EditorNavbarProps) {
  return (
    <header className="grid h-12 shrink-0 grid-cols-3 items-center border-b border-border-subtle bg-surface px-3">
      <div className="flex items-center">
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggleSidebar}
          aria-pressed={sidebarOpen}
          aria-label={sidebarOpen ? "Close sidebar" : "Open sidebar"}
        >
          {sidebarOpen ? <PanelLeftClose /> : <PanelLeftOpen />}
        </Button>
      </div>
      <div />
      <div />
    </header>
  )
}
