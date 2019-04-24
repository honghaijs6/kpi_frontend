import numeral from 'numeral';

import React from 'react';
import { Input } from 'reactstrap';


class InputNumeral extends React.Component {


  constructor(props){
    super(props);

    this.state = {
      defaultValue:props.defaultValue
    }

    this._onChange = this._onChange.bind(this);
  }

  _onChange(e){
    let value = e.target.value.replace(/,/g,'');
    let number = numeral(value).format('0,0');

    this.setState({
      defaultValue:number
    });

    if(this.props.onChange!== undefined){
      this.props.onChange(parseFloat(value)) ;
    }

  }

  render() {
    return (
      <Input onChange={ this._onChange } id={ this.props.id || 0 } value={ numeral(this.state.defaultValue).format('0,0') } type="text" />
    );
  }
}

export default InputNumeral  ;
