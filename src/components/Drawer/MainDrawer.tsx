import { ReactNode } from 'react';
import { MdTune } from 'react-icons/md';
import { Drawer, DrawerTrigger, DrawerContent, DrawerClose, DrawerFooter } from '../ui/drawer';
import {Button} from '../ui/button';
import { cn } from "@/lib/utils"

interface VaulDrawerProps {
  className?: string;
  children: ReactNode;
}


export default function VaulDrawer({className, children}: VaulDrawerProps) {
  return (
<Drawer>
  <DrawerTrigger><MdTune className={cn(className)}/></DrawerTrigger>
  <DrawerContent className='bg-zinc-900'>
    <div className='px-4 sm:mx-20 overflow-y-auto pt-2'>
        {children}
    </div>
    <DrawerFooter>
      <DrawerClose>
        <Button variant="outline">Close</Button>
      </DrawerClose>
    </DrawerFooter>
  </DrawerContent>
</Drawer>
  );
}