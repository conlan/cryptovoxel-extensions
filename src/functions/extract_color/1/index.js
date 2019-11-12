import React, { Component } from 'react';

import './ExtractColorV1.css';

const ethers = require('ethers');
var utils = require('ethers').utils

var colr_contract_ABI = [{"constant":true,"inputs":[],"name":"mintingFinished","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"}],"name":"approve","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_value","type":"uint256"},{"name":"_tokenId","type":"uint256"}],"name":"stake","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_amount","type":"uint256"}],"name":"mint","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"takeOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_subtractedValue","type":"uint256"}],"name":"decreaseApproval","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"finishMinting","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_amount","type":"uint256"},{"name":"_tokenId","type":"uint256"}],"name":"withdraw","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_parcel","type":"uint256"}],"name":"getStake","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_addedValue","type":"uint256"}],"name":"increaseApproval","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"},{"name":"_spender","type":"address"}],"name":"allowance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"amount","type":"uint256"}],"name":"Mint","type":"event"},{"anonymous":false,"inputs":[],"name":"MintFinished","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"burner","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Burn","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"value","type":"uint256"},{"indexed":false,"name":"_tokenId","type":"uint256"}],"name":"Staked","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"value","type":"uint256"},{"indexed":false,"name":"_tokenId","type":"uint256"}],"name":"Withdrawn","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"previousOwner","type":"address"},{"indexed":true,"name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"owner","type":"address"},{"indexed":true,"name":"spender","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Transfer","type":"event"}]
var colr_contract_address = "0x3867EF780a3AFCF1201EF4F2acc6A46e3bd1eb88"
var eth_gas_station_url = "https://ethgasstation.info/"

var web3context = null;
var app = null;

var stakedAmount = -1;
var parcelId = -1
var isFetchingStake = false;

async function getStakedAmount() {
	stakedAmount = -1
	app.setState({})

	parcelId = parseInt(document.getElementsByName("parcelInput")[0].value)

	if (parcelId == 0) {
		window.alert("Please provide a parcel ID.")
		return
	}
	if (isFetchingStake) {
		console.log("Already fetching")
		return
	}
	isFetchingStake = true;

	var colrContract = new ethers.Contract(colr_contract_address, colr_contract_ABI, web3context.library)

	console.log("Looking up stake amount for parcel #" + parcelId)
	
	// get the staked amount
	stakedAmount = (await colrContract.getStake(parcelId)).toString()

	isFetchingStake = false;
	
	console.log(stakedAmount + " COLR staked.")

	app.setState({})
}

function isAddress(address) {
    try {
        utils.getAddress(address);
    } catch (e) { return false; }
    return true;
}

async function withdrawStake() {
	console.log("withdraw stake")

	// reset the parcel id input
	document.getElementsByName("parcelInput")[0].value = ""

	var withdrawAmount = parseInt(document.getElementsByName("colr")[0].value)

	if (withdrawAmount > stakedAmount) {
		window.alert("You cannot withdraw more COLR than is staked.")
		return;
	}

	var recipientAddress = document.getElementsByName("address")[0].value

	if ((recipientAddress.length == 0) || (isAddress(recipientAddress) == false)) {
		window.alert("Please provide a valid recipient address.")
		return;
	}

	console.log(isAddress(recipientAddress))
	
	// get contract interface
	var iface = new ethers.Interface(colr_contract_ABI)	

	// generate the call data for the withdrawal
	var calldata = iface.functions.withdraw.encode(
		[recipientAddress, withdrawAmount, parcelId]
	)

	console.log("Calldata: " + calldata)

	stakedAmount = -1
	app.setState({})

	// get the signer
	var signer = web3context.library.getSigner();

	const tx = {
		to: colr_contract_address,
		data: calldata
	}

	// send the transaction
	signer.sendTransaction(tx)
}

class ExtractColorV1 extends Component {
	constructor(props) {
		super(props)

		// set the web3 context
		web3context = this.props.props.context	

		app = this.props.app;

		document.title += " Extract $COLR"
	}

	componentDidMount() {		
	}

	render() {
		var parcelLink = "https://www.cryptovoxels.com/parcels/" + parcelId;

		if (stakedAmount < 0) {
			return (<div>
	    		<p>Parcel ID (Ensure that you own this parcel, otherwise the transaction will <i>fail</i>):</p>
	    		<input type="number" name="parcelInput" min="1" max="4000"/>	    	
	    		<button onClick={getStakedAmount} type="button">LOAD</button>
	    		</div>
			)
		} else if (stakedAmount == 0) {
			return (<div>
	    		<p>Parcel ID (Ensure that you own this parcel, otherwise the transaction will <i>fail</i>):</p>
	    		<input type="number" name="parcelInput" min="1" max="4000"/>
	    		<button onClick={getStakedAmount} type="button">LOAD</button>
	    		<p><span>🌈</span> {stakedAmount} COLR staked on Parcel <a target="_blank" href={parcelLink}>#{parcelId}</a>.</p>
	    		<p><span>⛽️</span> Please be sure to check all inputs and gas before submitting your transaction. Recommended gas prices can be found at <b><a target="_blank" href={eth_gas_station_url}>{eth_gas_station_url}</a></b></p>
	    		</div>
			)
		} else {
	    	return (<div>
	    		<p>Parcel ID (Ensure that you own this parcel, otherwise the transaction will <i>fail</i>):</p>
	    		<input type="number" name="parcelInput" min="1" max="4000"/>
	    		<button onClick={getStakedAmount} type="button">LOAD</button>
	    		<p><span>🌈</span> {stakedAmount} COLR staked on Parcel <a target="_blank" href={parcelLink}>#{parcelId}</a>. Withdraw how much?</p>
	    		<input type="number" name="colr" min="1" max={stakedAmount}/>
				<p>Recipient wallet address:</p>
	    		<input name="address" defaultValue={web3context.account}/>	    		
	    		<button onClick={withdrawStake} type="button">WITHDRAW</button>
	    		<p><span>⛽️</span> Please be sure to check all inputs and gas before submitting your transaction. Recommended gas prices can be found at <b><a target="_blank" href={eth_gas_station_url}>{eth_gas_station_url}</a></b></p>
	    		<p>💥 Close this window after submitting to return to Cryptovoxels.</p>
	    		</div>
			)
	    }
	}
}

export default ExtractColorV1