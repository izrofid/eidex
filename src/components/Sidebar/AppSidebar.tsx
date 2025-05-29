import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
} from "@/components/ui/sidebar"

import PokedexSidebarContent from "@/components/Sidebar/PokedexSidebarContent.tsx"
import PokedexSidebarFooter from "./PokedexSidebarFooter"

// Menu items.

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <PokedexSidebarContent/>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <PokedexSidebarFooter />
        </SidebarFooter>
    </Sidebar>
  )
}
