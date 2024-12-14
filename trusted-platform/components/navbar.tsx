"use client"

import Link from "next/link"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { MoonIcon, SunIcon } from "@radix-ui/react-icons"
import { SignInButton, UserButton, useUser } from "@clerk/nextjs"

export default function Navbar() {
  const { theme, setTheme } = useTheme()
  const { isSignedIn } = useUser()

  return (
    <nav className="bg-background border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link href="/" className="flex-shrink-0 flex items-center">
              TrustEd
            </Link>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link href="/" className="text-gray-900 dark:text-gray-100 inline-flex items-center px-1 pt-1 text-sm font-medium">
                Home
              </Link>
              <Link href="/for-students" className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 inline-flex items-center px-1 pt-1 text-sm font-medium">
                For Students
              </Link>
              <Link href="/for-verifiers" className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 inline-flex items-center px-1 pt-1 text-sm font-medium">
                For Verifiers
              </Link>
              <Link href="/about" className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 inline-flex items-center px-1 pt-1 text-sm font-medium">
                About Us
              </Link>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              aria-label="Toggle theme"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>
            {isSignedIn ? (
              <UserButton afterSignOutUrl="/" />
            ) : (
              <SignInButton mode="modal">
                <Button variant="outline" size="sm">
                  Sign In
                </Button>
              </SignInButton>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}



































// "use client"

// import Link from "next/link"
// import { useTheme } from "next-themes"
// import { Button } from "@/components/ui/button"
// import { MoonIcon, SunIcon } from "@radix-ui/react-icons"

// export default function Navbar() {
//   const { theme, setTheme } = useTheme()

//   return (
//     <nav className="bg-background border-b">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between h-16">
//           <div className="flex">
//             <Link href="/" className="flex-shrink-0 flex items-center">
//               TrustEd
//             </Link>
//             <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
//               <Link href="/" className="text-gray-900 dark:text-gray-100 inline-flex items-center px-1 pt-1 text-sm font-medium">
//                 Home
//               </Link>
//               <Link href="/for-students" className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 inline-flex items-center px-1 pt-1 text-sm font-medium">
//                 For Students
//               </Link>
//               <Link href="/for-verifiers" className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 inline-flex items-center px-1 pt-1 text-sm font-medium">
//                 For Verifiers
//               </Link>
//               <Link href="/about" className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 inline-flex items-center px-1 pt-1 text-sm font-medium">
//                 About Us
//               </Link>
//             </div>
//           </div>
//           <div className="flex items-center">
//             <Button
//               variant="ghost"
//               size="icon"
//               aria-label="Toggle theme"
//               className="mr-6"
//               onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
//             >
//               <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
//               <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
//               <span className="sr-only">Toggle theme</span>
//             </Button>
//           </div>
//         </div>
//       </div>
//     </nav>
//   )
// }

