import { SidebarProvider } from "@/components/ui/sidebar"
import {AppSidebar} from "@/components/Sidebar/AppSidebar"
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="flex flex-1">
        {children}
      </main>
    </SidebarProvider>
  )
}
