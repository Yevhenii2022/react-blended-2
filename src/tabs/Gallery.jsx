import { Component } from 'react';

import * as ImageService from 'service/image-service';
import {
  Button,
  SearchForm,
  Grid,
  GridItem,
  Text,
  CardItem,
  Loader,
  Modal,
} from 'components';

export class Gallery extends Component {
  state = {
    query: '',
    page: 1,
    images: [],
    showLoadMore: false,
    isEmpty: false,
    error: '',
    isLoading: false,
    image: '',
  };

  componentDidUpdate(_, prevState) {
    const { query, page } = this.state;
    if (prevState.query !== query || prevState.page !== page) {
      this.setState({ isLoading: true });
      ImageService.getImages(query, page)
        .then(({ photos, total_results }) => {
          if (!photos.length) {
            this.setState({ isEmpty: true });
            return;
          }
          this.setState(prevState => ({
            images: [...prevState.images, ...photos],
            showLoadMore: page < Math.ceil(total_results / 15),
          }));
        })
        .catch(e => {
          this.setState({ error: e.message });
        })
        .finally(() => this.setState({ isLoading: false }));
    }
  }

  handleSubmit = query => {
    this.setState({
      query,
      page: 1,
      images: [],
      showLoadMore: false,
      isEmpty: false,
      error: '',
    });
  };

  loadMore = () => {
    this.setState(({ page }) => ({ page: page + 1 }));
  };

  openModal = image => {
    this.setState({ image });
  };

  render() {
    return (
      <>
        <SearchForm handleSubmit={this.handleSubmit} />
        <Grid>
          {this.state.images.map(image => (
            <GridItem key={image.id}>
              <CardItem color={image.avg_color}>
                <img
                  src={image.src.large}
                  alt={image.alt}
                  onClick={() =>
                    this.openModal({ src: image.src.large, alt: image.alt })
                  }
                />
              </CardItem>
            </GridItem>
          ))}
        </Grid>
        {this.state.isEmpty && (
          <Text textAlign="center">Sorry. There are no images ... 😭</Text>
        )}
        {this.state.error && (
          <Text textAlign="center">Sorry. {this.state.error} 😭</Text>
        )}
        {this.state.showLoadMore && (
          <Button type="button" onClick={this.loadMore}>
            Load more
          </Button>
        )}
        {this.state.isLoading && <Loader />}
        {this.state.image && (
          <Modal image={this.state.image} onClose={this.openModal} />
        )}
      </>
    );
  }
}
