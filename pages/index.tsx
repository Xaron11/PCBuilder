import Hero from '../components/hero';
import Creator from '../components/creator';
import ContactForm from '../components/contactForm';

export default function Home() {
  return (
    <>
      <Hero />
      <Creator />
      <ContactForm />
    </>
  );
}

export async function getStaticProps() {
  return {
    props: {},
  };
}
