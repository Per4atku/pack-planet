import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import ProductCategories from '@/components/ProductCategories';
//import WhyChooseUs from '@/components/WhyChooseUs';
//import AboutSection from '@/components/AboutSection';

export default function Home() {
  return (
    <div className='min-h-screen'>
      <Hero />
      {/* <AboutSection /> */}
      <ProductCategories />
      {/* <WhyChooseUs /> */}
      <ContactSection />
      <Footer />
    </div>
  );
}
