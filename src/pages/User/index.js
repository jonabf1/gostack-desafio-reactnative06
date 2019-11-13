import React, { Component } from 'react';
import PropTypes from 'prop-types';
import api from '../../services/api';
import {
  Container,
  Header,
  Avatar,
  Bio,
  Name,
  Stars,
  Starred,
  Info,
  Title,
  Author,
  OwnerAvatar,
  Loading,
  SubmitButton,
} from './styles';

export default class User extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.getParam('user').name,
  });

  static propTypes = {
    navigation: PropTypes.shape({
      getParam: PropTypes.func,
    }).isRequired,
  };

  state = {
    stars: [],
    loading: true,
    pageIndex: 0,
    refreshing: false,
  };

  async componentDidMount() {
    this.loadMore();
  }

  loadMore = async () => {
    const { navigation } = this.props;
    const { pageIndex, stars } = this.state;
    const count = pageIndex + 1;
    const userNavigation = navigation.getParam('user');
    const response = await api.get(
      `/users/${userNavigation.login}/starred?page=${count}`
    );

    this.setState({
      stars: [...stars, ...response.data],
      pageIndex: count,
      refreshing: false,
      loading: false,
    });
  };

  refreshList = async () => {
    this.setState({ refreshing: true, stars: [] }, this.loadMore);
  };

  handleNavigate = repository => {
    const { navigation } = this.props;
    navigation.navigate('Repository', { repository });
  };

  render() {
    const { navigation } = this.props;
    const { stars, loading, refreshing } = this.state;
    const user = navigation.getParam('user');

    return (
      <Container>
        <Header>
          <Avatar source={{ uri: user.avatar }} />
          <Name>{user.name}</Name>
          <Bio>{user.bio}</Bio>
        </Header>
        {loading ? (
          <Loading />
        ) : (
          <Stars
            onEndReachedThreshold={0.2}
            onRefresh={this.refreshList}
            refreshing={refreshing}
            data={stars}
            keyExtractor={star => String(star.id)}
            renderItem={({ item }) => (
              <SubmitButton onPress={() => this.handleNavigate(item)}>
                <Starred>
                  <OwnerAvatar source={{ uri: item.owner.avatar_url }} />
                  <Info>
                    <Title>{item.name}</Title>
                    <Author>{item.owner.login}</Author>
                  </Info>
                </Starred>
              </SubmitButton>
            )}
          />
        )}
      </Container>
    );
  }
}
