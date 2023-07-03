import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import Picker from "emoji-picker-react";
import React, { useEffect, useRef, useState } from "react";
import { Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import io from "socket.io-client";
import { BASE_URL } from "../../api/url";
import { faFaceSmile } from "@fortawesome/free-regular-svg-icons";
import "./Chat.css";
import { Link } from "react-router-dom";

const socket = io.connect(BASE_URL);
export default function Chat() {
  const colors = ["#1E87D1", "#DAA532", "#3EC96E", "#FD0074", "#AB6CAD", "#FF0009", "#8B64DB"];
  const [messages, setMessages] = useState([]);
  const formRef = useRef(null);
  const { token } = useSelector(store => store.user);
  const [color] = useState(colors[Math.floor(Math.random() * colors.length)]);
  const [openPicker, setOpenPicker] = useState(false);
  useEffect(() => {
    socket.on("message", data => {
      setMessages(value => [...value, { message: data.message, name: data.name, color: data.color }]);
    });
    // eslint-disable-next-line
  }, [socket]);

  const sendMessage = e => {
    e.preventDefault();
    let headers = { headers: { Authorization: `Bearer ${token}` } };
    let message = formRef.current.elements.message.value;
    if (message.length < 1) return;
    formRef.current.reset();
    axios.post(`${BASE_URL}/api/message`, { message, color }, headers).catch(error => console.log(error));
  };

  const addEmoji = (event, emoji) => {
    formRef.current.elements.message.value += emoji.emoji;
  };

  const togglePicker = () => {
    setOpenPicker(value => !value);
  };

  return (
    <div className="d-flex Stream-container">
      <div className="iframe-container">
      <iframe className="Chat-iframe" src="https://www.youtube.com/embed/live_stream?channel=UCV1bFDCAXSAUSjyYSROH2TA&autoplay=1" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
      <div>
        <Link to="/concerts">
        <Button variant="main" className="m-3">Go to Concerts</Button>
        </Link>
      </div>
      </div>
      <div className="Chat-container p-3">
        <div className="Chat d-flex flex-column justify-content-end">
          {messages.map((message, index) => (
            <p className="text-white" key={index}>
              <span style={{ color: message.color, fontWeight: "bold" }}>{message.name}: </span>
              {message.message}
            </p>
          ))}
        </div>
        <form ref={formRef} className="d-flex flex-column" onSubmit={sendMessage}>
          <div className="d-flex">
            <input
              autoComplete="off"
              name="message"
              placeholder="Send Message"
              className="border-0 text-white p-2 Chat-input"
              maxLength={100}
            />
            <button type="button" onClick={togglePicker} className="Picker-button">
              <FontAwesomeIcon className="fs-5 text-white" icon={faFaceSmile} />
            </button>
          </div>
          {openPicker && (
            <div className="Chat-picker">
              <Picker onEmojiClick={addEmoji} native />
            </div>
          )}

          <Button type="submit" variant="main" className="ms-auto">
            Chat
          </Button>
        </form>
      </div>
    </div>
  );
}
