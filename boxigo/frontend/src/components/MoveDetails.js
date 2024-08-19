import React, { useEffect, useState, useCallback } from 'react';
import AccordionItems from './AccordionItems.js'

function MoveDetails() {
  const [activeSection, setActiveSection] = useState('my-moves');
  const [moveDetails, setMoveDetails] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedDetails, setEditedDetails] = useState({});
  

  useEffect(() => {
    window.showContent = showContent;
    window.toggleDetails = toggleDetails;
    fetchMoveDetails();
  }, []);

  const fetchMoveDetails = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/data');
      const data = await response.json();
      setMoveDetails(data);
      setEditedDetails(data);
    } catch (error) {
      console.error('Error fetching move details:', error);
    }
  };

  const showContent = useCallback((sectionId) => {
    if (activeSection === sectionId) {
      setActiveSection(null);
      const section = document.getElementById(sectionId);
      if (section) {
        section.classList.remove('show');
        setTimeout(() => {
          section.style.display = 'none';
        }, 500);
      }

      const activeTab = document.querySelector(`[data-section="${sectionId}"]`);
      if (activeTab) {
        activeTab.classList.remove('active');
      }
    } else {
      setActiveSection(sectionId);

      const activeSectionElement = document.getElementById(sectionId);
      if (activeSectionElement) {
        activeSectionElement.style.display = 'block';
        setTimeout(() => {
          activeSectionElement.classList.add('show');
        }, 10);
      }

      const activeTab = document.querySelector(`[data-section="${sectionId}"]`);
      if (activeTab) {
        activeTab.classList.add('active');
      }
    }
  }, [activeSection]);

  const toggleDetails = useCallback((detailsId) => {
    const details = document.getElementById(detailsId);
    if (details.classList.contains('show')) {
      details.classList.remove('show');
      setTimeout(() => {
        details.style.display = 'none';
      }, 500);
    } else {
      details.style.display = 'block';
      setTimeout(() => {
        details.classList.add('show');
      }, 10);
    }
  }, []);

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditedDetails({ ...editedDetails, [name]: value });
  };

  const handleSaveClick = () => {
    setMoveDetails(editedDetails);
    setIsEditing(false);
  };


  return (
    <div className="move">
      <div className="move-details">
        <div className="location">
          <h6>From</h6>
          <p>{moveDetails?.moving_from}</p>
        </div>
        <div className="arrow">
          <img src="./assets/images/move_arrow.png" alt="arrow" />
        </div>
        <div className="location">
          <h6>To</h6>
          <p>{moveDetails?.moving_to}</p>
        </div>
        <div className="request">
          <h6>Request#</h6>
          <a href="#">
            <p><strong>{moveDetails?.estimate_id}</strong></p>
          </a>
        </div>
      </div>
      <div className="property-details">
        <div className="property">
          <img src="./assets/images/property_size.png" alt="" />
          <span>{moveDetails?.property_size}</span>
        </div>
        <div className="size">
          <img src="./assets/images/total_items.png" alt="" />
          <span>{moveDetails?.total_items}</span>
        </div>
        <div className="distance">
          <img src="./assets/images/distance.png" alt="" />
          <span>{moveDetails?.distance}</span>
        </div>
        <div className="date-time">
          <img src="./assets/images/move_date.png" alt="" />
          <span>{new Date(moveDetails?.moving_on).toLocaleString()}</span>
          <img className="img_2" src="./assets/images/pencil_edit.png" alt="" />
        </div>
        <div className="flexible">
          <div className="form-check">
            <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" checked={moveDetails?.move_date_flexible === "1"} readOnly />
            <label className="form-check-label" htmlFor="flexCheckDefault">Is flexible</label>
          </div>
        </div>
        <div className="actions">
          <button onClick={() => showContent('move-details_1')} type="button" className="btn_1">View move details</button>
          <button type="button" className="btn_2">Quotes Awaiting</button>
        </div>
      </div>
      <div className="disclaimer">
        <p>
          <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="exclamation-triangle" className="svg-inline--fa fa-exclamation-triangle fa-w-18" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
            <path fill="#EE553B" d="M569.517 440.013C587.975 472.007 564.806 512 527.94 512H48.054c-36.937 0-59.999-40.055-41.577-71.987L246.423 23.985c18.467-32.009 64.72-31.951 83.154 0l239.94 416.028zM288 354c-25.405 0-46 20.595-46 46s20.595 46 46 46 46-20.595 46-46-20.595-46-46-46zm-43.673-165.346l7.418 136c.347 6.364 5.609 11.346 11.982 11.346h48.546c6.373 0 11.635-4.982 11.982-11.346l7.418-136c.375-6.874-5.098-12.654-11.982-12.654h-63.383c-6.884 0-12.356 5.78-11.981 12.654z"></path>
          </svg>
          <span><strong>Disclaimer:</strong> Please update your move date before two days of shifting</span>
        </p>
      </div>
      <hr />
      <div id="move-details_1" className={`details ${activeSection === 'move-details_1' ? 'show' : ''}`}>
        <div className="head">
          <h3>Inventory Details</h3>
          <button type="button" className="btn btn-dark btn-sm">Edit house details</button>
        </div>
        <div className="accordion mt-4">
         <AccordionItems />
        </div>
        <div className="head">
          <h3>House Details</h3>
          <button type="button" className="btn btn-dark btn-sm" onClick={handleEditClick}>
          {isEditing ? 'Cancel' : 'Edit house details'}
            </button>
        </div>
        <div className="house-details">
        {isEditing ? (
            <form>
            <div className="row">
              <div className="col-lg-12">
                <h4 className="head_detail">Existing House Details</h4>
              </div>
              <div className="col-lg-3">
                <div className="form-group">
                  <label htmlFor="old_floor_no">Floor No.</label>
                  <input
                    type="text"
                    className="form-control"
                    id="old_floor_no"
                    name="old_floor_no"
                    value={editedDetails.old_floor_no || ''}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="col-lg-3">
                <div className="form-group">
                  <label htmlFor="old_elevator_availability">Elevator Available</label>
                  <input
                    type="text"
                    className="form-control"
                    id="old_elevator_availability"
                    name="old_elevator_availability"
                    value={editedDetails.old_elevator_availability || ''}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="col-lg-3">
                <div className="form-group">
                  <label htmlFor="packing_service">Packing Required</label>
                  <input
                    type="text"
                    className="form-control"
                    id="packing_service"
                    name="packing_service"
                    value={editedDetails.packing_service || ''}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="col-lg-3">
                <div className="form-group">
                  <label htmlFor="old_parking_distance">Distance from truck to door</label>
                  <input
                    type="text"
                    className="form-control"
                    id="old_parking_distance"
                    name="old_parking_distance"
                    value={editedDetails.old_parking_distance || ''}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="col-lg-3">
                <div className="form-group">
                  <label htmlFor="old_house_additional_info">Additional Information</label>
                  <input
                    type="text"
                    className="form-control"
                    id="old_house_additional_info"
                    name="old_house_additional_info"
                    value={editedDetails.old_house_additional_info || ''}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>
            <hr />
            <div className="row">
              <div className="col-lg-12">
                <h4 className="head_detail">New House Details</h4>
              </div>
              <div className="col-lg-3">
                <div className="form-group">
                  <label htmlFor="new_floor_no">Floor No.</label>
                  <input
                    type="text"
                    className="form-control"
                    id="new_floor_no"
                    name="new_floor_no"
                    value={editedDetails.new_floor_no || ''}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="col-lg-3">
                <div className="form-group">
                  <label htmlFor="new_elevator_availability">Elevator Available</label>
                  <input
                    type="text"
                    className="form-control"
                    id="new_elevator_availability"
                    name="new_elevator_availability"
                    value={editedDetails.new_elevator_availability || ''}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="col-lg-3">
                <div className="form-group">
                  <label htmlFor="new_packing_service">Packing Required</label>
                  <input
                    type="text"
                    className="form-control"
                    id="new_packing_service"
                    name="new_packing_service"
                    value={editedDetails.new_packing_service || ''}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="col-lg-3">
                <div className="form-group">
                  <label htmlFor="new_parking_distance">Distance from truck to door</label>
                  <input
                    type="text"
                    className="form-control"
                    id="new_parking_distance"
                    name="new_parking_distance"
                    value={editedDetails.new_parking_distance || ''}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="col-lg-3">
                <div className="form-group">
                  <label htmlFor="new_house_additional_info">Additional Information</label>
                  <input
                    type="text"
                    className="form-control"
                    id="new_house_additional_info"
                    name="new_house_additional_info"
                    value={editedDetails.new_house_additional_info || ''}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>
            <button type="button" className="btn btn-primary" onClick={handleSaveClick}>
              Save
            </button>
          </form>
           ) : (
            <>
          <div className="row">
            <div className="col-lg-12">
              <h4 className="head_detail">Existing House Details</h4>
            </div>
            <div className="col-lg-3">
              <h6 className="head_count">Floor No.</h6>
              <p className="head_count_value">{moveDetails?.old_floor_no}</p>
            </div>
            <div className="col-lg-3">
              <h6 className="head_count">Elevator Available</h6>
              <p className="head_count_value">{moveDetails?.old_elevator_availability}</p>
            </div>
            <div className="col-lg-3">
              <h6 className="head_count">Packing Required</h6>
              <p className="head_count_value">{moveDetails?.packing_service}</p>
            </div>
            <div className="col-lg-3">
              <h6 className="head_count">Distance from truck to door</h6>
              <p className="head_count_value">{moveDetails?.old_parking_distance}</p>
            </div>
            <div className="col-lg-3">
              <h6 className="head_count">Additional Information</h6>
              <p className="head_count_value">{moveDetails?.old_house_additional_info || 'No additional info'}</p>
            </div>
          </div>
          <hr />
          <div className="row">
            <div className="col-lg-12">
              <h4 className="head_detail">New House Details</h4>
            </div>
            <div className="col-lg-3">
              <h6 className="head_count">Floor No.</h6>
              <p className="head_count_value">{moveDetails?.new_floor_no}</p>
            </div>
            <div className="col-lg-3">
              <h6 className="head_count">Elevator Available</h6>
              <p className="head_count_value">{moveDetails?.new_elevator_availability}</p>
            </div>
            <div className="col-lg-3">
              <h6 className="head_count">Packing Required</h6>
              <p className="head_count_value">{moveDetails?.packing_service}</p>
            </div>
            <div className="col-lg-3">
              <h6 className="head_count">Distance from truck to door</h6>
              <p className="head_count_value">{moveDetails?.new_parking_distance}</p>
            </div>
            <div className="col-lg-3">
              <h6 className="head_count">Additional Information</h6>
              <p className="head_count_value">{moveDetails?.new_house_additional_info || 'No additional info'}</p>
            </div>
          </div>
          </>
          )}
        </div>
      </div>
    </div>
    
  );
 
}

export default MoveDetails;



