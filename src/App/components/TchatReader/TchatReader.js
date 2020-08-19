import React from 'react';
import PropTypes from 'prop-types';
import styles from './TchatReader.module.scss';
import TchatMessage from '../TchatMessage/TchatMessage';
import {useState} from 'react';
const TchatReader = (props) => {
  const [messages, setMessages] = useState([{ "id": 1, message: "DEMAT breizhouz", userId: 1, date: "2020-08-18T09:42:00", color: "#FF",user:{"id": 1,"name": "Alex","nickname": "champix"} },
]);
  return (
    <div className={styles.TchatReader} data-testid="TchatReader" style={{...props.style}}>
      {messages.map((e, i) => {
        return <TchatMessage key={`message-${i}`} message={e} isMine={props.whoiamID === e.userId} />
      })}
    </div>
  );
}

TchatReader.propTypes = {
  
};

TchatReader.defaultProps = {
  messages: [
    { "id": 1, message: "DEMAT breizhouz", userId: 1, date: "2020-08-18T09:42:00", color: "#FF",user:{"id": 1,"name": "Alex","nickname": "champix"} },
    { "id": 2, message: "DEMAT Grand breizhouz", userId: 2, date: "2020-08-18T09:43:00", color: "GREY", user: {id: 2, name: "Oumayma",nickname: "Oumayma"} }
  ],
  whoiamID: 1
};

export default TchatReader;
