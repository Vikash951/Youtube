import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { closeMenu } from '../utils/appSlice';
import { useSearchParams } from 'react-router';
import CommentContainer from './CommentContainer';
import LiveChat from './LiveChat';
import { GOOGLE_API_KEY } from '../utils/constant';
import ChannelDetail from './ChannelDetail';

const WatchPage = () => {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const [channelId, setChannelId] = useState("");
  const videoId = searchParams.get('v');

  const getChannelId = async () => {
    const response = await fetch(`https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${GOOGLE_API_KEY}`);
    const json = await response.json();
    setChannelId(json?.items[0]?.snippet?.channelId);
  };

  useEffect(() => {
    getChannelId();
  }, []);  

  useEffect(() => {
    dispatch(closeMenu());
  }, [dispatch]); 

  return (
    <div className="mt-16">
      <div className='flex gap-8'>
        <div className='max-w-5xl pl-25 pt-8'>
          <iframe
            className='rounded-xl shadow-lg'
            width="900"
            height="500"
            src={`https://www.youtube.com/embed/${videoId}`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
          <div className='mt-6'>
            <ChannelDetail id={channelId} />
          </div>
        </div>
        <div className='flex-1 pt-8 mr-5'>
          <LiveChat />
        </div>
      </div>
      <CommentContainer id={videoId} />
    </div>
  );
};

export default WatchPage;
