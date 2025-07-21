
function Footer(){
    return(
        <footer className="fixed bottom-0 right-0 w-full bg-gray-800 text-white text-center p-4">
            <p>&copy; {new Date().getFullYear()} Invest Analytics</p>
        </footer>
    );
}

export default Footer