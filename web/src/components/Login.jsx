/* eslint-disable react/no-unknown-property */
/* eslint-disable react/prop-types */
import { useState } from "react";
import Modal from "react-modal";
const DISCORD_AUTH_URL = import.meta.env.VITE_DISCORD_AUTH_URL;

Modal.setAppElement("#root"); // replace '#root' with the id of your app element

const Login = ({ logged }) => {
  const [modalIsOpen, setModalIsOpen] = useState(logged);

  return (
    <div>
      <Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(true)}>
        <h2>Login</h2>
        <div className="flex items-center justify-center h-screen bg-discord-gray text-white">
          <a
            id="login"
            href={DISCORD_AUTH_URL}
            className="bg-discord-blue  text-xl px-5 py-3 rounded-md font-bold flex items-center space-x-4 hover:bg-gray-600 transition duration-75"
          >
            <i className="text-2xl">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="100"
                height="100"
                viewBox="0 0 64 64"
              >
                <radialGradient
                  id="oeOszrvEHdIbQAmgLsBNha_iSpYyK95XXZn_gr1"
                  cx="32"
                  cy="808.39"
                  r="30.301"
                  gradientTransform="translate(0 -775.89)"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop offset="0" stop-color="#f4e9c3"></stop>
                  <stop offset=".219" stop-color="#f8eecd"></stop>
                  <stop offset=".644" stop-color="#fdf4dc"></stop>
                  <stop offset="1" stop-color="#fff6e1"></stop>
                </radialGradient>
                <path
                  fill="url(#oeOszrvEHdIbQAmgLsBNha_iSpYyK95XXZn_gr1)"
                  d="M63.99,36.31C64.1,38.33,62.5,40,60.5,40h-9.48C51.009,40,51,40.009,51,40.02v5.96	c0,0.011,0.009,0.02,0.02,0.02h9.48c1.58,0,2.81,1.46,2.43,3.11C62.66,50.25,61.54,51,60.37,51H59.5c-0.825,0-1.5,0.675-1.5,1.5l0,0	c0,0.825,0.675,1.5,1.5,1.5l0,0c2,0,3.6,1.67,3.49,3.69C62.9,59.58,61.2,61,59.3,61H4c-2.48,0-4.43-2.26-3.92-4.82	C0.47,54.29,2.25,53,4.18,53H5c2.92,0,5.26-2.51,4.98-5.49C9.73,44.91,7.4,43,4.78,43H4c-2.48,0-4.43-2.26-3.92-4.82	C0.47,36.29,2.07,35,4,35l0,0c1.301,0,2.332-1.252,1.899-2.634C5.633,31.52,4.776,31,3.89,31H3.5c-2,0-3.6-1.67-3.49-3.69	C0.1,25.42,1.8,24,3.7,24h7.28c0.011,0,0.02-0.009,0.02-0.02v-4.96c0-0.011-0.009-0.02-0.02-0.02H3.5	c-1.577,0-2.805-1.445-2.432-3.091C1.329,14.757,2.448,14,3.63,14H4.5C5.33,14,6,13.33,6,12.5S5.33,11,4.5,11h-1	c-2,0-3.6-1.67-3.49-3.69C0.1,5.42,1.8,4,3.7,4H60c2.34,0,4.21,2.01,3.98,4.39c-0.19,2.05-2,3.56-4.04,3.61H58.5	c-2.485,0-4.5,2.015-4.5,4.5l0,0c0,2.485,0,4.5,0,4.5h6c2.48,0,4.43,2.26,3.92,4.82C63.53,27.71,61.93,29,60,29l0,0	c-1.1,0-2,0.9-2,2l0,0c0,1.1,0.9,2,2,2h0.3C62.2,33,63.9,34.42,63.99,36.31z"
                ></path>
                <path
                  fill="#8c9eff"
                  d="M55,59l-11.189-8.751L45.054,54H15.216C11.783,54,9,51.217,9,47.784V15.216	C9,11.783,11.783,9,15.216,9h33.568C52.217,9,55,11.783,55,15.216V59z"
                ></path>
                <path
                  fill="#fff"
                  d="M43.301,22.65c0,0-3.232-2.499-7.062-2.785l-0.336,0.684c3.456,0.833,5.035,2.039,6.689,3.518	c-2.847-1.455-5.669-2.959-10.592-2.959s-7.745,1.504-10.592,2.959c1.654-1.479,3.543-2.822,6.689-3.518l-0.336-0.684	c-4.016,0.385-7.062,2.785-7.062,2.785s-3.618,5.209-4.239,15.391c3.655,4.177,9.188,4.202,9.188,4.202l1.144-1.529	c-1.952-0.671-4.177-1.877-6.092-4.065c2.288,1.716,5.731,3.108,11.301,3.108s9.014-1.392,11.301-3.108	c-1.915,2.188-4.14,3.394-6.092,4.065l1.144,1.529c0,0,5.532-0.025,9.188-4.202C46.919,27.859,43.301,22.65,43.301,22.65z M27.649,36.027c-1.368,0-2.486-1.392-2.486-3.108c0-1.716,1.119-3.108,2.486-3.108c1.368,0,2.486,1.392,2.486,3.108	C30.135,34.635,29.016,36.027,27.649,36.027z M36.351,36.027c-1.368,0-2.486-1.392-2.486-3.108c0-1.716,1.119-3.108,2.486-3.108	c1.368,0,2.486,1.392,2.486,3.108C38.838,34.635,37.719,36.027,36.351,36.027z"
                ></path>
              </svg>
            </i>
            <span>Login with Discord</span>
          </a>
        </div>
      </Modal>
    </div>
  );
};

export default Login;
