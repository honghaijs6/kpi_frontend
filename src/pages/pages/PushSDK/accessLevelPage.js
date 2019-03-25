import React from 'react';

export default class AccessLevelPage extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      typeAction:'', // post - put - delete ...
      onAction:'', // string method
      status:'', // status

      tab:'accessLevelPage',

    }

  }
  render() {
    return (
      <div hidden={  this.props.onTab === this.state.tab ? false : true } >
          Access Level Page
      </div>
    );
  }
}
