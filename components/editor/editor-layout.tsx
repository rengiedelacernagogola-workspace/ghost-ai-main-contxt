"use client"

import { useState, type ReactNode } from "react"

import { DialogPattern } from "@/components/editor/dialog-pattern"
import { EditorNavbar } from "@/components/editor/editor-navbar"
import { ProjectSidebar } from "@/components/editor/project-sidebar"
import { Button } from "@/components/ui/button"

type EditorLayoutProps = {
  children?: ReactNode
}

export function EditorLayout({ children }: EditorLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [newProjectOpen, setNewProjectOpen] = useState(false)

  return (
    <div className="flex h-dvh min-h-0 flex-col bg-base text-text-primary">
      <EditorNavbar
        sidebarOpen={sidebarOpen}
        onToggleSidebar={() => setSidebarOpen((open) => !open)}
      />
      <div className="relative min-h-0 flex-1 overflow-hidden">
        <ProjectSidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          onNewProject={() => setNewProjectOpen(true)}
        />
        <main className="h-full min-h-0">{children}</main>
      </div>
      <DialogPattern
        open={newProjectOpen}
        onOpenChange={setNewProjectOpen}
        title="New Project"
        footer={
          <Button variant="ghost" onClick={() => setNewProjectOpen(false)}>
            Close
          </Button>
        }
      />
    </div>
  )
}
