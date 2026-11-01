import { EditorLayout } from "@/components/editor/editor-layout"

export default function EditorPage() {
  return (
    <EditorLayout>
      <div className="h-full w-full bg-base" aria-label="Editor canvas" />
    </EditorLayout>
  )
}
