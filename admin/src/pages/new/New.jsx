import "./new.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";

const New = ({ inputs, title }) => {

  const [file, setFile] = useState("");
  console.log(file)
  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>{title}</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img
              src={
                file
                  ? URL.createObjectURL(file)
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              //src="https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              alt=""
            />
          </div>
          <div className="right">
            <form>
              <div className="formInput">
                <label htmlFor="file">
                  Image: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input type="file" onChange={(e) => setFile(e.target.files[0])} id="file" style={{ display: "none" }} />
              </div>
              {inputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input type={input.type} placeholder={input.placeholder} />
                </div>
              ))}

              {/* <div className="formInput">
                <label>Name and Surname</label>
                <input type="text" placeholder="Rajarm Sahoo" />
              </div>
              <div className="formInput">
                <label>Email</label>
                <input type="email" placeholder="Rajarm@gamil.com" />
              </div>
              <div className="formInput">
                <label>Phone</label>
                <input type="text" placeholder="+91 7008309629" />
              </div>
              <div className="formInput">
                <label>Password</label>
                <input type="Password" placeholder="+91 7008309629" />
              </div>
              <div className="formInput">
                <label>Address</label>
                <input type="text" placeholder="Kosala" />
              </div>
              <div className="formInput">
                <label>Country</label>
                <input type="text" placeholder="INDIA" />
              </div> */}
              <button>Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default New