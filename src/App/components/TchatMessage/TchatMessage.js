import React from 'react';
import PropTypes from 'prop-types';
import styles from './TchatMessage.module.scss';

const TchatMessage = (props) => {
  return (
  <div style={{ textAlign: (props.isMine ? 'left' : 'right'), color:'white' }} data-testid="TchatMessage">
    <div className={styles.TchatMessage} style={{backgroundColor:(props.isMine ? 'tomato' : 'skyblue')}} >
      <div className={styles.messageHeader}>à {props.message.date},{props.message.user&&props.message.user.name} dit : </div>
      <span className={styles.messageId}>{props.message.id}</span>
      <span className={styles.messageValue} style={{color:props.message.color}}>{props.message.message}</span>
    </div>
  </div>
);}

TchatMessage.propTypes = { message: PropTypes.object.isRequired };

TchatMessage.defaultProps = {};

export default TchatMessage;
