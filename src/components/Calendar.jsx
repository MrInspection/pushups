/* eslint-disable react/prop-types */
import moment from "moment";
import Calendar from "react-github-contribution-calendar";

var panelColors = ["#EEEEEE", "#F78A23", "#F87D09", "#AC5808", "#7B3F06"];

const AppCalendar = ({ history, today }) => {
  const values = history.reduce((prev, now) => {
    return {
      ...prev,
      [moment(now.date, "MM:DD:YYYY").format("YYYY-MM-DD")]: Math.ceil(
        now.count / 25
      ),
    };
  }, {});
  return (
    <>
      <Calendar values={values} until={today} panelColors={panelColors} />
    </>
  );
};

export default AppCalendar;
