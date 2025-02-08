import { useState } from 'react';
import React , {useEffect } from 'react'
import { YOUTUBE_VIDEO_API } from '../utils/constant';
import VideoCard from './VideoCard';
import { Link } from 'react-router';

const VideoContainer = () => {

  const [videos, setVideos] = useState([])
  useEffect(()=>{
    getVideos();
  } , [])

  const getVideos = async ()=>{
    const response = await fetch(YOUTUBE_VIDEO_API);
    const data = await response.json();
    setVideos(data.items);
  }
  return (
    <div className='flex flex-wrap justify-evenly'>
      {videos.map((video) => <Link to={"watch?v=" + video.id} key={video?.id} ><VideoCard info = {video}/> </Link>)}
    </div>
  )
}

export default VideoContainer