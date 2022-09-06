import axios from '../../axios'
import React, { useEffect, useState } from 'react'
import YouTube from 'react-youtube'
import './RowPost.css'
import {API_KEY, imageUrl} from '../../constants/constants'

function RowPost(props) {
  const[movies,setMovies]=useState([])
  const [urlId,setUrlId]=useState('')
  useEffect(()=>{
  axios.get(props.url).then((response)=>{
    console.log(response.data.results);
    setMovies(response.data.results)
  }).catch(err=>{
    alert(err)
  })
  },[])

  const opts = {
    height: '390',
    width: '100%',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  }

  const handleTrailer=(id)=>{
    console.log(id);
     axios.get(`/movie/${id}/videos?api_key=${API_KEY}&language=en-US`).then((response)=>{
        console.log(response.data);
        if(response.data.results.length!=0)
        {
          setUrlId(response.data.results[1])
        }
        else{
          console.log('Array Empty');
        }
     })
  }
  return (
    <div className='row'>
      <h2 className='header'>{props.title}</h2>
      <div className='posters'>
        {movies.map((obj)=>{
         return(<img onClick={()=>handleTrailer(obj.id)} className={props.isSmall?'smallPoster':'poster'} src={`${imageUrl+obj.backdrop_path}`} alt='image logo'/>) 
        }
          )}

        
      </div>
      {
        urlId && <YouTube opts={opts} videoId={urlId.key}/>
      }
      
    </div>
  )
}

export default RowPost
