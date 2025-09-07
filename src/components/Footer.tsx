import IA_LOGO from "../assets/IA_LOGO.ico";

function Footer() {
    return (
        <footer className="bg-[#0b1c1e] text-white pt-8 pb-4 px-4 border-t border-teal-900">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center md:items-start justify-between gap-8">
                {/* Brand logo and name */}
                <div className="flex items-center gap-3 mb-4 md:mb-0">
                    <a href ="/">
                        <img src={IA_LOGO} alt="InvestAnalytics Logo" width={40} height={40} className="rounded" />
                    </a>
                </div>

                {/* Navigation */}
                <nav className="flex-1 flex justify-center">
                    <ul className="flex gap-8 text-base font-medium ml-10">
                        <li>
                            <a href="/" className="hover:text-[#FFD052] transition-colors">Home</a>
                        </li>
                        <li>
                            <a href="/Watchlist" className="hover:text-[#FFD052] transition-colors">Watchlist</a>
                        </li>
                        <li>
                            <a href="/News" className="hover:text-[#FFD052] transition-colors">Recent News</a>
                        </li>
                    </ul>
                </nav>

                {/* Socials */}
                <div className="flex gap-5">
                    <a href="https://github.com/your-github" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="hover:text-[#FFD052] transition-colors">
                        <svg width="24" height="24" fill="currentColor" className="inline-block"><path d="M12 2C6.477 2 2 6.484 2 12.021c0 4.428 2.865 8.184 6.839 9.504.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.004.07 1.532 1.032 1.532 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.221-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.025A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.338 1.909-1.295 2.748-1.025 2.748-1.025.546 1.378.202 2.397.1 2.65.64.7 1.028 1.595 1.028 2.688 0 3.847-2.337 4.695-4.566 4.944.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.749 0 .267.18.578.688.48C19.138 20.2 22 16.447 22 12.021 22 6.484 17.523 2 12 2z"/></svg>
                    </a>
                    <a href="https://linkedin.com/in/your-linkedin" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="hover:text-[#FFD052] transition-colors">
                        <svg width="24" height="24" fill="currentColor" className="inline-block"><path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-9h3v9zm-1.5-10.29c-.966 0-1.75-.79-1.75-1.76 0-.97.784-1.75 1.75-1.75s1.75.78 1.75 1.75c0 .97-.784 1.76-1.75 1.76zm13.5 10.29h-3v-4.5c0-1.08-.02-2.47-1.5-2.47-1.5 0-1.73 1.17-1.73 2.39v4.58h-3v-9h2.89v1.23h.04c.4-.76 1.38-1.56 2.84-1.56 3.04 0 3.6 2 3.6 4.59v4.74z"/></svg>
                    </a>
                    <a href="mailto:contact@investanalytics.com" aria-label="Email" className="hover:text-[#FFD052] transition-colors">
                        <svg width="24" height="24" fill="currentColor" className="inline-block"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 2v.01L12 13 4 6.01V6h16zm0 12H4V8.99l8 6.99 8-6.99V18z"/></svg>
                    </a>
                </div>
            </div>
            <div className="text-center text-xs text-gray-400 mt-6">
                &copy; {new Date().getFullYear()} InvestAnalytics. All rights reserved.
            </div>
        </footer>
    );
}

export default Footer;