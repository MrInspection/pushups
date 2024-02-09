/* eslint-disable react/prop-types */
import { useState } from "react";
import Modal from "react-modal";
import moment from "moment";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

Modal.setAppElement("#root");

function isInCurrentWeek(date) {
  const startOfWeek = moment().startOf("week");
  const endOfWeek = moment().endOf("week");

  return moment(date, "M-D-YYYY").isBetween(startOfWeek, endOfWeek);
}

function Stats({ history }) {
  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {}

  function closeModal() {
    setIsOpen(false);
  }

  const totalPushups = history.reduce((total, curr) => {
    return total + curr.count;
  }, 0);

  const weekPushups = history
    .filter((curr) => isInCurrentWeek(curr.date))
    .reduce((total, curr) => total + curr.count, 0);

  return (
    <div>
      <button onClick={openModal}>Stats</button>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <button onClick={closeModal}>close</button>
        <div>Total number of Pushups: {totalPushups}</div>
        <div>Week pushups: {weekPushups}</div>
      </Modal>
    </div>
  );
}

export default Stats;
