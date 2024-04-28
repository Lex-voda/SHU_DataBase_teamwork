import NavBar from "./components/Navbar";

export default function AppsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-[100vh] flex-col">
      <NavBar />
      <div className="fixed w-[calc(100vw-240px)] h-screen top-0 left-[240px] ">{children}</div>
    </div>
  );
}
