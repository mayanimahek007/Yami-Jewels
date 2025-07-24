import React from 'react';
import EditorialShowcase from './EditorialShowcase';
import CreativeShowcase from './CreativeShowcase';
import FeaturedCollection from './FeaturedCollection';
import ChooseTypeSection from './ChooseTypeSection';
import RadiantRefinementSection from './RadiantRefinementSection';
import GiftingSection from './GiftingSection';
import NewArrivalsPage from '../NewArrivalsPage';
import HeroSection from './HeroSection';
import Footer from './Footer';
import ProductDisplaySection from './ProductDisplaySection';
import Unique from './Unique';

const Home = () => {
    return (
        <>
            <HeroSection />
            <EditorialShowcase />
            <NewArrivalsPage />
            <ChooseTypeSection />
            <ProductDisplaySection />
            <FeaturedCollection />
            <Unique />
            <CreativeShowcase />
            <GiftingSection />
            <RadiantRefinementSection />
        
        </>
    )
}

export default Home