import React from 'react';
import EditorialShowcase from './EditorialShowcase';
import CreativeShowcase from './CreativeShowcase';
import FeaturedCollection from './FeaturedCollection';
import ChooseTypeSection from './ChooseTypeSection';
import GiftingSection from './GiftingSection';
import NewArrivalsPage from '../NewArrivalsPage';
import NewArrivalsSection from './NewArrivalsSection';
import HeroSection from './HeroSection';
import ProductDisplaySection from './ProductDisplaySection';
import Unique from './Unique';
import ClientTestimonial from './ClientTestimonial';
import EditorialShowcase800 from './EditorialShowcase800';

const Home = () => {
    return (
        <>
            <HeroSection />
            <EditorialShowcase />
            <EditorialShowcase800 />
            <NewArrivalsPage />

            <ChooseTypeSection />
            <ProductDisplaySection />
            <FeaturedCollection />
            <Unique />
            <GiftingSection />
            <CreativeShowcase />
            {/* <NewArrivalsSection /> */}
            <ClientTestimonial />
            {/* <RadiantRefinementSection /> */}

        </>
    )
}

export default Home