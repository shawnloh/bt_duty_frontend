import React, { Component } from 'react';
import { connect } from 'react-redux';

export class DashboardPage extends Component {
  render() {
    return <div>this is dashboard page</div>;
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(DashboardPage);
