

export default function AppsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-[100vh] flex-col p-8">
      <div className="mt-10 h-full">{children}</div>
    </div>
  );
}
