import React, { Component } from "react";
import BruteCoreContract from "./contracts/BruteCore.json";
import getWeb3 from "./getWeb3";
// import BrutePage from './components/BrutePage.component'
// import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
// import Navbar from "./components/Navbar";

import * as s from './App.styles';
import Sidebar from './components/Sidebar/Sidebar';
import MainView from './components/MainView/MainView';


class App extends Component {
  state = {web3: null, accounts: null, contract: null};

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = BruteCoreContract.networks[networkId];
      const instance = new web3.eth.Contract(
        BruteCoreContract.abi,
        deployedNetwork && deployedNetwork.address,
      );

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, accounts, contract: instance });
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  // fetchBrutes = async () => {
  //   const {contract } = this.state;
  //   const brutes = await contract.methods.getBrutes().call();
  //   this.setState({bruteArray:brutes})
  // }

  // getPlayerBrutes = async () => {
  //   const {accounts} = this.state;
  //   await this.fetchBrutes()
  //   let brutesOfPlayer = this.state.bruteArray.filter(brute => brute.owner === accounts[0])
  //   this.setState({playerBrutes: brutesOfPlayer})
  // }

  // buySFTbrute = async () => {
  //   const {contract, accounts } = this.state;
  //   await contract.methods.buySFTBrute(1).send({from: accounts[0]})
  //   this.getPlayerBrutes()
  // }

  // generateBrute = async () => {
  //   const {contract, accounts } = this.state;
  //   await contract.methods.mintGenisisBrute(2).send({from: accounts[0]})
  //   this.getPlayerBrutes()
  // }


  // transfer = async () => {
  //   const {contract, accounts } = this.state;
  //   await contract.methods.transferBrute("0x8442cb51D49D3DCAdBDC4616d7a5B41eA69fbBd3", 15).send({from: accounts[0]})
  //   await this.getPlayerBrutes()

  // }
  
  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }

    const backgroundImage = 'image/BRUTES_ARC_4.png';
    const sidebarHeader = {
      fullName : 'BRUTES.ES',
      shortName : 'B'
    };

    const menuItems = [
      {name: 'Brutes', to: '/brutes', icon: 'icons/GAMEPLAY_ICONS_ATK.png', 
        subMenuItems: [
          {name: 'BruteFactory', to: '/brutefactory'},
          {name: 'BruteMall', to: '/brutemall'},
          {name: 'BruteHotel', to: '/brutehotel'}
      ]},
      {name: 'Gears', to: '/gears', icon: 'icons/GAMEPLAY_ICONS_MAG.png',
         subMenuItems: [
          {name: 'EquipmentShop', to: '/equipmentshop'},
          {name: 'Forge', to: '/forge'},
          {name: 'Junkyard', to: '/junkyard'}
         ]},
      {name: 'Marketplace', to: '/marketplace', icon: 'icons/GAMEPLAY_ICONS_DEF.png',
         subMenuItems: [
          {name: 'Brutes', to: '/brutes'},
          {name: 'Gears', to: '/gears'}
         ]},
      {name: 'Account', to: '/account', icon: '', 
        subMenuItems: [
          {name: 'Dashboard', to: '/dashboard'},
          {name: 'Inventary', to: '/invantary'},
          {name: 'Success', to: '/success'},
          {name: 'History', to: '/history'},
          {name: 'Parameters', to: '/parameters'}
      ]},
      {name: 'Home', to: '/', icon: '', subMenuItems: []}
    ];

    const fonts = {
      header: 'ZCOOL KuaiLe',
      menu: 'Poppins'
    }

    return (
          <s.App>
            <Sidebar 
              backgroundImage={backgroundImage}
              sidebarHeader={sidebarHeader}
              menuItems={menuItems}
              fonts={fonts}
            />
            <MainView/>
          </s.App>
          // <Router>
          //     <Switch>
          //         <div>
          //           <Navbar>brutes of  {this.state.accounts[0]}</Navbar>
          //               <div className="container">
          //                 <div className="row">
          //                     <BrutePage className="CardList" contract={this.state.contract} accounts={this.state.accounts}>
          //                       <button onClick={this.generateBrute}>Generate Brute</button> 
          //                       <button onClick={this.buySFTbrute}>Buy base Brute</button>
          //                       <button onClick={this.transfer}>transfer</button>
          //                     </BrutePage>
          //                 </div>
          //               </div>
          //         </div>
              
          //   </Switch>
          // </Router>
    );
  }
}

export default App;
