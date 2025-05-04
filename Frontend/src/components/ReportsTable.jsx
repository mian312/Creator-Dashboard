import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchReports } from '../features/admin/adminSlice';
import { getReports } from '../api';

const ReportsTable = () => {
  const reports = useSelector((state) => state.admin.reports);
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortedReports, setSortedReports] = useState([]);

  useEffect(() => {
    dispatch(fetchReports());
  }, [dispatch]);

  useEffect(() => {
    // Sort reports by timestamp in descending order (latest first)
    const sorted = [...reports].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    setSortedReports(sorted);
  }, [reports]);

  const handleRefresh = async () => {
    // Manually fetch reports using the API
    const data = await getReports();
    // Sort reports by timestamp in descending order (latest first)
    const sorted = [...data].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    setSortedReports(sorted);

    // Update the Redux store with the new reports
    dispatch({ type: 'admin/fetchReports/fulfilled', payload: data });
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is 0-indexed
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${day}/${month}/${year} ${hours}:${minutes}`;
  };

  const filteredReports = sortedReports.filter((report) => {
    // Customize the search filter as needed
    return (
      report.reporter?.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.post.postUrl.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const truncateUrl = (url, maxLength = 30) => {
    if (!url) {
      return '';
    }
    if (url.length <= maxLength) {
      return url;
    }
    return url.substring(0, maxLength) + '...';
  };

  return (
    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="block text-gray-700 text-sm font-bold">Reports</h3>
        <div className="flex items-center">
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mr-2"
            type="text"
            placeholder="Search Reports"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={handleRefresh}
          >
            Refresh
          </button>
        </div>
      </div>
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="px-4 py-2">Reporter</th>
            <th className="px-4 py-2">Post URL</th>
            <th className="px-4 py-2">Date/Time</th>
          </tr>
        </thead>
        <tbody>
          {filteredReports.map((report) => (
            <tr key={report._id}>
              <td className="border px-4 py-2">{report.reporter?.username || 'Deleted User'}</td>
              <td className="border px-4 py-2">
                <a href={report.post.postUrl} className='text-blue-400' target="_blank" rel="noopener noreferrer">
                  {truncateUrl(report.post.postUrl, 30)}
                </a>
              </td>
              <td className="border px-4 py-2">{formatDate(report.timestamp)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReportsTable;
