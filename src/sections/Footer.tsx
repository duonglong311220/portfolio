interface FooterProps {
  profileName: string;
  links: {
    github: string;
    linkedin: string;
  };
}

export default function Footer({ profileName, links }: FooterProps) {
  return (
    <footer className="py-10">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-zinc-500 dark:text-zinc-400">
        <div>
          © {new Date().getFullYear()} {profileName}. All rights reserved.
        </div>
        <div className="flex items-center gap-3">
          <a className="hover:underline" href={links.github}>
            GitHub
          </a>
          <span className="opacity-40">/</span>
          <a className="hover:underline" href={links.linkedin}>
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
}

