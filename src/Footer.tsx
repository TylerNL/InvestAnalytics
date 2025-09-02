// Need to add socials to footer.
function Footer(){
    return(
        <footer className="fixed bottom-0 right-0 w-full bg-black text-white text-center p-4">
            <p>&copy; {new Date().getFullYear()} Invest Analytics</p>
        </footer>
    );
}

export default Footer