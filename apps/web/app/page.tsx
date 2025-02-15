"use client";
import { useState } from "react";
import { useSocket } from "../context/SocketProvider";
import styles from "./page.module.css"; // Import CSS module

const Page = () => {
  const { sendMessage, messages } = useSocket();
  const [message, setMessage] = useState("");

  return (
    <div className={styles.container}>
      {/* Input & Button Section */}
      <div className={styles.inputContainer}>
        <input
          onChange={(e) => setMessage(e.target.value)}
          className={styles.chatInput}
          placeholder="Type a message..."
          type="text"
          value={message}
        />
        <button
          onClick={() => {
            if (message.trim()) sendMessage(message);
            setMessage(""); // Clear input after sending
          }}
          className={styles.button}
        >
          Send
        </button>
      </div>

      {/* Messages Section */}
      <div className={styles.messagesContainer}>
        <h1 className={styles.header}>All Messages Appear Here</h1>
        <ul className={styles.messageList}>
          {messages.map((e, index) => (
            <li key={index} className={styles.message}>
              {e}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Page;
