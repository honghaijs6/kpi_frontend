import React, {Component} from 'react';

import { Button, Modal, ModalHeader, ModalBody, Form} from 'reactstrap';


/*
BenModal : props
  - onAction :  rule state : { onAction, status}
  - modal : it is a controller class
  - name : string

  refErr : React.createRef  object
*/

class BenModal extends Component{


  constructor(props){

    super(props)

    this.toggle = this.toggle.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

  }

  toggle(){
    this.props.modal.toggle()
  }

  onSubmit(){
    this.props.modal.onSubmit()
  }

  render(){

    return(
      <Modal  size="lg" style={{
          'minWidth': this.props.width
        }}  isOpen={ this.props.modal.active } fade={false}   toggle={ this.toggle } >
        <ModalHeader toggle={ this.toggle }> { this.props.name }  </ModalHeader>

        <ModalBody style={{
            padding:30
          }}>
          <Form>
            { this.props.children }
          </Form>
        </ModalBody>

        <div className="my-modal-footer">
           <div className="float-right">
               <div role="group" className="btn-group">
                     <Button className="btn-ubuntu bg-dark" onClick={ this.toggle }> <i className="fa fa fa-reply"></i> Từ Chối  </Button>
                     <Button  className="btn-ubuntu-ok bg-green" onClick={  this.onSubmit }> <i className="fa fa-chevron-circle-right"></i> Đồng Ý </Button>
               </div>

           </div>

        </div>

        <div className="modal-err" >
           <div className="form-err text-muted" id="form-err">
               status
           </div>
        </div>

      </Modal>
    )
  }
}

export default BenModal;
