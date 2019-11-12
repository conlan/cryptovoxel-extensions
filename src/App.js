import React, { useEffect } from 'react'
import { useWeb3Context } from 'web3-react'

import ColorVendingV1 from './functions/color_vending/1/index'
import ExtractColorV1 from './functions/extract_color/1/index'

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
		var intentType = props.intentData.intent;
		var intentVersion = props.intentData.version;
    var path = intentType + intentVersion

    var componentData = {
      "intentData" : props.intentData,
      "context" : context    
    }

    if (path === "colr-vending1") {
      return <ColorVendingV1 props={componentData}/>
    } else if (path === "extract_colr1") {
      return <ExtractColorV1 props={componentData} app={props.app}/>
    } else {
      return <div/>
    }
  }
}