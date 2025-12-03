// src/pages/HomePage.tsx
import React from 'react';

import HeroSection from '../components/sections/HeroSection';
import CategorySection from '../components/sections/CategorySection';
import FeaturedSection from '../components/sections/FeaturedSection';

import { homePageContent } from '../data/uiContent';

const HomePage: React.FC = () => {
    
    React.useEffect(() => {
        document.title = homePageContent.pageTitle || 'Level-Up Gamer - Inicio';
    }, []);

    return (
        <div>
            <HeroSection />
            <div className="my-3 my-md-5">
                <CategorySection />
            </div>
            <div className="my-3 my-md-5">
                <FeaturedSection />
            </div>
        </div>
    );
};

export default HomePage;