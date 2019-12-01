import Reactotron from 'reactotron-react-js';

if (process.env.NODE_ENV === 'development') {
  const tron = Reactotron.configure({ host: '192.168.11.10' }).connect();

  tron.clear();

  console.tron = tron;
}
