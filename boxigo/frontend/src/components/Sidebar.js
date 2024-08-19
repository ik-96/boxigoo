import React from 'react';

function Sidebar({ activeTab, setActiveTab, setAuth }) {
  const handleLogout = () => {
    setAuth(false);
  };

  return (
    <div className="sidebar-container position-sticky top-0">
      <div className="sidebar position-sticky">
        <div className={`tab ${activeTab === 'my-moves' ? 'active' : ''}`}
          onClick={() => setActiveTab('my-moves')}>

          <img src="./assets/images/my_moves.png" alt="My Moves" />
          <span>MY MOVES</span>

        </div>
        <div className={`tab ${activeTab === 'my-profile' ? 'active' : ''}`}
          onClick={() => setActiveTab('my-profile')}>

          <img src="./assets/images/my_profile.png" alt="My Profile" />
          <span>MY PROFILE</span>

        </div>
        <div className={`tab ${activeTab === 'get-quote' ? 'active' : ''}`}
          onClick={() => setActiveTab('get-quote')} >

          <img src="./assets/images/create_estimate.png" alt="Get Quote" />
          <span>GET QUOTE</span>

        </div>
        <div className="tab" onClick={handleLogout}>
          <img src="./assets/images/logout.png" alt="Logout" />
          <span>LOGOUT</span>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
