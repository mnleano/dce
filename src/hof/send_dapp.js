import { Contract } from 'dapper'
import { emptyMethod } from '../helper/function'

export default context => async (
  params,
  onSuccess = emptyMethod,
  onError = emptyMethod
) => {
  try {
    // params is request = {
    //     privateKey: privateKey,
    //     network: "ropsten",
    //     address: address,
    //     abi: abi,
    //     method: "setPerson",
    //     params: params
    //   };
    // clean params.params make it array
    let inputs = []
    if (params.params.length > 0) {
      inputs = params.params.split(',').map(v => v.trim())
    }
    params.params = inputs
    console.log(params)
    let request = {}

    if (inputs.length === 0) {
      request = await Contract.ethers.executeNoParams(params)
    } else {
      request = await Contract.ethers.executeWithParams(params)
    }

    if (request.code === 200) {
      // converted amount price is a component value.
      // so success must handle by the caller
      console.log('send dapp: ', request)
      if (inputs.length === 0) {
        return onSuccess('Success')
      }
      return onSuccess(request.data.result)
    } else {
      throw new Error('code not 200')
    }
  } catch (e) {
    console.log('error in sending dapp: ', e)
    return onError(e.message)
  }
}
