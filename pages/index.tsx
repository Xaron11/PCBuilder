import Hero from '../components/hero';
import ContactForm from '../components/contactForm';

export default function Home() {
  return (
    <>
      <Hero />
      <ContactForm />
    </>
  );
}

export async function getStaticProps() {
  return {
    props: {},
  };
}
