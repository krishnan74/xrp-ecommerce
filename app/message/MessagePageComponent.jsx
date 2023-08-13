import React, { useState, useEffect } from "react";
import UserList from "./UserList";
import MessageSection from "./MessageSection";
import SendMessageForm from "./SendMessageForm";
import { createClient } from "@supabase/supabase-js";
import { useSelectedWallet } from "../SelectedWalletContext";

const supabase = createClient(
  "https://fveklwaemqucyxsrbmhv.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ2ZWtsd2FlbXF1Y3l4c3JibWh2Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY5MTMyNTc2MSwiZXhwIjoyMDA2OTAxNzYxfQ.xukOaFj-7g5OP2DEiBgK5BFg_BxvUgV2YVoxGDUc70I"
);



const MessagingPage = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [users, setUsers] = useState([]);

  // Example messages for selected user
  const [messages, setMessages] = useState([]);

  const handleSelectUser = (userId) => {
    setSelectedUser(userId);
    // Fetch messages for the selected user from an API or other data source
    // For now, using an empty array as placeholder
    setMessages([]);
  };

    const { selectedWallet } = useSelectedWallet();
    
    const fetchMessageData = async () => {
        let { data, error } = await supabase.from("MessagesTable").select().eq('sender', selectedWallet?selectedWallet.classicAddress: "");
      return { data, error };
    };

  useEffect(() => {
    console.log(selectedWallet ? selectedWallet : "No wallet selected oombu");
  }, [selectedWallet]);

  useEffect(() => {
    const fetchDataAndSetData = async () => {
      const { data, error } = await fetchMessageData();
      if (data) {
        setUsers(data);
      }
      };
       

    fetchDataAndSetData();
  }, [users]);

  return (
    <div className="flex h-screen">
      <div className="w-1/4 bg-gray-200 p-4">
        <UserList
          users={users}
          selectedUser={selectedUser}
          onSelectUser={handleSelectUser}
        />
      </div>
      <div className="w-3/4 bg-white p-4">
        <MessageSection selectedUser={selectedUser} messages={messages} />
        <SendMessageForm
          currentUser={selectedWallet}
          selectedUser={selectedUser}
        />
      </div>
    </div>
  );
};

export default MessagingPage;
