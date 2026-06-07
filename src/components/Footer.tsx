import { footerLinks } from "@/data/site-data";

export default function Footer() {
  return (
    <footer className="relative border-t border-white/5 bg-cosmic-black/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-white to-neutral-500 flex items-center justify-center">
              <span className="text-black font-bold text-sm">B</span>
            </div>
            <div>
              <p className="font-semibold text-white text-sm">Bangalore Vibecoders Association</p>
              <p className="text-xs text-neutral-500">Building the future with AI</p>
            </div>
          </div>

          <ul className="flex flex-wrap items-center justify-center gap-6">
            {footerLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-sm text-neutral-500 hover:text-white transition-colors"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <p className="text-xs text-neutral-600">
            &copy; {new Date().getFullYear()} BVA. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
