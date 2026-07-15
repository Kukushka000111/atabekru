"use client";

import AboutContent from "@/components/commands/AboutContent";
import BakeryContent from "@/components/commands/BakeryContent";
import CommandStub from "@/components/commands/CommandStub";
import ContactContent from "@/components/commands/ContactContent";

interface CommandContentProps {
  commandName: string;
}

const COMMAND_COMPONENTS: Record<string, React.ComponentType> = {
  "/about": AboutContent,
  "/bakery": BakeryContent,
  "/contact": ContactContent,
};

export default function CommandContent({ commandName }: CommandContentProps) {
  const Component = COMMAND_COMPONENTS[commandName] ?? null;

  if (Component) {
    return <Component />;
  }

  return <CommandStub commandName={commandName} />;
}
