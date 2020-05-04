import React, { Component } from 'react'

const ethers = require('ethers');

var uniswap_contract_abi = [{"name":"TokenPurchase","inputs":[{"type":"address","name":"buyer","indexed":true},{"type":"uint256","name":"eth_sold","indexed":true},{"type":"uint256","name":"tokens_bought","indexed":true}],"type":"event","anonymous":false},{"name":"EthPurchase","inputs":[{"type":"address","name":"buyer","indexed":true},{"type":"uint256","name":"tokens_sold","indexed":true},{"type":"uint256","name":"eth_bought","indexed":true}],"type":"event","anonymous":false},{"name":"AddLiquidity","inputs":[{"type":"address","name":"provider","indexed":true},{"type":"uint256","name":"eth_amount","indexed":true},{"type":"uint256","name":"token_amount","indexed":true}],"anonymous":false,"type":"event"},{"name":"RemoveLiquidity","inputs":[{"type":"address","name":"provider","indexed":true},{"type":"uint256","name":"eth_amount","indexed":true},{"type":"uint256","name":"token_amount","indexed":true}],"anonymous":false,"type":"event"},{"name":"Transfer","inputs":[{"type":"address","name":"_from","indexed":true},{"type":"address","name":"_to","indexed":true},{"type":"uint256","name":"_value","indexed":false}],"anonymous":false,"type":"event"},{"name":"Approval","inputs":[{"type":"address","name":"_owner","indexed":true},{"type":"address","name":"_spender","indexed":true},{"type":"uint256","name":"_value","indexed":false}],"anonymous":false,"type":"event"},{"name":"setup","outputs":[],"inputs":[{"type":"address","name":"token_addr"}],"constant":false,"payable":false,"type":"function","gas":175875},{"name":"addLiquidity","outputs":[{"type":"uint256","name":"out"}],"inputs":[{"type":"uint256","name":"min_liquidity"},{"type":"uint256","name":"max_tokens"},{"type":"uint256","name":"deadline"}],"constant":false,"payable":true,"type":"function","gas":82616},{"name":"removeLiquidity","outputs":[{"type":"uint256","name":"out"},{"type":"uint256","name":"out"}],"inputs":[{"type":"uint256","name":"amount"},{"type":"uint256","name":"min_eth"},{"type":"uint256","name":"min_tokens"},{"type":"uint256","name":"deadline"}],"constant":false,"payable":false,"type":"function","gas":116814},{"name":"__default__","outputs":[],"inputs":[],"constant":false,"payable":true,"type":"function"},{"name":"ethToTokenSwapInput","outputs":[{"type":"uint256","name":"out"}],"inputs":[{"type":"uint256","name":"min_tokens"},{"type":"uint256","name":"deadline"}],"constant":false,"payable":true,"type":"function","gas":12757},{"name":"ethToTokenTransferInput","outputs":[{"type":"uint256","name":"out"}],"inputs":[{"type":"uint256","name":"min_tokens"},{"type":"uint256","name":"deadline"},{"type":"address","name":"recipient"}],"constant":false,"payable":true,"type":"function","gas":12965},{"name":"ethToTokenSwapOutput","outputs":[{"type":"uint256","name":"out"}],"inputs":[{"type":"uint256","name":"tokens_bought"},{"type":"uint256","name":"deadline"}],"constant":false,"payable":true,"type":"function","gas":50463},{"name":"ethToTokenTransferOutput","outputs":[{"type":"uint256","name":"out"}],"inputs":[{"type":"uint256","name":"tokens_bought"},{"type":"uint256","name":"deadline"},{"type":"address","name":"recipient"}],"constant":false,"payable":true,"type":"function","gas":50671},{"name":"tokenToEthSwapInput","outputs":[{"type":"uint256","name":"out"}],"inputs":[{"type":"uint256","name":"tokens_sold"},{"type":"uint256","name":"min_eth"},{"type":"uint256","name":"deadline"}],"constant":false,"payable":false,"type":"function","gas":47503},{"name":"tokenToEthTransferInput","outputs":[{"type":"uint256","name":"out"}],"inputs":[{"type":"uint256","name":"tokens_sold"},{"type":"uint256","name":"min_eth"},{"type":"uint256","name":"deadline"},{"type":"address","name":"recipient"}],"constant":false,"payable":false,"type":"function","gas":47712},{"name":"tokenToEthSwapOutput","outputs":[{"type":"uint256","name":"out"}],"inputs":[{"type":"uint256","name":"eth_bought"},{"type":"uint256","name":"max_tokens"},{"type":"uint256","name":"deadline"}],"constant":false,"payable":false,"type":"function","gas":50175},{"name":"tokenToEthTransferOutput","outputs":[{"type":"uint256","name":"out"}],"inputs":[{"type":"uint256","name":"eth_bought"},{"type":"uint256","name":"max_tokens"},{"type":"uint256","name":"deadline"},{"type":"address","name":"recipient"}],"constant":false,"payable":false,"type":"function","gas":50384},{"name":"tokenToTokenSwapInput","outputs":[{"type":"uint256","name":"out"}],"inputs":[{"type":"uint256","name":"tokens_sold"},{"type":"uint256","name":"min_tokens_bought"},{"type":"uint256","name":"min_eth_bought"},{"type":"uint256","name":"deadline"},{"type":"address","name":"token_addr"}],"constant":false,"payable":false,"type":"function","gas":51007},{"name":"tokenToTokenTransferInput","outputs":[{"type":"uint256","name":"out"}],"inputs":[{"type":"uint256","name":"tokens_sold"},{"type":"uint256","name":"min_tokens_bought"},{"type":"uint256","name":"min_eth_bought"},{"type":"uint256","name":"deadline"},{"type":"address","name":"recipient"},{"type":"address","name":"token_addr"}],"constant":false,"payable":false,"type":"function","gas":51098},{"name":"tokenToTokenSwapOutput","outputs":[{"type":"uint256","name":"out"}],"inputs":[{"type":"uint256","name":"tokens_bought"},{"type":"uint256","name":"max_tokens_sold"},{"type":"uint256","name":"max_eth_sold"},{"type":"uint256","name":"deadline"},{"type":"address","name":"token_addr"}],"constant":false,"payable":false,"type":"function","gas":54928},{"name":"tokenToTokenTransferOutput","outputs":[{"type":"uint256","name":"out"}],"inputs":[{"type":"uint256","name":"tokens_bought"},{"type":"uint256","name":"max_tokens_sold"},{"type":"uint256","name":"max_eth_sold"},{"type":"uint256","name":"deadline"},{"type":"address","name":"recipient"},{"type":"address","name":"token_addr"}],"constant":false,"payable":false,"type":"function","gas":55019},{"name":"tokenToExchangeSwapInput","outputs":[{"type":"uint256","name":"out"}],"inputs":[{"type":"uint256","name":"tokens_sold"},{"type":"uint256","name":"min_tokens_bought"},{"type":"uint256","name":"min_eth_bought"},{"type":"uint256","name":"deadline"},{"type":"address","name":"exchange_addr"}],"constant":false,"payable":false,"type":"function","gas":49342},{"name":"tokenToExchangeTransferInput","outputs":[{"type":"uint256","name":"out"}],"inputs":[{"type":"uint256","name":"tokens_sold"},{"type":"uint256","name":"min_tokens_bought"},{"type":"uint256","name":"min_eth_bought"},{"type":"uint256","name":"deadline"},{"type":"address","name":"recipient"},{"type":"address","name":"exchange_addr"}],"constant":false,"payable":false,"type":"function","gas":49532},{"name":"tokenToExchangeSwapOutput","outputs":[{"type":"uint256","name":"out"}],"inputs":[{"type":"uint256","name":"tokens_bought"},{"type":"uint256","name":"max_tokens_sold"},{"type":"uint256","name":"max_eth_sold"},{"type":"uint256","name":"deadline"},{"type":"address","name":"exchange_addr"}],"constant":false,"payable":false,"type":"function","gas":53233},{"name":"tokenToExchangeTransferOutput","outputs":[{"type":"uint256","name":"out"}],"inputs":[{"type":"uint256","name":"tokens_bought"},{"type":"uint256","name":"max_tokens_sold"},{"type":"uint256","name":"max_eth_sold"},{"type":"uint256","name":"deadline"},{"type":"address","name":"recipient"},{"type":"address","name":"exchange_addr"}],"constant":false,"payable":false,"type":"function","gas":53423},{"name":"getEthToTokenInputPrice","outputs":[{"type":"uint256","name":"out"}],"inputs":[{"type":"uint256","name":"eth_sold"}],"constant":true,"payable":false,"type":"function","gas":5542},{"name":"getEthToTokenOutputPrice","outputs":[{"type":"uint256","name":"out"}],"inputs":[{"type":"uint256","name":"tokens_bought"}],"constant":true,"payable":false,"type":"function","gas":6872},{"name":"getTokenToEthInputPrice","outputs":[{"type":"uint256","name":"out"}],"inputs":[{"type":"uint256","name":"tokens_sold"}],"constant":true,"payable":false,"type":"function","gas":5637},{"name":"getTokenToEthOutputPrice","outputs":[{"type":"uint256","name":"out"}],"inputs":[{"type":"uint256","name":"eth_bought"}],"constant":true,"payable":false,"type":"function","gas":6897},{"name":"tokenAddress","outputs":[{"type":"address","name":"out"}],"inputs":[],"constant":true,"payable":false,"type":"function","gas":1413},{"name":"factoryAddress","outputs":[{"type":"address","name":"out"}],"inputs":[],"constant":true,"payable":false,"type":"function","gas":1443},{"name":"balanceOf","outputs":[{"type":"uint256","name":"out"}],"inputs":[{"type":"address","name":"_owner"}],"constant":true,"payable":false,"type":"function","gas":1645},{"name":"transfer","outputs":[{"type":"bool","name":"out"}],"inputs":[{"type":"address","name":"_to"},{"type":"uint256","name":"_value"}],"constant":false,"payable":false,"type":"function","gas":75034},{"name":"transferFrom","outputs":[{"type":"bool","name":"out"}],"inputs":[{"type":"address","name":"_from"},{"type":"address","name":"_to"},{"type":"uint256","name":"_value"}],"constant":false,"payable":false,"type":"function","gas":110907},{"name":"approve","outputs":[{"type":"bool","name":"out"}],"inputs":[{"type":"address","name":"_spender"},{"type":"uint256","name":"_value"}],"constant":false,"payable":false,"type":"function","gas":38769},{"name":"allowance","outputs":[{"type":"uint256","name":"out"}],"inputs":[{"type":"address","name":"_owner"},{"type":"address","name":"_spender"}],"constant":true,"payable":false,"type":"function","gas":1925},{"name":"name","outputs":[{"type":"bytes32","name":"out"}],"inputs":[],"constant":true,"payable":false,"type":"function","gas":1623},{"name":"symbol","outputs":[{"type":"bytes32","name":"out"}],"inputs":[],"constant":true,"payable":false,"type":"function","gas":1653},{"name":"decimals","outputs":[{"type":"uint256","name":"out"}],"inputs":[],"constant":true,"payable":false,"type":"function","gas":1683},{"name":"totalSupply","outputs":[{"type":"uint256","name":"out"}],"inputs":[],"constant":true,"payable":false,"type":"function","gas":1713}]
var uniswap_contract_address = '0xae33701b6b48267db4bb51e472e4e7ab5aad2e3e'
var uniswap_exchange_url = "https://uniswap.exchange/swap/0xbcc66ed2ab491e9ae7bf8386541fb17421fa9d35"
var eth_gas_station_url = "https://ethgasstation.info/"

