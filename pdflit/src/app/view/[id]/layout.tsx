import DFlipScripts from '@/components/DFlipScripts';

export default function ViewLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-white">
      {children}
      <DFlipScripts />
    </div>
  );
} 