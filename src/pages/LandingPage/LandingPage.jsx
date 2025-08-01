import React from 'react';
import Container from '../../components/Container/Container';
import Hero from './components/Hero/Hero';
import Features from './components/Features/Features';

const LandingPage = () => {
    return (
        <div>
            <Container>
                <Hero></Hero>
                <Features></Features>
            </Container>
        </div>
    );
};

export default LandingPage;