// only initiate the transaction once
var didExecuteIntent = false;

var web3context = null;

var intendedExchangeAmount = 0

async function get_exchange_rate_and_swap() {
	var exchangeContract = new ethers.Contract(uniswap_contract_address, uniswap_contract_abi, web3context.library)

	// get the exchange rate for the desired COLR amount
	var exchangeRateWei = await exchangeContract.getEthToTokenOutputPrice(intendedExchangeAmount)

	console.log("Exchange Rate (WEI): " + exchangeRateWei.toString())

	// convert to ETH
	var exchangeRateEth = (exchangeRateWei / 10 ** 18)
	var factor = 0.0001

	console.log("Exchange Rate (ETH): " + exchangeRateEth)

	exchangeRateEth = Math.ceil(exchangeRateEth / factor) * factor

	exchangeRateEth = exchangeRateEth.toFixed(4)

	console.log("Exchange Rate (Rounded): " + exchangeRateEth)
	
	// get contract interface
	var iface = new ethers.Interface(uniswap_contract_abi)	

	// take current time in seconds + 15 minutes
	var deadline = Math.ceil(new Date().getTime() / 1000) + 900;	
	
	// generate the call data for the exchange rate -- amount of eth we'll need
	var calldata = iface.functions.ethToTokenSwapOutput.encode(
		[intendedExchangeAmount, deadline]
	)

	console.log("Calldata: " + calldata)

	// get the signer
	var signer = web3context.library.getSigner();

	fetch("https://ethgasstation.info/json/ethgasAPI.json").then(response => response.json()).then(response => {
		var gasPrice = response.fast

		// default gas price of 10 if we got an undefined response
		if (gasPrice == undefined) {
			gasPrice = 10
		} else {
			gasPrice = gasPrice / 10
		}

		console.log(gasPrice)

		const tx = {
			to: uniswap_contract_address,
			data: calldata,
			value: ethers.utils.parseEther(exchangeRateEth.toString()),
			gasPrice: ethers.utils.bigNumberify(gasPrice * 1000000000)
		}

		// send the transaction
		signer.sendTransaction(tx)
	})
}

