import React from 'react';
import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import { useSelectedWallet } from "../SelectedWalletContext";
import SendMessageForm from "./SendMessageForm";

const supabase = createClient(
  "https://fveklwaemqucyxsrbmhv.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ2ZWtsd2FlbXF1Y3l4c3JibWh2Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY5MTMyNTc2MSwiZXhwIjoyMDA2OTAxNzYxfQ.xukOaFj-7g5OP2DEiBgK5BFg_BxvUgV2YVoxGDUc70I"
);

const MessageSection = (props) => {
  const [messages, setMessages] = useState([]);
  const { selectedWallet } = useSelectedWallet();

  const fetchMessageData = async () => {
    let { data, error } = await supabase.from("MessagesTable").select();

    if (data) {
      data = data.filter(
        (item) =>
          (item.receiver === props.selectedUser &&
            item.sender === selectedWallet.classicAddress) ||
          (item.receiver === selectedWallet.classicAddress &&
            item.sender === props.selectedUser)
      );
    }

    return { data, error };
  };

  useEffect(() => {
    const fetchDataAndSetData = async () => {
      const { data, error } = await fetchMessageData();
      if (data) {
        setMessages(data);
      }
    };

    fetchDataAndSetData();
  }, [messages]);

  return (
    <div className="message-section">
      <h3>Messages with {props.selectedUser}</h3>
      <div className="messages">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`message ${
              message.sender === selectedWallet.classicAddress ? "right" : "left"
            }`}
          >
            {message.message}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MessageSection;
