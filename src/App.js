import React, { useEffect } from 'react'
import { useWeb3Context } from 'web3-react'

// Functions
import { executeColorVendingV1 } from './functions/color_vending/1/index'

// map an intention type + version to a function
const functionMap = {
	"colr-vending/1" : executeColorVendingV1
}

// only initiate the transaction once
var didExecuteIntent = false;

export default function App (props) {
  // get the web3 context
  const context = useWeb3Context()
 
  useEffect(() => {
    context.setFirstValidConnector(['MetaMask'])
  }, [])
 
  if (!context.active && !context.error) {
    // loading
    return <p>loading</p>
  } else if (context.error) {
    // error
    return <p>{context.error}</p>
  } else {
    // success. check that we didn't already intitiate the transaction
    if (didExecuteIntent === false) {
		var intentType = props.intentData.intent;
		var intentVersion = props.intentData.version;

		var functionData = {
			"context" : context,
			"intentData" : props.intentData
		}

		functionMap[intentType + "/" + intentVersion](functionData)

		didExecuteIntent = true;
    }
    return <p>success</p>
  }
}