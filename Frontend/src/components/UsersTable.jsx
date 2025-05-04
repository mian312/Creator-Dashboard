import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAllUsers, updateUserCoins } from '../features/admin/adminSlice';

const UsersTable = () => {
  const users = useSelector((state) => state.admin.users);
  const status = useSelector((state) => state.admin.status);
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState('');
  const [coinsToUpdate, setCoinsToUpdate] = useState('');
  const [selectedUserId, setSelectedUserId] = useState(null);

  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);

  const handleUpdateCoins = async (userId, coins) => {
    await dispatch(updateUserCoins({ userId, coins }));
    setCoinsToUpdate(''); // Clear the input after successful update
    setSelectedUserId(null);
  };

  const filteredUsers = users?.filter((user) => {
    return (
      user?.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user?.email?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const handleRefresh = () => {
    dispatch(fetchAllUsers());
  };

  return (
    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="block text-gray-700 text-sm font-bold">Users</h3>
        <div className="flex items-center">
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mr-2"
            type="text"
            placeholder="Search Users"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={handleRefresh}
            disabled={status === 'loading'}
          >
            {status === 'loading' ? 'Loading...' : 'Refresh'}
          </button>
        </div>
      </div>

      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="px-4 py-2">Username</th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">Coins</th>
            <th className="px-4 py-2">Update Coins</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers?.map((user) => (
            <tr key={user._id}>
              <td className="border px-4 py-2">{user.username}</td>
              <td className="border px-4 py-2">{user.email}</td>
              <td className="border px-4 py-2">{user.coins}</td>
              <td className="border px-4 py-2">
                <div className="flex items-center">
                  <input
                    className="shadow appearance-none border rounded w-20 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mr-2"
                    type="number"
                    placeholder="New Coins"
                    value={selectedUserId === user._id ? coinsToUpdate : ''}
                    onChange={(e) => {
                      setSelectedUserId(user._id);
                      setCoinsToUpdate(e.target.value);
                    }}
                  />
                  <button
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    onClick={() => {
                      if (selectedUserId === user._id) {
                        handleUpdateCoins(user._id, coinsToUpdate);
                      } else {
                        alert('Please enter coins for the correct user.');
                      }
                    }}
                    disabled={status === 'loading'}
                  >
                    {status === 'loading' && selectedUserId === user._id ? 'Updating...' : 'Update'}
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersTable;