const SKULL_DENOMINATION = 1e4;
const MAX_ALLOWED_SKULL_PURCHASE = 5000 * SKULL_DENOMINATION;

class SkullVendingV1 extends Component {
	constructor(props) {
		super(props)

		// set the web3 context
		web3context = this.props.props.context	

		// set the intended skull purchase amount
		intendedExchangeAmount = parseInt(this.props.props.intentData.value) * SKULL_DENOMINATION;

		document.title += " $SKULL Vending Machine"
	}

	componentDidMount() {
		if (didExecuteIntent === false) {			
			didExecuteIntent = true;

			if (intendedExchangeAmount <= MAX_ALLOWED_SKULL_PURCHASE) {
				get_exchange_rate_and_swap()		
			} else {
				window.alert("Exchange maximum exceeded.")
			}
		} 
	}

	render() {
		var etherscanLink = "https://etherscan.io/address/" + uniswap_contract_address
    	return (<div>
    		<p><span>💀</span> Thank you for using the $SKULL vending machine!</p>
    		<p><span>💰</span> You have initiated a transaction for {intendedExchangeAmount / SKULL_DENOMINATION} $SKULL.</p>    		
    		<p><span>🦄</span> You can verify the uniswap exchange address: <b><a target="_blank" href={etherscanLink}>https://etherscan.io/address/{uniswap_contract_address}</a></b></p>
    		<p><span>🦄</span> Or exchange directly at: <b><a target="_blank" href={uniswap_exchange_url}>{uniswap_exchange_url}</a></b></p>
    		<p><span>⛽️</span> Please be sure to check all inputs and gas before submitting your transaction. Recommended gas prices can be found at <b><a target="_blank" href={eth_gas_station_url}>{eth_gas_station_url}</a></b></p>
    		<p><span>🗒️</span> Documentation on $SKULL can be found <a target="_blank" href="https://tryroll.com/skull-skeenee-uniswap/">here</a>.</p>
    		<p><span>💥</span> Close this window to return to Cryptovoxels.</p>
    		</div>
		)
	}
}

export default SkullVendingV1