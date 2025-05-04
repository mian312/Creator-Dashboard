import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { reportPost, savePost, claimSavePostReward } from '../features/user/userSlice';

const PostCard = ({ post, onShare, isSavedScreen }) => {
  const dispatch = useDispatch();
  const [reported, setReported] = useState(false);
  const [showShareOptions, setShowShareOptions] = useState(false);
  const [shared, setShared] = useState(false);
  const [saved, setSaved] = useState(post.savedAt ? true : false);
  const [commentCount] = useState(post.comments?.length || Math.floor(Math.random() * 10));

  const handleReport = () => {
    dispatch(reportPost({ postId: post.postId, postUrl: post.postUrl }));
    setReported(true);
    setTimeout(() => {
      setReported(false);
    }, 3000);
  };

  const handleSave = () => {
    dispatch(savePost({
      postId: post.postId,
      postUrl: post.postUrl,
      source: post.source || 'unknown', // Add the source field
      title: post.title,
      content: post.content,
      thumbnail: post.thumbnail,
      author: post.author || 'Anonymous' // Add the author field
    }));
    // Add this line to claim the reward for saving a post
    dispatch(claimSavePostReward());
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
    }, 3000);
  };

  const handleShare = () => {
    // Add copy link functionality
    if (navigator.clipboard) {
      navigator.clipboard.writeText(post.postUrl)
        .then(() => {
          setShared(true);
          // Call the onShare callback to claim reward
          onShare();
          setTimeout(() => {
            setShared(false);
          }, 3000);
        })
        .catch(err => console.error('Failed to copy link: ', err));
    }
    setShowShareOptions(true);
  };

  const handleShareConfirm = (platform) => {
    // In a real app, this would integrate with the platform's sharing API
    setShowShareOptions(false);
    setShared(true);

    // Call the onShare callback to claim reward
    onShare();

    setTimeout(() => {
      setShared(false);
    }, 3000);
  };

  // Generate a random time between 1 and 24 hours ago
  const getRandomTime = () => {
    const hours = Math.floor(Math.random() * 24) + 1;
    return `${hours}h ago`;
  };

  // Extract the user's avatar initial
  const getInitial = () => {
    if (post.author) {
      return post.author.charAt(0).toUpperCase();
    }
    return 'U';
  };

  // Generate random hashtags related to the post content
  const getHashtags = () => {
    const tags = ['#trending', '#social', '#community', '#viral', '#content', '#share'];
    const numTags = Math.floor(Math.random() * 3) + 1;
    const selectedTags = [];

    for (let i = 0; i < numTags; i++) {
      const randomIndex = Math.floor(Math.random() * tags.length);
      if (!selectedTags.includes(tags[randomIndex])) {
        selectedTags.push(tags[randomIndex]);
      }
    }

    return selectedTags.join(' ');
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden transition-all hover:shadow-md">
      {/* Post Header */}
      <div className="flex items-center p-4">
        <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-400 to-indigo-500 flex items-center justify-center text-white font-medium mr-3">
          {getInitial()}
        </div>
        <div className="flex-grow">
          <p className="font-medium text-gray-800">{post.author || 'Anonymous User'}</p>
          <p className="text-xs text-gray-500">
            {post.savedAt ? new Date(post.savedAt).toLocaleDateString() : (post.timestamp || getRandomTime())}
            {post.source && <span className="ml-2 px-2 py-1 bg-gray-100 rounded-full text-xs">{post.source}</span>}
          </p>
        </div>
        <button
          onClick={handleReport}
          className="text-gray-400 hover:text-red-500 transition-colors"
          aria-label="Report post"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5v14M5 5h14l-4 7 4 7H5" />
          </svg>
        </button>
      </div>

      {/* Post Content */}
      <div className="px-4 pb-3">
        <h3 className="font-semibold text-gray-800 mb-2">{post.title}</h3>
        <p className="text-gray-600 mb-3">{post.content || ''}</p>
        <p className="text-sm text-blue-500">{getHashtags()}</p>
      </div>

      {/* Post Image (if available) */}
      {(post?.image) && (
        <div className="w-full h-64 bg-gray-100">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* Post Metrics */}
      <div className="px-4 py-2 border-t border-gray-100 flex text-sm text-gray-500">
        <div>
          <span>{commentCount} comments</span>
        </div>
      </div>

      {/* Post Actions */}
      <div className="flex border-t border-gray-100 divide-x divide-gray-100">
        {!isSavedScreen && (
          <button
            onClick={handleSave}
            className={`flex items-center justify-center py-3 flex-1 transition-colors ${saved ? 'text-blue-600' : 'text-gray-500 hover:text-blue-600'}`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill={saved ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={saved ? 0 : 2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-4-7 4V5z" />
            </svg>
            <span>Save</span>
          </button>
        )}
        {isSavedScreen && (
          <button
            className="flex items-center justify-center py-3 flex-1 text-blue-600 cursor-default"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="currentColor" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={0} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-4-7 4V5z" />
            </svg>
            <span>Saved</span>
          </button>
        )}
        <button
          onClick={handleShare}
          className="flex items-center justify-center py-3 flex-1 text-gray-500 hover:text-green-600 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
          </svg>
          <span>Share</span>
        </button>
      </div>

      {/* Share Options Popup */}
      {showShareOptions && (
        <div className="p-4 bg-gray-50 border-t border-gray-100">
          <p className="text-sm font-medium text-gray-600 mb-3">Share this post to:</p>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => {
                navigator.clipboard.writeText(post.postUrl)
                  .then(() => {
                    handleShareConfirm('copy');
                  })
                  .catch(err => console.error('Failed to copy link: ', err));
              }}
              className="flex items-center px-3 py-2 bg-blue-500 text-white rounded-md text-sm"
            >
              <svg className="h-4 w-4 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
              </svg>
              Copy Link
            </button>
            <button
              onClick={() => setShowShareOptions(false)}
              className="flex items-center px-3 py-2 bg-gray-200 text-gray-600 rounded-md text-sm ml-auto"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Feedback Messages */}
      {reported && (
        <div className="p-2 bg-red-50 border-t border-red-100 text-center text-sm text-red-600">
          Post reported. Thank you for your feedback.
        </div>
      )}

      {shared && (
        <div className="p-2 bg-green-50 border-t border-green-100 text-center text-sm text-green-600">
          Post shared! You earned coins for sharing.
        </div>
      )}

      {saved && (
        <div className="p-2 bg-blue-50 border-t border-blue-100 text-center text-sm text-blue-600">
          Post saved to your collection.
        </div>
      )}
    </div>
  );
};

export default PostCard;
