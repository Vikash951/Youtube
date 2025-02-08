import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { closeMenu } from '../utils/appSlice';
import { useSearchParams } from 'react-router';
import CommentContainer from './CommentContainer';
import LiveChat from './LiveChat';


const WatchPage = () => {
   
  const dispatch = useDispatch(); 
  
  const [searchParams] = useSearchParams();

  const videoId = searchParams.get('v');

  console.log(searchParams.get('v'));

  useEffect(()=>{
    dispatch(closeMenu());
  } , [])  

  return (
    <div className = "mt-16">
      <div className='flex gap-8'>
        <div className=' max-w-5xl pl-25 pt-8'>
            <iframe className='rounded-xl shadow-lg' 
                    width="900" 
                    height="500" 
                    src={`https://www.youtube.com/embed/${videoId}`}
                    title="YouTube video player" 
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                    
                    allowFullScreen>
            </iframe>
        </div>
        <div className='flex-1 pt-8 mr-5'>
            <LiveChat />
        </div>
      </div>
      <CommentContainer id = {videoId} />
    </div>
  )
}

export default WatchPage