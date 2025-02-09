import React, { useEffect, useState } from 'react';
import { GOOGLE_API_KEY } from '../utils/constant';

const ChannelDetail = ({ id }) => {
  const [channelName, setChannelName] = useState('');
  const [channelIcon, setChannelIcon] = useState('');
  const [subscriberCount , setSubscriberCount] = useState(0);

  const getChannelDetail = async () => {
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/channels?part=snippet&id=${id}&key=${GOOGLE_API_KEY}`
    );
    const data = await fetch(`https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${id}&key=${GOOGLE_API_KEY}`)
    const json = await response.json();
    const data_json = await data.json();

    console.log(data_json);

    
    if (!response.ok || !json.items || json.items.length === 0) {
      setChannelName('Unknown Channel');
      setChannelIcon('https://via.placeholder.com/150'); 
      return;
    }

    if(!response.ok || !json.items || json.items.length === 0){

    }

    setSubscriberCount(data_json?.items[0]?.statistics?.subscriberCount);
    setChannelName(json.items[0].snippet.localized.title);
    setChannelIcon(json.items[0].snippet.thumbnails.default.url);
  };

  useEffect(() => {
    if (id) {
      getChannelDetail();
    }
  }, [id]);

  return (
    <div className="flex items-center gap-4">
    <img className="w-12 h-12 rounded-full" src={channelIcon} alt="Channel Icon" />
    <div className="flex flex-col">
      <div className='font-bold text-lg'>{channelName}</div>
      <div className='text-sm'>{subscriberCount} subscribers</div>
    </div>
    <button className="bg-black rounded-xl p-2 text-white ml-5">Subscribe</button>
  </div>
  
  );
};

export default ChannelDetail;
