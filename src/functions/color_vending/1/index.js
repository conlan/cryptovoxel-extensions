const ethers = require('ethers');

var uniswap_contract_abi = [{"name":"ethToTokenSwapOutput","inputs":[{"type":"uint256","name":"tokens_bought"},{"type":"uint256","name":"deadline"}],"type":"function","outputs":[{"type":"uint256","name":"out"}],"constant":false,"payable":true,"gas":50463}]
var uniswap_contract_address = '0x3F0c63dA66457dedc2677BEF6bbdd457BA7A3C0b'

export function executeColorVendingV1(functionData) {
	const signer = functionData.context.library.getSigner();
	
	var intentValue = functionData.intentData.value;	

	// take current time in seconds + 5 minutes
	var deadline = Math.round(new Date().getTime() / 1000) + 300;

	// get contract interface
	var iface = new ethers.Interface(uniswap_contract_abi)	

	// generate the call data for how much COLR we want to buy
	var calldata = iface.functions.ethToTokenSwapOutput.encode([
		intentValue, deadline
	])

	// expected amount to pay
	var expectedEthInput = "0.005" // TODO convert this

 // 	signer.sendTransaction({
	// 	to: uniswap_contract_address,
	// 	data: calldata,
	// 	value: ethers.utils.parseEther(expectedEthInput)
	// })
}