"use client";

import Link from "next/link";
import { Button } from "../ui/button";

interface BackButonProps {
  href: string;
  label: string;
}

const BackButton = ({ href, label }: BackButonProps) => {
  return (
    <Button variant="link" className="font-normal w-full" size="sm" asChild>
      <Link href={href}>{label}</Link>
    </Button>
  );
};

export default BackButton;
