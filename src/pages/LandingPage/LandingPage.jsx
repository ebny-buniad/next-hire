import React from 'react';
import Container from '../../components/Container/Container';
import Hero from './components/Hero/Hero';
import Features from './components/Features/Features';
import PlatformAnalytics from './components/PlatformAnalytics/PlatformAnalytics';

const LandingPage = () => {
    return (
        <div>
            <Container>
                <Hero></Hero>
                <Features></Features>
                <PlatformAnalytics></PlatformAnalytics>
            </Container>
        </div>
    );
};

export default LandingPage;