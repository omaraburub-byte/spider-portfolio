export default function Footer() {
  return (
    <footer className="bg-spider-gray border-t border-gray-800 mt-16">
      <div className="container mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <div className="font-sacramento text-2xl text-spider-red">O. Aburub</div>
            <p className="font-montserrat text-gray-400 text-sm mt-1">Spider of Software Engineering</p>
          </div>
          
          <div className="text-center md:text-right">
            <p className="text-gray-400 text-sm">
              &copy; {new Date().getFullYear()} Omar Aburub. All rights reserved.
            </p>
            <p className="text-gray-500 text-xs mt-1">
              Built with Next.js, Tailwind CSS, and ❤️
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}