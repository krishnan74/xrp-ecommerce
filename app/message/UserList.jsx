import React from 'react';

const UserList = ({ users, selectedUser, onSelectUser }) => {
  return (
    <div className="user-list bg-gray-200 p-4 rounded-lg">
      <h3 className="text-lg font-semibold mb-3">Recent Contacts</h3>
      <ul>
        {users.map((user) => (
          <li
            key={user.id}
            onClick={() => onSelectUser(user.receiver)}
            className={`mb-2 p-2 rounded-md cursor-pointer ${
              selectedUser === user.receiver ? 'bg-blue-500 text-white' : 'bg-white'
            }`}
          >
            {user.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
