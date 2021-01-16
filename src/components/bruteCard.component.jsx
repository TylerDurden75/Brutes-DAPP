import React from 'react';
import './bruteCard.styles.css'

function BruteCard({brute}) {
    return (
        <div className="Card">
            <p>#{brute.id}</p>
            <p>Class: {brute.class}</p>
            <p>sex: {brute.sex}</p>
            <p>genes: {brute.genes[0]}</p>
            <p>r1: {brute.genes[1]}</p>
            <p>r2: {brute.genes[2]}</p>
            <p>papa: {brute.lineage[0]}</p>
            <p>mama: {brute.lineage[1]}</p>
        </div>
    )
}

export default BruteCard;
