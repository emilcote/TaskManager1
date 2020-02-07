import React from 'react';
import { render } from 'react-dom';
import TaskBoard from './components/TaskBoard'
// import { Provider } from 'react-redux';
// //import store from 'store';

export default class App extends React.Component {

render() {
    return <div>
    <TaskBoard />
    </div>;
}
}