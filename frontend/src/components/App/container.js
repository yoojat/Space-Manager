import React from 'react';
import App from './presenter';

// index.js에서 받은 props를 사용할수 있음, Container 는 presenter에서 온 App컴포넌트에게 props를 전달하구
// App 컴포넌트를 리턴
const Container = props => <App {...props} />;

export default Container;
