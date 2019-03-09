import React, { Component, useContext } from 'react'
import Proptypes from 'prop-types'

import Storage from '../../services/storage/storage'

import {
  IS_LOGGED,
  ACTIVE_PROVIDER_ID,
  ACTIVE_PROVIDER_NAME
} from '../../constants/storage'


export const AppContextConstant = {
  IS_LOGGED,
  ACTIVE_PROVIDER_ID,
  ACTIVE_PROVIDER_NAME
}

export const defaultAppContext = {}

export const AppContextObject = React.createContext(defaultAppContext)

class AppContextProvider extends Component {
  constructor(props) {
    super(props)

    this.state = {
      [IS_LOGGED]: true,
      [ACTIVE_PROVIDER_ID]: '',
      [ACTIVE_PROVIDER_NAME]: '',
      userToken: null,
      ...props.value,

      onAppContextChange: this.onAppContextChange,
      persist: this.persist,
      set: this.persist,
    }
  }

  onAppContextChange = item => {
    this.setState({
      ...this.state,
      ...item
    })
  }

  set = item => {
    this.setState({
      ...this.state,
      ...item
    })
  }
  persist = item => {
    // save to storage
    Object.keys(item).forEach((key) => {
      this._saveToStorage(key, item[key])
    })
      
    //
    this.setState({...this.state, ...item})
  }

  _saveToStorage = (key, value) => {
    if ( typeof value === 'object' && value !== null) {
       return Storage.set(key, JSON.stringify(value))
    }
    return Storage.set(key, value)
  }

  render() {
    return (
      <AppContextObject.Provider value={this.state}>
        {this.props.children}
      </AppContextObject.Provider>
    )
  }
}

AppContextProvider.defaultProps = {
  value: {}
}

AppContextProvider.propTypes = {
  value: Proptypes.object
}

export default AppContextProvider

export const withAppContext = WrappedComponent => props => {
  const AppContext = useContext(AppContextObject)
  return <WrappedComponent {...props} AppContext={AppContext} AppContextConstant={AppContextConstant} />
}