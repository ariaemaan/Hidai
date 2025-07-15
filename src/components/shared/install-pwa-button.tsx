"use client";

import { useEffect, useState } from "react";
import { Download } from "lucide-react";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: Array<string>;
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed',
    platform: string
  }>;
  prompt(): Promise<void>;
}

export function InstallPWAButton() {
  const [prompt, setPrompt] = useState<BeforeInstallPromptEvent | null>(null);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setPrompt(e as BeforeInstallPromptEvent);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstall = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!prompt) return;
    prompt.prompt();
    prompt.userChoice.then(() => {
      setPrompt(null);
    });
  };

  if (!prompt) {
    return null;
  }

  return (
    <DropdownMenuItem onSelect={(e) => e.preventDefault()} onClick={handleInstall}>
      <Download className="mr-2 h-4 w-4" />
      <span>Install App</span>
    </DropdownMenuItem>
  );
}
