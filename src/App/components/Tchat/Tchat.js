import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './Tchat.module.scss';
import { getMessages, getUsers, getUser } from '../../services/rest/rest';
import TchatReader from '../TchatReader/TchatReader';
import TchatUsers from '../TchatUsers/TchatUsers';
import TchatSender from '../TchatSender/TchatSender';
import { withRouter } from 'react-router-dom';
import store from '../../store/store';
class Tchat extends Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      lastMessageId: 0,
      messages: [], users: [], user: { }
    };
    //this.setState({});
  }
  componentDidMount() {
    store.subscribe(() => {
      console.log('Tchat a declencher un changement de state par le state',store.getState())
      this.setState(store.getState());
    });
    store.dispatch({type:'INIT_MESSAGES'});

    // getUser(this.props.match.params.name,obj=>{
    //   if(undefined===obj)
    //   {
    //     this.props.history.push('/');
    //     return;
    //   }
    //   this.setState({user:obj} 
    //     )},false);
    // getUsers(e =>this.setState({ users: e }));
    // getMessages(e => {
    //   //const lastID = e[e.length - 1].id;
    //   let lastID = this.state.lastMessageId;
    //   e.forEach(arrElem => { if (lastID < arrElem.id) { lastID = arrElem.id } });
    //   this.setState({ messages: e, lastMessageId: lastID });
    // });

  }
  // startAutoPulling = () => {
  //   setInterval(monComponent => {
  //     getMessages(messagesJson => {
  //       let lastID = this.state.lastMessageId;
  //       messagesJson.forEach(arrElem => { if (lastID < arrElem.id) { lastID = arrElem.id } });
  //       monComponent.setState({ messages: [...monComponent.state.messages, ...messagesJson], lastMessageId: lastID });
  //     }, monComponent.state.lastMessageId)
  //   }, 1000, this);
  // }
  render() {
    return (
      <div className={styles.Tchat}>
        <div className={styles.username}>Connecté comme : {this.state.user.name}::{this.state.user.id}</div>
        <div style={{ display: "flex", height: '80vh' }}>
          <TchatReader store={store} style={{ flex: 4, overflowY: 'auto', height: '100%',padding:'10px', borderRight:'1px solid grey' }} />
          <TchatUsers style={{ flex: 1, overflowY: 'auto', height: '100%' }} />
        </div>
    
        <TchatSender style={{borderTop:'1px solid grey'}} />
      </div>
    );
  }
}

Tchat.propTypes = {}
Tchat.defautProps = {}

export default withRouter(Tchat); 
