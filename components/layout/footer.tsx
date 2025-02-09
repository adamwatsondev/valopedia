import Link from "next/link";
import { GithubIcon, LinkedinIcon, Mail } from "lucide-react";

export default function Footer() {
  return (
    <div className="flex w-full justify-center sm:justify-end gap-4 px-8 md:px-16 h-12 sm:h-20 items-center">
      <div className="flex items-center gap-4 justify-center">
        <Link href="/contact" className="focus:outline-none">
          <Mail className="text-black size-8 sm:size-10 dark:invert" />
        </Link>
        <Link
          href="https://github.com/adamwatsondev"
          className="focus:outline-none"
        >
          <GithubIcon className="text-black size-8 sm:size-10 dark:invert" />
        </Link>
        <Link
          href="https://www.linkedin.com/in/adamwatsondev"
          className="focus:outline-none"
        >
          <LinkedinIcon className="text-black size-8 sm:size-10 dark:invert" />
        </Link>
      </div>
    </div>
  );
}
