import React, { useEffect, useState, useCallback } from 'react';

function Boxes() {
  const [moveDetails, setMoveDetails] = useState(null);

  useEffect(() => {
    fetchMoveDetails();
  }, []);

  const fetchMoveDetails = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/data');
      const data = await response.json();
      setMoveDetails(data);
    } catch (error) {
      console.error('Error fetching move details:', error);
    }
  };

  const handleAccordionItemClick = useCallback((item) => {
    if (item.classList.contains('open')) {
      item.classList.remove('open');
    } else {
      document.querySelectorAll('.accordion-item').forEach((i) => {
        i.classList.remove('open');
      });
      item.classList.add('open');
    }
  }, []);

  const getOverallCount = (room) => {
    return room.itemsList.all.reduce((total, item) => {
      return total + Number(item.qty); 
    }, 0);
  };

  return (
    <>
      {moveDetails?.items?.rooms
        ?.filter((room) => room.roomName === 'Boxes')
        ?.map((room) => {
          const overallCount = getOverallCount(room);
          return (
            <div
              key={room.id}
              className="accordion-item"
              onClick={(e) => handleAccordionItemClick(e.currentTarget)}
            >
              <div className="accordion-item-header">
                <span className="accordion-item-header-title">
                  {room.roomName} <span className="total">{overallCount}</span>
                </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide accordion-item-header-icon"
                >
                  <path d="M6 15l6-6 6 6" />
                </svg>
              </div>
              <div className="accordion-item-description-wrapper">
                <div className="accordion-item-description">
                  <div className="row">
                    <div className="col-lg-3">
                      <h3 className="category">Items</h3>
                      <div className="row">
                        {room?.itemsList?.all?.map((item, index) => (
                          <React.Fragment key={index}>
                            <div className="col-lg-6">
                              <div className="cat_div">
                                <h6 className="c_name">{item.display_name}</h6>
                                {item.type && (
                                  <h6 className="c_type">
                                    {item.type.default_type.join(', ')}
                                  </h6>
                                )}
                                {item.size && (
                                  <h6 className="c_size">
                                    {item.size.defaultSelect}
                                  </h6>
                                )}
                              </div>
                            </div>
                            <div className="col-lg-6">
                              <div className="count_div">
                                <p className="c_count">{item.qty}</p>
                              </div>
                            </div>
                          </React.Fragment>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
    </>
  );
}

export default Boxes;
