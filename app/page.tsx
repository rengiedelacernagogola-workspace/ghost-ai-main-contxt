import { EditorLayout } from "@/components/editor/editor-layout"

export default function Home() {
  return (
    <EditorLayout>
      <div className="h-full w-full bg-base" aria-label="Editor canvas" />
    </EditorLayout>
  )
}
