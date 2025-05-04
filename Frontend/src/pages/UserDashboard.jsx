import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPosts } from '../api';
import { setPosts, appendPosts } from '../features/posts/postsSlice';
import { fetchUserProfile, claimDailyReward, claimShareReward, fetchSavedPosts } from '../features/user/userSlice';
import { logout } from '../features/auth/authSlice';
import { useNavigate, Link } from 'react-router-dom';
import ProfileCompletionForm from '../components/ProfileCompletionForm';
import PostCard from '../components/PostCard';
import DailyRewardButton from '../components/DailyRewardButton';
import { fetchSavedPosts as fetchSavedPostsAPI } from '../api';

const UserDashboard = () => {
  const { username, role } = useSelector((state) => state.auth);
  const posts = useSelector((state) => state.posts.feed);
  const { coins, status, email, mobile, savedPosts } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [activeSection, setActiveSection] = useState('feed');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const observer = useRef();
  const lastPostElementRef = useCallback(node => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        loadMorePosts();
      }
    });
    if (node) observer.current.observe(node);
  }, [loading, hasMore]);

  useEffect(() => {
    // Fetch user profile to get updated coins
    dispatch(fetchUserProfile());
    // console.log(savedPosts)
    // Initial posts load
    const getPosts = async () => {
      setLoading(true);
      try {
        const data = await fetchPosts(1); // Get first page
        dispatch(setPosts(data));
        setHasMore(data.length > 0);
      } catch (error) {
        // console.error("Failed to fetch posts:", error);
      } finally {
        setLoading(false);
      }
    };

    getPosts();
  }, [dispatch]);

  const loadMorePosts = async () => {
    if (loading) return;

    setLoading(true);
    const nextPage = page + 1;

    try {
      const data = await fetchPosts(nextPage);
      if (data.length > 0) {
        dispatch(appendPosts(data));
        setPage(nextPage);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      // console.error("Failed to load more posts:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const handleShareReward = () => {
    dispatch(claimShareReward());
  };

  const profileDetails = (
    <div>
      <p>Username: {username}</p>
      <p>Role: {role}</p>
      <p>Coins: {coins}</p>
      {email ? <p>Email: {email}</p> : null}
      {mobile ? <p>Mobile: {mobile}</p> : null}
    </div>
  );

  useEffect(() => {
    if (activeSection === 'saved') {
      // Fetch saved posts when the user navigates to the saved posts section
      dispatch(fetchSavedPosts());
    }
  }, [activeSection, dispatch]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-50 flex">
      {/* Navigation */}
      <nav className="bg-white shadow-md fixed bottom-0 left-0 right-0 z-10">
        <div className="flex justify-around items-center">
          <button
            onClick={() => setActiveSection('feed')}
            className={`flex flex-col items-center py-3 ${activeSection === 'feed' ? 'text-blue-600' : 'text-gray-500'
              }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
            </svg>
            <span className="text-xs">Feed</span>
          </button>

          <button
            onClick={() => setActiveSection('profile')}
            className={`flex flex-col items-center py-3 ${activeSection === 'profile' ? 'text-blue-600' : 'text-gray-500'
              }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <span className="text-xs">Profile</span>
          </button>

          <button
            onClick={() => setActiveSection('saved')}
            className={`flex flex-col items-center py-3 ${activeSection === 'saved' ? 'text-blue-600' : 'text-gray-500'
              }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
              viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-4-7 4V5z" />
            </svg>
            <span className="text-xs">Saved Post</span>
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow p-6 pb-20 md:pb-6">
        {/* Mobile header */}
        <div className="md:hidden flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-md bg-blue-600 flex items-center justify-center">
              <span className="text-white font-bold">S</span>
            </div>
            <h1 className="text-xl font-bold text-gray-800">SocialApp</h1>
          </div>

          <div className="flex items-center space-x-3">
            <div className="bg-blue-50 rounded-full px-3 py-1">
              <div className="flex items-center space-x-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
                </svg>
                <span className="font-medium text-blue-600">{status === 'loading' ? '...' : coins}</span>
              </div>
            </div>
            <div className="block">
              <DailyRewardButton onClaim={() => dispatch(claimDailyReward())} disabled={status === 'loading'} />
            </div>

            <button onClick={handleLogout} className="text-gray-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            </button>
          </div>
        </div>

        {/* Content sections */}
        <div className="container mx-auto max-w-2xl">
          {activeSection === 'feed' && (
            <>
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Your Feed</h2>
              <div className="space-y-4">
                {Array.isArray(posts) && posts.map((post, index) => {
                  if (posts.length === index + 1) {
                    return (
                      <div ref={lastPostElementRef} key={index}>
                        <PostCard
                          post={post}
                          onShare={handleShareReward}
                        />
                      </div>
                    );
                  } else {
                    return (
                      <PostCard
                        key={index}
                        post={post}
                        onShare={handleShareReward}
                      />
                    );
                  }
                })}

                {loading && (
                  <div className="flex justify-center p-4">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                  </div>
                )}

                {!hasMore && posts.length > 0 && (
                  <div className="text-center text-gray-500 py-4">
                    You've reached the end of your feed
                  </div>
                )}

                {!loading && posts.length === 0 && (
                  <div className="bg-white rounded-lg shadow p-6 text-center">
                    <p className="text-gray-500">No posts to display</p>
                  </div>
                )}
              </div>
            </>
          )}
          {activeSection === 'profile' && (
            <>
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                {email && mobile ? 'Your Profile' : 'Complete Your Profile'}
              </h2>
              <div className="bg-white rounded-lg shadow-md p-6">
                {email && mobile ? (
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3 mb-6">
                      <div className="h-16 w-16 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-xl font-bold">
                        {username.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-gray-800">{username}</h3>
                        <p className="text-sm text-gray-500 capitalize">{role}</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <p className="flex justify-between py-2 border-b">
                        <span className="text-gray-600">Email:</span>
                        <span className="font-medium">{email}</span>
                      </p>
                      <p className="flex justify-between py-2 border-b">
                        <span className="text-gray-600">Mobile:</span>
                        <span className="font-medium">{mobile}</span>
                      </p>
                      <p className="flex justify-between py-2 border-b">
                        <span className="text-gray-600">Coins:</span>
                        <span className="font-medium text-blue-600">{coins}</span>
                      </p>
                    </div>
                  </div>
                ) : (
                  <ProfileCompletionForm />
                )}
              </div>
            </>
          )}
          {activeSection === 'saved' && (
            <>
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Saved Posts</h2>
              <div className="space-y-4">
                {Array.isArray(savedPosts) && savedPosts.length > 0 && typeof savedPosts[0] === 'object' ? (
                  savedPosts.map((post, index) => (
                    <PostCard
                      key={index}
                      post={post}
                      onShare={handleShareReward}
                      isSavedScreen={true}
                    />
                  ))
                ) : (
                  <div className="bg-white rounded-lg shadow-md p-6">
                    <div className="text-center py-8">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-300 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-4-7 4V5z" />
                      </svg>
                      <p className="text-gray-500">
                        {Array.isArray(savedPosts) && savedPosts.length > 0 
                          ? "Loading saved posts..." 
                          : "No saved posts yet"}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default UserDashboard;
