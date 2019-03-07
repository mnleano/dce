import React, { Component } from 'react';
import { goTo } from '../../services/navigation';
import { Page, Col, Row, Button } from '../../common'
import { Navbar } from '../../components';
import chunk from 'lodash/chunk'
import Storage from '../../services/storage/storage'

import './MnemonicPhrase.scss';

class MnemonicPhrase extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ...props
    }


    Storage.set('is_mnemonic_set', false)
    Storage.set('is_password_set', false)
    Storage.set('mnemonic', props.mnemonic)

  }

  _createRows(items) {
    return items.map( (item, key) => {
      return (
        <Row flex="1" justifyContent="center" className="Phrase--item" key={key}>
          <Col flex="1 0px" alignItems="center" className="Phrase--index">
            {item.index}
          </Col>
          <Col flex="3">
            &nbsp;{item.item}
          </Col>
        </Row>
      )
    })
  }
  
  _createColumns(arr) {
    let _arr = arr.map((item, index) => {
      return {
        index: index + 1,
        item: item
      }
    })

    let _chunks = chunk(_arr, 2)

    return _chunks.map((row, index) => {
      return (
        <Row flex="1" className="padding" key={index}>
          {this._createRows(row)}
        </Row>
      )
    });
  }

  onClickAgree(words) {
    goTo('MnemonicPhraseConfirm', {
      ...this.state
    })
  }
  
  render() {
    // this will take too much process every event
    // need to fix performance later
    let words = this.state.mnemonic
    let arrWords = words.split(' ')
    
    return (
      <Page className="MnemonicPhrase">
        <Navbar backButton={true}/>
        <div className="Content">
          
          <Col>
            <Col flex="10" className="Padding--row">
              This is your only way to backup. Write this down and store it somewhere safe.
              {this._createColumns(arrWords)}
            </Col>
            <Col flex="2" className="Padding--row">

              <div className="Button--container">
                <Button color="primary" outline={true} onClick={this.onClickAgree.bind(this, arrWords)}>
                  Got it
                </Button>
              </div>
            </Col>
          </Col>
        </div>
      </Page>
    );
  }
}

export default MnemonicPhrase;
