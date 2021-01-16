import React from 'react';
import * as s from './Section.styles';
import BrutePage from '../../../BrutePage.component.jsx';

const Section = props => {
    const section = props.match.params.section;
    const sections = {
        bruteFactory: {
            img: '/images/sections/BFact.png',
            description: 'Place to create your Brutes'
        },
        bruteMall: {
            img: '/images/sections/SFT.png',
            description: 'Place to get your SFT'
        },
        bruteHotel: {
            img: '/images/sections/Breeding.png',
            description: 'Place to breed... you know what I mean'
        }
    }

    // img={sections[section]['img']}
    //{sections[section]['description']}

    return (
        <s.SectionContainer>
            <s.SectionImage />
            <s.SectionDescription>PLACE TO DO YOUR STUFF</s.SectionDescription>
        </s.SectionContainer>
    )
}
export default Section;