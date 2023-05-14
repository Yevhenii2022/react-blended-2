import { Component } from 'react';
import { Backdrop } from 'components/Backdrop/Backdrop.styled';

export class Modal extends Component {
  handleClick = e => {
    if (e.target === e.currentTarget) {
      this.props.onClose('');
    }
  };

  componentDidMount() {
    document.addEventListener('keydown', this.handleClose);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleClose);
  }

  handleClose = e => {
    if (e.code === 'Escape') {
      this.props.onClose('');
    }
  };

  render() {
    return (
      <Backdrop onClick={this.handleClick}>
        <img src={this.props.image.src} alt={this.props.image.alt} />
      </Backdrop>
    );
  }
}
