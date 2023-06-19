import "./index.css";

import { useEffect, useState } from "react";

import { format } from "date-fns";

import { v4 as uuidv4 } from "uuid";

import AppointmentsList from "../AppointmentsList";

const Appointments = () => {
  const [title, settitle] = useState("");

  const [date, setdate] = useState("");

  const [appointmentarraylist, setappointmentarraylist] = useState([]);

  const [starbtn, setstarbtn] = useState(false);

  useEffect(() => {
    const storedArray = localStorage.getItem("local");
    if (storedArray !== null) {
      const parsedArray = JSON.parse(storedArray);
      setappointmentarraylist(parsedArray);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("local", JSON.stringify(appointmentarraylist));
  }, [appointmentarraylist]);

  const onclickTitle = (event) => {
    settitle(event.target.value);
  };

  const onclickDate = (event) => {
    setdate(event.target.value);
  };

  const onsubmitForm = async (event) => {
    event.preventDefault();
    if (title === "") {
      alert("Enter Title");
    } else if (date === "") {
      alert("Enter Date");
    } else {
      const formatDate = format(new Date(date), "dd MMMM yyyy, EEEE");
      const upperLetter = title.slice(0, 1).toLocaleUpperCase();
      const localletter = title.slice(1);

      const connnect = upperLetter.concat(localletter);
      const newappointmentsobject = {
        id: uuidv4(),
        title: connnect,
        date: formatDate,
        isStar: false,
      };
      setappointmentarraylist([...appointmentarraylist, newappointmentsobject]);
      settitle("");
      setdate("");
    }
  };

  const toggleStarBtn = (id) => {
    setappointmentarraylist(
      appointmentarraylist.map((each) => {
        if (each.id === id) {
          return { ...each, isStar: !each.isStar };
        }
        return each;
      })
    );
  };

  const onclickstar = () => {
    setstarbtn(!starbtn);
  };

  const filterItems = () => {
    if (starbtn === true) {
      return appointmentarraylist.filter((each) => each.isStar === true);
    }
    return appointmentarraylist;
  };

  const starItems = filterItems();

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
            <label htmlFor="date" className="label">
              Date
            </label>
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
          {starItems.length !== 0 ? (
            starItems.map((each) => {
              return (
                <AppointmentsList
                  each={each}
                  key={each.id}
                  toggleStarBtn={toggleStarBtn}
                />
              );
            })
          ) : (
            <p className="emp">Sorry No Date Found</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Appointments;
