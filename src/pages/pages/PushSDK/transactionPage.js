import React from 'react';

export default class TransactionPage extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      typeAction:'', // post - put - delete ...
      onAction:'', // string method
      status:'', // status

      tab:'transactionPage',

    }

  }
  render() {
    return (
      <div hidden={  this.props.onTab === this.state.tab ? false : true } >
          transactionPage
      </div>
    );
  }
}
