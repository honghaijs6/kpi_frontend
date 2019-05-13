import React from 'react';
import PropTypes from 'prop-types';


import { Input  } from 'reactstrap';


class SelectList extends React.Component {

    
    render() {
        return (
            <Input onChange={(e)=>{ this.props.onChange(e) }} style={this.props.style} type="select">  
                <option key="" value="" > { this.props.name || 'Tất cả'  } </option>
                {
                    this.props.rows.map((item)=>{
                        return(
                            <option key={item.code} value={ item.code }> { item.name } </option>
                        )
                    })
                }
            </Input>
        );
    }
}

SelectList.propTypes = {
    name:PropTypes.string,
    rows:PropTypes.array,
    style:PropTypes.object,
    onChange:PropTypes.func
};
SelectList.defaultProps = {
    name:'Loại',
    rows:[],
    style:{},
    onChange:function(){}
}

export default SelectList;
