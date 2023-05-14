import { Component } from 'react';

import * as ImageService from 'service/image-service';
import { Button, SearchForm, Grid, GridItem, Text, CardItem } from 'components';

export class Gallery extends Component {
  state = {
    query: '',
    page: 1,
    images: [],
    showLoadMore: false,
  };

  componentDidUpdate(_, prevState) {
    const { query, page } = this.state;
    if (prevState.query !== query || prevState.page !== page) {
      ImageService.getImages(query, page).then(({photos, total_results}) => {
        this.setState(prevState => ({
          images: [...prevState.images, ...photos],
          showLoadMore: page<Math.ceil(total_results/15)
        
        }))
      });
    }
  }

  handleSubmit = query => {
    this.setState({ query, page:1, images: [], showLoadMore: false})

  };
  loadMore = () => {
    this.setState(({ page }) => ({page:page+1}))
  }

  render() {
    return (
      <>
        <SearchForm handleSubmit={this.handleSubmit} />
        <Grid> {this.state.images.map(image => <GridItem key={image.id}>
          <CardItem color={image.avg_color} >
            <img src={image.src.large} alt= {image.alt} />
          </CardItem></GridItem>)} </Grid>
        <Text textAlign="center">Sorry. There are no images ... 😭</Text>
        {this.state.showLoadMore && <Button type='button' onClick={this.loadMore}> Load more</Button>}
        
      </>
      
    );
  }
}
