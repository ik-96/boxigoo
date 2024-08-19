
import React from 'react';
import MoveDetails from './MoveDetails';

function TabContent({ activeTab }) {
  return (
    <div className="content">
      {activeTab === 'my-moves' && (

        <div id="my-moves" className="content-section show">
          <h3>My Moves</h3>
          <MoveDetails />
        </div>
      )}
      
      {activeTab === 'my-profile' && (
        <div id="my-profile" className="content-section show">
          <h3>My Profile</h3>
        </div>
      )}
      {activeTab === 'get-quote' && (
        <div id="get-quote" className="content-section show">
          <h3>Get Quote</h3>
        </div>
      )}
    </div>
  );
}

export default TabContent;
