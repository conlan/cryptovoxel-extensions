import App from "./App";
import React, { Component } from 'react';
import Web3Provider from 'web3-react'
import { Connectors } from 'web3-react'

const { InjectedConnector } = Connectors
const MetaMask = new InjectedConnector({ supportedNetworks: [1, 4] })
const connectors = { MetaMask }

const intentData = {}

class AppWrapper extends Component {
	constructor() {
		super()

		// resolve warning
		window.ethereum.autoRefreshOnNetworkChange = false

		// grab the input params from the URL request
		let search = window.location.search;
		
		let params = new URLSearchParams(search);		

		intentData['intent'] = params.get('intent');
		intentData['value'] = params.get('value');
		intentData['version'] = params.get('version');
	}
	
	render() {
    	return (
    		<Web3Provider connectors={connectors} libraryName="ethers.js">
    			<App intentData={intentData}/>
    		</Web3Provider>
    	)
  	}
}
export default AppWrapper;