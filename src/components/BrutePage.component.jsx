import React, { Component } from "react";
import BruteCard from "./bruteCard.component";

export default class BrutePage extends Component {
    state = {contract: null, accounts: null, brutes: [], playerBrutes: []};
  
    componentDidMount = async () => {
      try { 
        const contract =await this.props.contract;
        const accounts = await this.props.accounts;
        const brutes = await contract.methods.getBrutes().call();
        
 
        this.setState({ contract: contract, brutes: brutes, accounts: accounts}, this.getPlayerBrutes);
      } catch (error) {
        // Catch any errors for any of the above operations.
        alert(
          `Failed to load web3, accounts, or contract. Check console for details.`,
        );
        console.error(error);
      }
    };

    fetchBrutes = async () => {
        const {contract} = this.state;
        const brutes = await contract.methods.getBrutes().call();
        this.setState({brutes:brutes})
      }

    getPlayerBrutes = async () => {
        const {accounts} = this.state;
        await this.fetchBrutes()
        let brutesOfPlayer = this.state.brutes.filter(brute => brute.owner === accounts[0])
        this.setState({playerBrutes: brutesOfPlayer})
      }
  

    
    render() {
      return (
        <div>
            {this.state.playerBrutes.map(brute => (<BruteCard brute={brute} key={brute.id}/>))}
        </div>
      );
    }
}

// import React from 'react';
// import './bruteCard.styles.css'

// export default function BruteCardList({contract}) {
// return (
//     <div className="Card">
//         <p>#{brute.id}</p>
//         <p>Class: {brute.class}</p>
//         <p>sex: {brute.sex}</p>
//         <p>genes: {brute.genes[0]}</p>
//         <p>r1: {brute.genes[1]}</p>
//         <p>r2: {brute.genes[2]}</p>
//         <p>papa: {brute.lineage[0]}</p>
//         <p>mama: {brute.lineage[1]}</p>
//     </div>
// )
// }