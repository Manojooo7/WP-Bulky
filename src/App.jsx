import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios'

function App() {
  const [posArray, setPosArray] = useState('')
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [postUrl, setPostUrl] = useState('')

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('array', posArray);
    data.append('userName', userName);
    data.append('password', password);
    data.append('setPostUrl', postUrl);
    // You can also send the formData to your API here
    createWordpressPost();
  }

  const createWordpressPost = async () => {
    const WpAuthHeader = 'Basic ' + btoa(`${userName}:${password}`);
    
    JSON.parse(posArray).map(async (post) => {
      const postConfig = {
        method: 'post',
        url: `${postUrl}`,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': WpAuthHeader,
        },
        data: post,
      }
    
      try {
        const response = await axios.request(postConfig)
        console.log('WordPress Post Response:', response)
      } catch (error) {
        console.error("Error creating WordPress post:", error)
      }
    })
  };

  return (
    <div className="flex flex-col justify-center align-middle items-center w-full h-screen bg-zinc-900">
      <h1 className='text-white font-bold text-5xl text-center'>Bulk WP Post Creator</h1>
      <a className='text-white text-center mt-3' href='https://developer.wordpress.org/rest-api/reference/posts/#arguments-2' target='_blank' rel="noopener noreferrer">Check Documentation</a>
      <form className='flex flex-col w-1/3 gap-6 mt-5' onSubmit={handleFormSubmit}>
        <textarea 
          value={posArray}
          onChange={(e) => setPosArray(e.target.value)} 
          cols="30" 
          rows="10" 
          className='rounded-lg p-3' 
          placeholder='Paste Your Array Here'>
        </textarea>
        <div className="flex gap-6">
          <input 
            type='text' 
            placeholder='User Name' 
            className='rounded-lg p-2 w-1/2' 
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
          <input 
            type='password' 
            placeholder='Password' 
            className='rounded-lg p-2 w-1/2' 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <input 
          type='text' 
          placeholder='yourwebsitename.com/wp-json/wp/v2/post' 
          className='rounded-lg p-2 text-[15px]' 
          value={postUrl}
          onChange={(e) => setPostUrl(e.target.value)}
        />
        <button type='submit' className='bg-blue-500 text-white rounded-lg p-2'>Submit</button>
      </form>
    </div>
  )
}

export default App;
