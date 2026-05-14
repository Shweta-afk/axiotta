import logo from "../../images/axiotta-logo-r.png"; 

export default function Footer() {
  return (
    <footer className="border-t border-border py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-4 md:flex-row">
        
        {/* Logo + Copyright */}
        <div className="flex items-center gap-3">
          <img
            src={logo}
            alt="Axiotta Technologies"
            className="h-10 w-auto object-contain"
          />
          <span className="ml-3 text-xs text-muted-foreground">
            © {new Date().getFullYear()} All rights reserved.
          </span>
        </div>

        {/* Links */}
        <div className="flex gap-6 text-xs text-muted-foreground">
          <a href="/blog" className="hover:text-foreground">Blog</a>
          <a href="#" className="hover:text-foreground">Privacy</a>
          <a href="#" className="hover:text-foreground">Terms</a>
          <a href="#" className="hover:text-foreground">Compliance</a>
        </div>

      </div>
    </footer>
  );
}
