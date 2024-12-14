import Link from "next/link"
import { FacebookIcon, TwitterIcon, InstagramIcon } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-background border-t">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <nav className="-mx-5 -my-2 flex flex-wrap justify-center" aria-label="Footer">
          <div className="px-5 py-2">
            <Link href="/terms" className="text-base text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-300">
              Terms of Service
            </Link>
          </div>
          <div className="px-5 py-2">
            <Link href="/privacy" className="text-base text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-300">
              Privacy Policy
            </Link>
          </div>
        </nav>
        <div className="mt-8 flex justify-center space-x-6">
          <Link href="#" className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300">
            <span className="sr-only">Facebook</span>
            <FacebookIcon className="h-6 w-6" aria-hidden="true" />
          </Link>
          <Link href="#" className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300">
            <span className="sr-only">Twitter</span>
            <TwitterIcon className="h-6 w-6" aria-hidden="true" />
          </Link>
          <Link href="#" className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300">
            <span className="sr-only">Instagram</span>
            <InstagramIcon className="h-6 w-6" aria-hidden="true" />
          </Link>
        </div>
        <p className="mt-8 text-center text-base text-gray-400">
          &copy; 2024 TrustEd. All rights reserved.
        </p>
      </div>
    </footer>
  )
}

