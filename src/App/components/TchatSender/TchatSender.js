import React, { Component } from 'react';
import {PropTypes} from 'prop-types';
import styles from './TchatSender.module.scss';
import Mybutton from '../Mybutton/Mybutton';
import {postMessage} from '../../services/rest/rest';
import store from '../../store/store';
export default class TchatSender extends Component {
  
  constructor(props){
    super(props);
    this.state={message:'',color:'#FFFFFF'}
  }
  submitform=()=>{
   // postMessage({...this.state,userId:this.props.whoiamID, date:new Date().toISOString()},e=>{this.setState({...this.state,message:''})})
   //remplacement par action du store
   store.dispatch({type:'POST_MESSAGE',value:{...this.state,date:new Date().toISOString(),userId:store.getState().user.id}})
   this.setState({message:'',color:this.state.color});
  }
  render() {
    return (
      <div className={styles.TchatSender} style={{...this.props.style}}>
        <form name="sender" onSubmit={this.submitform}>
          <input placeholder="saisissez votre message ici" type="text" style={{flex:12}} value={this.state.message} onChange={e=>{this.setState({message:e.currentTarget.value})}}/>
          <input type="color" style={{flex:0.3}} value={this.state.color}  onChange={e=>{this.setState({color:e.currentTarget.value})}}/>
          <Mybutton color="tomato" style={{flex:2}} buttononclick={this.submitform}>Envoyer</Mybutton>
        </form>
      </div>
    );
  }
}
TchatSender.propType={style:PropTypes.object}
TchatSender.defaultProps={whoiamID:1}