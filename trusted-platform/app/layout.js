import { ThemeProvider } from 'next-themes'; // 1️⃣ Import ThemeProvider
import { ClerkProvider } from '@clerk/nextjs'; // 2️⃣ Import ClerkProvider for user authentication
import '@/styles/globals.css'; // 3️⃣ Import global CSS (optional)

export const metadata = {
  title: 'Your Website Title', 
  description: 'Your Website Description',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ClerkProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            {children} {/* This will render every page inside the app/ folder */}
          </ThemeProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
