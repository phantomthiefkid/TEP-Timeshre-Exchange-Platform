import React from 'react'

import { useRef } from 'react'
import Navigation from '../../components/Navbar/navigation'
import Discovery from './discovery'
import ExperiencePackage from './experiencePackage'
import Partner from './partner'
import Recommand from './recommand'
import Search from './search'
import Utility from './utility'
import Footer from '../../components/Footer/footer'

const LandingPage = () => {
    const searchRef = useRef(null);
    const handleScrollToSearch = () => {
        searchRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
    return (
        <>
            <Navigation />
            <Discovery onExploreClick={handleScrollToSearch}/>
            <div ref={searchRef}>
                <Search />
            </div>
            <Utility />
            <Recommand />
            <ExperiencePackage />
            <Partner />
            <Footer />
        </>
    )
}

export default LandingPage