import Reactotron from 'reactotron-react-native';

// variavel global do react native que retorna true quando o usuario ta emulando
// em ambiente de desenvolvimento, ou seja, sempre que o usuario estiver emulando
// ele vai executar oq estiver dentro do if
if (__DEV__) {
  // caso esteja usando usb, ficaria
  // const tron = Reactotron.configure({host: 'seu ip'})
  const tron = Reactotron.configure()
    .useReactNative()
    .connect();
  console.tron = tron;
  tron.clear();
}

// TRON.CLEAR();
// if acima reflete todo ciclo de vida no app desktop reactotron...
// onde vai capturar os erros e sempre que der refresh...
// vai limpor e buscar os novos, ou mesmos que foram corrigidos
