import "./index.css";

import { useState, } from "react";

import { format } from "date-fns";

import { v4 as uuidv4 } from "uuid";

import AppointmentsList from "../AppointmentsList";

const Appointments = () => {
  const [title, settitle] = useState("");

  const [date, setdate] = useState("");

  const [appointmentarraylist, setappointmentarraylist] = useState([]);

  const [starbtn, setstarbtn] = useState(false);



  const onclickTitle = (event) => {
    settitle(event.target.value);
  };

  const onclickDate = (event) => {
    setdate(event.target.value);
  };

  const onsubmitForm = (event) => {
    event.preventDefault();
    if (title === "") {
      alert("Enter Title");
    } else if (date === "") {
      alert("Enter Date");
    } else {
      const formatDate = format(new Date(date), "dd MMMM yyyy, EEEE");

      const newappointmentsobject = {
        id: uuidv4(),
        title,
        date: formatDate,
        isStar: false,
      };
      setappointmentarraylist((prev) => [...prev, newappointmentsobject])
      settitle('')
      setdate('')
      
    }
  };

  const toggleStarBtn = (id) => {
    setappointmentarraylist(
      appointmentarraylist.filter((each) => {
        if (each.id === id) {
          return (each.isStar = true);
        }
        return each;
      })
    );
  };

  const onclickstar = () => {
    setstarbtn(!starbtn);
  };

  const filterItems = () => {
    if(starbtn === true){
      return appointmentarraylist.filter(each => each.isStar === true)
    }
    return appointmentarraylist
   
  }

  const starItems = filterItems()

  
  return (
    <div className="bg-clr-container">
      <div className="bg-wht-container">
        <div className="flex">
          <form onSubmit={onsubmitForm} className="form">
            <h1 className="title">Add Appointments</h1>
            <label htmlFor="title" className="label">
              Title
            </label>
            <input
              id="title"
              type="text"
              placeholder="Title"
              className="inputs"
              value={title}
              onChange={onclickTitle}
            />
            <label htmlFor="date">Date</label>
            <input
              id="date"
              type="date"
              className="inputs"
              value={date}
              onChange={onclickDate}
            />
            <button type="submit" className="sub-btn">
              Add
            </button>
          </form>
          <div>
            <img
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
              alt="banner"
              className="lg-banner"
            />
          </div>
        </div>
        <hr className="hr" />
        <div className="bottom-flex ">
          <h1 className="bottom-title">Appointments</h1>
          {starbtn ? (
            <button className="star-btn " onClick={onclickstar}>
              All
            </button>
          ) : (
            <button className="star-btn " onClick={onclickstar}>
              Starred
            </button>
          )}
        </div>
        <ul className="apmt-list">
          {starItems.length > 0 ?  starItems.map((each) => {
            return (
              <AppointmentsList
                each={each}
                key={each.id}
                toggleStarBtn={toggleStarBtn}
              />
            );
          }) : <h1 className="emp">Sorry No Date Found</h1>}
        </ul>
      </div>
    </div>
  );
};

export default Appointments;
