// if (process.env.NODE_ENV === 'development') {
import Reactotron from 'reactotron-react-js';
import { reactotronRedux } from 'reactotron-redux';
import sagaPlugin from 'reactotron-redux-saga';

const reactotron = Reactotron.configure({ name: 'Duty App' })
  .use(reactotronRedux()) //  <- here i am!
  .use(sagaPlugin())
  .connect(); // Don't forget about me!

export default reactotron;
// }
