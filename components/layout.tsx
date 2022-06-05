import ResponsiveHeader from './header';
import Footer from './footer';

export default function Layout({ children }: { children: React.ReactNode }) {
  const links = [
    { link: '/#creator', label: 'Kreator' },
    { link: '/inspirations', label: 'Inspiracje' },
  ];
  return (
    <>
      <ResponsiveHeader links={links} />
      <main>{children}</main>
      <Footer links={links} />
    </>
  );
}
