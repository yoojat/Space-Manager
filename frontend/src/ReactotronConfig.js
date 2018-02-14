import Reactotron from 'reactotron-react-js';
import {reactotronRedux} from 'reactotron-redux';

Reactotron.configure({name: 'Space-manager'})
  .use(reactotronRedux())
  .connect();

export default Reactotron;
