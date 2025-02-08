const VideoCard = ({info}) => {
  
    const {snippet , statistics} = info;
    const {channelTitle, title , thumbnails} = snippet;
    return (
        <div className="p-2 m-2 w-80 shadow-lg rounded-lg">
            <img className="rounded-lg" src= {thumbnails?.medium?.url} alt="thumbnail" />
            <ul>
                <li className="font-bold py-2">{title}</li>
                <li className="text-gray-600">{channelTitle}</li>
                <li className="text-gray-600">{statistics.viewCount} views</li>
            </ul>
        </div>
    )
}



export default VideoCard;