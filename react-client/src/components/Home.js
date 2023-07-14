import React, { useContext } from 'react';
import UserContext from '../contexts/UserContext';
import '../styles/Home.css';
import NewPost from '../components/NewPost';
import PostList from '../components/PostList';

function Home() {
  let { isSignedIn } = useContext(UserContext);

  return (
    <div>
      { isSignedIn ? 
        <>
          <NewPost />
          <PostList />
        </>
          :
            <>
            <div className='home-container'>
            <div className='welcome-container-top'>
            <h2>PosterBook...connected creativity.</h2>
            <br></br><br></br>
            <h4>New to the PosterBook community? <a href='/register'>Register here</a>
            </h4>
            </div>
            </div>
            </>
      }
    </div>
  );
}

export default Home;