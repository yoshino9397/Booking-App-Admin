import "./singleroom.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Chart from "../../components/chart/Chart";
import Tables from "../../components/table/Table";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { publicRequest } from "../../config";

const SingleRoom = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const [info, setInfo] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [showEdit, setShowEdit] = useState(false);
  const title = useRef();
  const price = useRef();
  const people = useRef();
  const desc = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await publicRequest.get("/rooms/" + id);
        setInfo(res.data);
        setRooms(res.data.roomNumbers.length);
      } catch {}
    };
    getProduct();
  }, [id]);

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    const editRoom = {
      title: title.current.value,
      maxPeople: people.current.value,
      price: price.current.value,
      desc: desc.current.value,
    };
    try {
      await publicRequest.put(`/rooms/${id}`, editRoom);
      navigate(`/rooms`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="singleRoom">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <div className="top">
          <div className="left">
            <div
              className="editButton"
              onClick={() => {
                setShowEdit(true);
              }}
            >
              Edit
            </div>
            <h1 className="title">Information</h1>
            <div className="item">
              <div className="details">
                <h1 className="itemTitle">{info.title}</h1>
                <div className="detailItem">
                  <span className="itemKey">Price:</span>
                  <span className="itemValue">{info.price}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Capacity:</span>
                  <span className="itemValue">〜 {info.maxPeople}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Desc:</span>
                  <span className="itemValue">{info.desc}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Rooms:</span>
                  <span className="itemValue">{rooms}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="right">
            <Chart aspect={3 / 1} title="User Spending ( Last 6 Months)" />
          </div>
        </div>
        <div className="bottom">
          <h1 className="title">Status of Registration Applications</h1>
          <Tables />
        </div>
      </div>
      {showEdit && (
        <div className="editPageRoom">
          <div className="editContainerRoom">
            <button
              className="cancelButton"
              onClick={() => {
                setShowEdit(false);
              }}
            >
              X
            </button>
            <div className="editItem">
              <span>Title</span>
              <input
                type="text"
                required
                ref={title}
                onChange={handleChange}
                placeholder={info.title}
              />
            </div>
            <div className="editItem">
              <span>Price</span>
              <input
                type="text"
                required
                ref={price}
                onChange={handleChange}
                placeholder={info.price}
              />
            </div>
            <div className="editItem">
              <span>MaxPeople</span>
              <input
                type="number"
                required
                ref={people}
                onChange={handleChange}
                placeholder={info.maxPeople}
              />
            </div>
            <div className="editItem">
              <span>Desc</span>
              <input
                type="text"
                required
                ref={desc}
                onChange={handleChange}
                placeholder={info.desc}
              />
            </div>
            <button onClick={handleEdit} className="save">
              Save
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SingleRoom;
