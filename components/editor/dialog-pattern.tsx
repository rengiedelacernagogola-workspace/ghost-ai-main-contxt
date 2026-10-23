"use client"

import type { ReactNode } from "react"
import type { Dialog as DialogPrimitive } from "@base-ui/react/dialog"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

type DialogPatternProps = DialogPrimitive.Root.Props & {
  title: ReactNode
  description?: ReactNode
  footer?: ReactNode
}

export function DialogPattern({
  title,
  description,
  footer,
  ...props
}: DialogPatternProps) {
  return (
    <Dialog {...props}>
      <DialogContent className="rounded-3xl border border-border-default bg-elevated text-text-primary ring-0">
        <DialogHeader>
          <DialogTitle className="text-text-primary">{title}</DialogTitle>
          {description ? (
            <DialogDescription className="text-text-muted">
              {description}
            </DialogDescription>
          ) : null}
        </DialogHeader>
        {footer ? (
          <DialogFooter className="border-border-default bg-subtle">
            {footer}
          </DialogFooter>
        ) : null}
      </DialogContent>
    </Dialog>
  )
}
