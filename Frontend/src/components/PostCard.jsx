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
              onClick={() => handleShareConfirm('twitter')}
              className="flex items-center px-3 py-2 bg-blue-500 text-white rounded-md text-sm"
            >
              <svg className="h-4 w-4 mr-1" viewBox="0 0 24 24" fill="currentColor">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
              </svg>
              Twitter
            </button>
            <button
              onClick={() => handleShareConfirm('facebook')}
              className="flex items-center px-3 py-2 bg-blue-600 text-white rounded-md text-sm"
            >
              <svg className="h-4 w-4 mr-1" viewBox="0 0 24 24" fill="currentColor">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
              Facebook
            </button>
            <button
              onClick={() => handleShareConfirm('linkedin')}
              className="flex items-center px-3 py-2 bg-blue-700 text-white rounded-md text-sm"
            >
              <svg className="h-4 w-4 mr-1" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
              LinkedIn
            </button>
            <button
              onClick={() => handleShareConfirm('whatsapp')}
              className="flex items-center px-3 py-2 bg-green-500 text-white rounded-md text-sm"
            >
              <svg className="h-4 w-4 mr-1" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              WhatsApp
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
