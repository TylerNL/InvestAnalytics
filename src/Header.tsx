


function Header() {
    return (
        <nav className="fixed top-6 right-8 flex space-x-4 z-50">
            <a href="/">
                <button className="relative text-base text-md font-medium transition-all duration-300 px-4 py-2 rounded bg-[var(--accent-gold)] text-white hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-400 shadow-md">Home</button>
            </a>
            <a href="/about">
                <button className="relative text-base text-md font-medium transition-all duration-300 px-4 py-2 rounded bg-[var(--accent-gold)] text-white hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-400 shadow-md">About</button>
            </a>
            <a href="/services">
                <button className="relative text-base text-md font-medium transition-all duration-300 px-4 py-2 rounded bg-[var(--accent-gold)] text-white hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-400 shadow-md">Services</button>
            </a>
            <a href="/contact">
                <button className="relative text-base text-md font-medium transition-all duration-300 px-4 py-2 rounded bg-[var(--accent-gold)] text-white hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-400 shadow-md">Contact</button>
            </a>
        </nav>
    );
}

export default Header