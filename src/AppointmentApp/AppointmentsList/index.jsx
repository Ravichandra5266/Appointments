import "./index.css";

const AppointmentsList = (props) => {
    const { each, toggleStarBtn } = props;
    const { id, title, date, isStar } = each;

    const onclickStar = () => {
        toggleStarBtn(id);
    };
    return (
        <li className="apmt">
            <div>
                <h1 className="apmt-title"> {title}</h1>
                <p className="apmt-date">{date}</p>
            </div>
            <button onClick={onclickStar}>
                {isStar ? (
                    <img
                        src="https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png"
                        alt="star"
                    />
                ) : (
                    <img
                        src="https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png"
                        alt="star"
                    />
                )}
            </button>
        </li>
    );
};

export default AppointmentsList;
