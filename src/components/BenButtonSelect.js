import React, { Component } from 'react';
import {
  Button,ButtonGroup
} from 'reactstrap';


class BenButtonSelect extends Component{

  constructor(props){
    super(props);

    this.state = {
      onTab:'',
      onAction:'',
      status:'',
      data:props.data
    }
  }

  _onSelect(key){

    // clear all active item
    this.state.data.map((item,index)=>{
       delete item.active ; 
       if(parseInt(key)===index){
         item.active = true;
       }
    });

    this.setState({
      data:this.state.data
    });

    this.props.onSelectItem(key);

  }
  render(){

    const listBtn = this.state.data;
    
    return(
      <div className="clearfix">
        <ButtonGroup >
            {
              Object.keys(listBtn).map((item,key)=>{


                let active =  listBtn[key].active === true ? 'active' :'';

                return(
                    <Button key={key} 
                      onClick={ ()=>{ this._onSelect(key) } }  
                      className={ 'btn-ubuntu-select btn-ubuntu-select-'+active} >
                        <i className={'fa '+listBtn[key].icon}></i> { listBtn[key].name} 
                    </Button>
                )
              })
            }


        </ButtonGroup>
      </div>
    )
  }

}

export default BenButtonSelect;
