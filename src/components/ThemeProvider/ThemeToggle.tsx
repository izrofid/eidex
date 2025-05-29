import { Moon, Sun, SunMoon } from "lucide-react"
import { Button } from "@headlessui/react"
import { useTheme } from "@/components/ThemeProvider/ThemeProvider"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  const cycleTheme = () => {
    const nextTheme = theme === "light" 
      ? "dark" 
      : theme === "dark" 
        ? "system" 
        : "light"
    setTheme(nextTheme)
  }

  return (
    <Button 
      onClick={cycleTheme} 
      className="rounded-md p-1.5 transition-colors hover:bg-zinc-700/50 active:bg-zinc-700 cursor-pointer"
    >
      {theme === "light" && (
        <Sun className="h-[1.2rem] w-[1.2rem] text-amber-500" />
      )}
      {theme === "dark" && (
        <Moon className="h-[1.2rem] w-[1.2rem] text-indigo-400" />
      )}
      {theme === "system" && (
        <SunMoon className="h-[1.2rem] w-[1.2rem] text-teal-500" />
      )}
      <span className="sr-only">
        {theme === "light" 
          ? "Switch to dark mode" 
          : theme === "dark" 
            ? "Switch to system theme" 
            : "Switch to light mode"}
      </span>
    </Button>
  )
}
