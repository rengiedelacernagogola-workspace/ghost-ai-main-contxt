"use client"

import { Plus, XIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "cn"

type ProjectSidebarProps = {
  isOpen: boolean
  onClose: () => void
}

function EmptyProjects({ label }: { label: string }) {
  return (
    <div className="flex flex-1 items-center justify-center rounded-2xl border border-dashed border-border-default px-4 py-8 text-center text-sm text-text-muted">
      {label}
    </div>
  )
}

export function ProjectSidebar({ isOpen, onClose }: ProjectSidebarProps) {
  return (
    <aside
      aria-label="Projects"
      aria-hidden={!isOpen}
      inert={!isOpen}
      className={cn(
        "absolute inset-y-0 left-0 z-30 flex w-80 flex-col border-r border-border-default bg-surface shadow-lg transition-transform duration-200 ease-out",
        isOpen ? "translate-x-0" : "pointer-events-none -translate-x-full"
      )}
    >
      <div className="flex items-center justify-between border-b border-border-subtle px-4 py-3">
        <h2 className="text-sm font-medium text-text-primary">Projects</h2>
        <Button
          variant="ghost"
          size="icon-sm"
          onClick={onClose}
          aria-label="Close projects"
        >
          <XIcon />
        </Button>
      </div>

      <Tabs defaultValue="my-projects" className="min-h-0 flex-1 gap-3 p-3">
        <TabsList className="w-full">
          <TabsTrigger value="my-projects">My Projects</TabsTrigger>
          <TabsTrigger value="shared">Shared</TabsTrigger>
        </TabsList>
        <TabsContent value="my-projects" className="flex min-h-0 flex-col">
          <EmptyProjects label="No projects yet" />
        </TabsContent>
        <TabsContent value="shared" className="flex min-h-0 flex-col">
          <EmptyProjects label="No shared projects yet" />
        </TabsContent>
      </Tabs>

      <div className="border-t border-border-subtle p-3">
        <Button className="w-full">
          <Plus />
          New Project
        </Button>
      </div>
    </aside>
  )
}
