import { Header } from '@/widgets/header';
import { Footer } from '@/widgets/footer';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className="mt-auto min-h-screen">{children}</main>
      <Footer />
    </>
  );
}
