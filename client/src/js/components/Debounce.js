import React from 'react';

export default class Debounce extends React.Component {

  componentWillMount() {
    this.setState({
      children: this.props.children()
    });
  }

  render() {
    clearTimeout(this.timeout);

    this.timeout = setTimeout(() => {
      this.setState({
        children: this.props.children()
      });
    }, this.props.timeout || 500);

    return this.state.children;
  }
}