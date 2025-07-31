import { useState, useEffect } from 'react';
import { Command } from 'cmdk';

export function CommandMenu() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    window.addEventListener('keydown', down);
    return () => window.removeEventListener('keydown', down);
  }, []);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-40 bg-black bg-opacity-50 flex items-center justify-center">
      <Command className="bg-white rounded-md w-80 p-4 shadow-lg">
        <Command.Input placeholder="Type a command..." />
        <Command.List>
          <Command.Item onSelect={() => alert('Profile clicked')}>Profile</Command.Item>
          <Command.Item onSelect={() => alert('Settings clicked')}>Settings</Command.Item>
          <Command.Item onSelect={() => alert('Logout clicked')}>Logout</Command.Item>
        </Command.List>
      </Command>
    </div>
  );
}