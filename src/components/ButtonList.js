import React from 'react'
import Button from './Button'

const list = ["All" , "Gaming" , "News" , "Songs" , "Podcasts" , "T-series" , "Music" , "Computer Programming" , "Romantic" , "Live", "Satire" , "Game shows" , "Smartphones" , "Tablet computers" , "Display devices" , "Comedy" , "Recently uploaded" , "Watched"];

const ButtonList = () => {
  return (
    <div className='flex  flex-wrap mt-20 ml-[35px] '>

      {list.map((item , index) => <Button key = {index} name = {item} />)}
     
    </div>
  )
}

export default ButtonList