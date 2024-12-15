export default function VerifiersLayout({ children }: { children: React.ReactNode }) {
    return (
      <div className="verifiers-layout">
        <header className="bg-blue-600 text-white p-4">Verifiers Navbar</header>
        <main>{children}</main>
      </div>
    );
  }
  