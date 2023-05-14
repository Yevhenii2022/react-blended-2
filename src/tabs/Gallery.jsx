import { Component } from 'react';

import * as ImageService from 'service/image-service';
import { Button, SearchForm, Grid, GridItem, Text, CardItem } from 'components';

export class Gallery extends Component {
  state = {
    query: '',
    page: 1,
  };

  componentDidUpdate(_, prevState) {
    const { query, page } = this.state;
    if (prevState.query !== query || prevState.page !== page) {
      ImageService.getImages(query, page).then(data => console.log(data));
    }
  }

  handleSubmit = query => {
    this.setState({ query });
  };

  render() {
    return (
      <>
        <SearchForm handleSubmit={this.handleSubmit} />

        <Text textAlign="center">Sorry. There are no images ... 😭</Text>
      </>
    );
  }
}
