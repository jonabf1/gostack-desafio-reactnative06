import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Main from './pages/Main';
import User from './pages/User';
import Repository from './pages/repository';

const Routes = createAppContainer(
  createStackNavigator(
    {
      Main,
      User,
      Repository,
    },
    {
      headerLayoutPreset: 'center', // centraliza o titulo
      headerBackTitleVisible: false, // desativa icone de voltar
      defaultNavigationOptions: {
        // estilizacao para todos os headers
        headerStyle: {
          backgroundColor: '#7159c1', // altera a cor do fundo do header
        },
        headerTintColor: '#fff', // altera a cor dos items do header
      },
    }
  )
);

export default Routes;
