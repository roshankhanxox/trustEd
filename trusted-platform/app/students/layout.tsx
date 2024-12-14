export default function StudentsLayout({ children }: { children: React.ReactNode }) {
    return (
      <div className="students-layout">
        <header className="bg-blue-500 text-white p-4">Students Navbar</header>
        <main>{children}</main>
      </div>
    );
  }
  