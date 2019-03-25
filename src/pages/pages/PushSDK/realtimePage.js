import React from 'react';

export default class RealtimePage extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      typeAction:'', // post - put - delete ...
      onAction:'', // string method
      status:'', // status

      tab:'realtimePage',

    }

  }
  render() {
    return (
      <div hidden={  this.props.onTab === this.state.tab ? false : true } >
          realtimePage
      </div>
    );
  }
}
