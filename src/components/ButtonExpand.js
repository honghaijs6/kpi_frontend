import React, { Component } from 'react';
import { ButtonGroup, Button } from 'reactstrap' ; 


export default class ButtonExpand extends Component {
  constructor(props) {
    super(props);
    this.state = {
        display:false
    };

    this._onClick = this._onClick.bind(this); 
    this._handleClick = this._handleClick.bind(this) ; 
    
 }

  _handleClick(e){

    if(e.target.closest('.div-holder-filter')===null){
      if(this.state.display===true){
        this.setState({
          display: false
        });
      } 
    }
    
  }

  componentDidMount(){
      window.addEventListener('click',this._handleClick,false);
  }
  componentWillUnmount(){
      window.removeEventListener('click',()=>{},false);
  }

  _onClick(){
    this.setState({
        display:!this.state.display
    });      
  }

  render() {

    const display = this.state.display === false ? 'none' : 'block' ; 
    const icon = this.props.icon || 'fa-filter' ; 

    return (
        <ButtonGroup className="div-holder-filter">
            <Button onClick={ this._onClick } style={{marginRight:10, borderRadius:0}} className="btn btn-ubuntu btn-open-expand"> 
            <i className={'fa '+icon }></i> </Button>        
            <div className="filter-holder" style={{display:display,width:this.props.width || 300, left:-this.props.width || -300}}>
                { this.props.children }
            </div>
        </ButtonGroup>
    );
  }
}
