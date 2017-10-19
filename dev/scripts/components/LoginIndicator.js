import React from 'react';

const LoginIndicator = (props) => {
  console.log(props);
  const { user, handleLogging } = props;

  const { photoURL, displayName } = user || {photoURL: null, displayName: null};

  return (
    <div className="LoginIndicator">
      {user && 
        <div className="LoginIndicator__userInfo">
          <img src={photoURL} className="LoginIndicator__userPhoto" alt="Photo of User."/>
          <p className="LoginIndicator__userName">{displayName}</p>
        </div>
      }
      <button onClick={handleLogging} className="LoginIndicator__LoginBtn">{user ? 'Log Out' : 'Log In'}</button>
    </div>
  );
};

export default LoginIndicator; 