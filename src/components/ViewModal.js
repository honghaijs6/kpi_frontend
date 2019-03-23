import React, {Component} from 'react';

import { Button, Modal, ModalHeader, ModalBody, Form} from 'reactstrap';


/*
BenModal : props
  - onAction :  rule state : { onAction, status}
  - modal : it is a controller class
  - name : string

  refErr : React.createRef  object
*/

export default class ViewModal extends Component{


  constructor(props){

    super(props)
    
    this.state = {}

    this.toggle = this.toggle.bind(this);
    
  }

  toggle(){

    this.setState({
        isOpen:false
    })
  }
  
  componentWillReceiveProps(newProps){
      this.setState(newProps)
  }

  render(){


    
    return(
      <Modal  style={{
          'minWidth': this.props.width,
           
        }}  isOpen={ this.state.isOpen } fade={false}   toggle={ this.toggle } >
        
        <ModalBody style={{
            fontFamily:'Roboto',
            padding:0,
            position:'relative'
          }}>
            { this.props.children }
          
        </ModalBody>
        

      </Modal>
    )
  }
}
