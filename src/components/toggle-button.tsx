import type React from "react"
import { Button } from "@/components/ui/button"

interface ToggleButtonProps {
  isActive: boolean
  onClick: () => void
  children: React.ReactNode
}

export function ToggleButton({ isActive, onClick, children }: ToggleButtonProps) {
  return (
    <Button variant={isActive ? "default" : "outline"} onClick={onClick} className="flex-1">
      {children}
    </Button>
  )
}

