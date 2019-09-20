import React, { Component } from 'react'

const ethers = require('ethers');

var uniswap_contract_abi = [{"name":"ethToTokenSwapInput","inputs":[{"type":"uint256","name":"min_tokens"},{"type":"uint256","name":"deadline"}],"type":"function","outputs":[{"type":"uint256","name":"out"}],"constant":false,"payable":true,"gas":12757},{"name":"getEthToTokenOutputPrice","inputs":[{"type":"uint256","name":"tokens_bought"}],"type":"function","outputs":[{"type":"uint256","name":"out"}],"constant":true,"payable":false,"gas":6872}]
var uniswap_contract_address = '0x3F0c63dA66457dedc2677BEF6bbdd457BA7A3C0b'

// only initiate the transaction once
var didExecuteIntent = false;

var web3context = null;

var intendedColrAmount = 0

async function get_exchange_rate_and_swap() {
	var exchangeContract = new ethers.Contract(uniswap_contract_address, uniswap_contract_abi, web3context.library)

	// get the exchange rate for the desired COLR amount
	var exchangeRateWei = await exchangeContract.getEthToTokenOutputPrice(intendedColrAmount)

	// convert to ETH
	var exchangeRateEth = exchangeRateWei / 10 ** 18
	
	// get contract interface
	var iface = new ethers.Interface(uniswap_contract_abi)	

	// take current time in seconds + 5 minutes
	var deadline = Math.round(new Date().getTime() / 1000) + 300;	

	console.log(typeof intendedColrAmount)
	// generate the call data for the exchange rate -- amount of eth we'll need
	var calldata = iface.functions.ethToTokenSwapInput.encode([100, deadline])

	console.log(calldata)

	// get the signer
	var signer = web3context.library.getSigner();

	// send the transaction
	// signer.sendTransaction({
	// 	to: uniswap_contract_address,
	// 	data: calldata,
	// 	value: ethers.utils.parseEther(exchangeRateEth.toString())
	// })
}

class ColorVendingV1 extends Component {
	constructor(props) {
		super(props)

		// set the web3 context
		web3context = this.props.props.context	

		// set the intended colr purchase amount
		intendedColrAmount = this.props.props.intentData.value;
	}

	componentDidMount() {
		if (didExecuteIntent === false) {			
			didExecuteIntent = true;

			get_exchange_rate_and_swap()		
		} 
	}

	render() {
		var etherscanLink = "https://etherscan.io/address/" + uniswap_contract_address
    	return (<div>
    		<p>Thank you for using the $COLR vending machine! Your have initiated a transaction for {intendedColrAmount} $COLR.</p>    		
    		<p>You can verify the $COLR uniswap exchange at this address: <b><a target="_blank" href={etherscanLink}>https://etherscan.io/address/{uniswap_contract_address}</a></b></p>
    		<p>Please be sure to check all inputs and gas value before submitting your transaction.</p>
    		<p>Close this window to return to Cryptovoxels.</p>
    		</div>
		)
	}
}

export default ColorVendingV1