import type { Metadata } from "next";
import { Inter } from 'next/font/google';
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { ClerkProvider } from "@clerk/nextjs";

// Set the font
const inter = Inter({ subsets: ["latin"] });

// Set the metadata
export const metadata: Metadata = {
  title: "TrustEd - Building Trust in Education Verification",
  description: "Secure and instant credential verification for students and verifiers.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body
          className={`${inter.className} antialiased min-h-screen flex flex-col`}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <div className="flex flex-col min-h-screen bg-background text-foreground">
              <Navbar />
              <main className="flex-grow">
                {children}
              </main>
              <Footer />
            </div>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}


































// import type { Metadata } from "next";
// import { Inter } from "next/font/google";
// import "./globals.css";
// import { ThemeProvider } from "@/components/theme-provider";
// import Navbar from "@/components/navbar";
// import Footer from "@/components/footer";
// import {
//   ClerkProvider,
//   SignedIn,
//   SignedOut,
//   SignInButton,
//   UserButton,
// } from "@clerk/nextjs";

// // Set the font
// const inter = Inter({ subsets: ["latin"] });

// // Set the metadata
// export const metadata: Metadata = {
//   title: "TrustEd - Building Trust in Education Verification",
//   description: "Secure and instant credential verification for students and verifiers.",
// };

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <ClerkProvider>
//       <html lang="en" suppressHydrationWarning>
//         <body
//           className={`${inter.className} antialiased min-h-screen flex flex-col`}
//         >
//           <ThemeProvider
//             attribute="class"
//             defaultTheme="system"
//             enableSystem
//             disableTransitionOnChange
//           >
//             <div className="flex flex-col min-h-screen bg-background text-foreground">
//               <Navbar />
//               <main className="flex-grow">
//                 {/* Show content based on authentication */}
//                 <SignedIn>
//                   {/* Authenticated users can see this */}
//                   <UserButton />
//                   {children}
//                 </SignedIn>
//                 <SignedOut>
//                   {/* Guests or unauthenticated users see this */}
//                   <div className="flex justify-center items-center h-full">
//                     <SignInButton mode="modal" />
//                   </div>
//                 </SignedOut>
//               </main>
//               <Footer />
//             </div>
//           </ThemeProvider>
//         </body>
//       </html>
//     </ClerkProvider>
//   );
// }
