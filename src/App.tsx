import { ThemeProvider } from "@/components/ThemeProvider/ThemeProvider"
import PokeDex from "@/components/PokeDex"

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      {<PokeDex/>}
    </ThemeProvider>
  )
}

export default App
