import "./index.css";

const AppointmentsList = (props) => {
  const { each, toggleStarBtn } = props;
  const { id, title, date, isStar } = each;

  const onclickStar = () => {
    toggleStarBtn(id);
  };

  const img = isStar
    ? "https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png"
    : "https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png";
  return (
    <li className="apmt">
      <div>
        <h1 className="apmt-title"> {title}</h1>
        <p className="apmt-date">{date}</p>
      </div>
      <button className="toggle-star-btn " onClick={onclickStar}>
        <img src={img} alt="star" />
      </button>
    </li>
  );
};

export default AppointmentsList;
