import React, { useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
    "https://fveklwaemqucyxsrbmhv.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ2ZWtsd2FlbXF1Y3l4c3JibWh2Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY5MTMyNTc2MSwiZXhwIjoyMDA2OTAxNzYxfQ.xukOaFj-7g5OP2DEiBgK5BFg_BxvUgV2YVoxGDUc70I"
);
  

const SendMessageForm = (props) => {
  const [newMessage, setNewMessage] = useState("");

  const sendMessageToDB = async () => {
    const { error } = await supabase
      .from("MessagesTable")
      .insert({
        sender: props.currentUser.classicAddress,
        receiver: props.selectedUser,
        message: newMessage,
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Implement logic to send the new message
    console.log("Sending message:", newMessage);
    sendMessageToDB();
    setNewMessage("");
  };

  return (
    <div className="mt-4">
      <h3 className="text-lg font-semibold mb-2">Send Message</h3>
      <form onSubmit={handleSubmit}>
        <textarea
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message..."
          className="w-full p-2 border rounded-md"
        />
        <button
          type="submit"
          className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default SendMessageForm;
