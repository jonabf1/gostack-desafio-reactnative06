import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import PropTypes from 'prop-types';
import { Keyboard, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {
  Container,
  List,
  Form,
  Input,
  SubmitButton,
  Bio,
  ProfileButton,
  ProfileButtonText,
  User,
  Avatar,
  Name,
} from './styles';
import api from '../../services/api';

export default class Main extends Component {
  // eslint-disable-next-line react/sort-comp
  static navigationOptions = {
    title: 'Usuários',
  };

  // eslint-disable-next-line react/no-typos
  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func,
    }).isRequired,
  };

  state = {
    users: [],
    newUser: '',
    loading: false,
  };

  async componentDidMount() {
    const users = await AsyncStorage.getItem('users');
    if (users) {
      this.setState({ users: JSON.parse(users) });
    }
  }

  async componentDidUpdate(_, prevState) {
    const { users } = this.state;
    if (prevState.users !== users) {
      // transforma o users em json para o asyncstorage
      await AsyncStorage.setItem('users', JSON.stringify(users));
    }
  }

  handleSubmit = async () => {
    const { users, newUser } = this.state;

    this.setState({ loading: true });

    try {
      const response = await api.get(`/users/${newUser}`);
      const exist = users.find(item => item.login === response.data.login);
      if (exist) {
        this.setState({ loading: false });
        return 0;
      }
      const data = {
        name: response.data.name,
        login: response.data.login,
        bio: response.data.login,
        avatar: response.data.avatar_url,
      };

      this.setState({
        users: [...users, data],
        newUser: '',
        loading: false,
      });
      Keyboard.dismiss();
    } catch (err) {
      this.setState({ loading: false });
    }
  };

  handleNavigate = user => {
    const { navigation } = this.props;
    navigation.navigate('User', { user });
  };

  render() {
    const { users, newUser, loading } = this.state;
    return (
      <Container>
        <Form>
          <Input
            autoCorrect={false}
            autoCapitalize="none"
            value={newUser}
            onChangeText={text => this.setState({ newUser: text })}
            placeholder="Adicionar usuário"
            returnKeyType="send"
            onSubmitEditing={this.handleSubmit}
          />
          <SubmitButton loading={loading} onPress={this.handleSubmit}>
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Icon name="add" size={20} color="#fff" />
            )}
          </SubmitButton>
        </Form>
        <List
          data={users}
          keyExtractor={user => user.login}
          renderItem={({ item }) => (
            <User>
              <Avatar source={{ uri: item.avatar }} />
              <Name>{item.name}</Name>
              <Bio>{item.bio}</Bio>
              <ProfileButton onPress={() => this.handleNavigate(item)}>
                <ProfileButtonText>Ver perfil</ProfileButtonText>
              </ProfileButton>
            </User>
          )}
        />
      </Container>
    );
  }
}
