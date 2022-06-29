import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Modal from "./Modal";

function AddItem(props) {
  const url = "api/T_shirts";
  const urlEdit = `/api/T_shirts/${props.editData?.id}`;
  const history = useHistory();

  const [errSize, setErrSize] = useState("");
  const [errPrice, setErrPrice] = useState("");
  const [errColor, setErrColor] = useState("");
  const [errMade, setErrMade] = useState("");
  const [errStyle, setErrStyle] = useState("");
  const [errgender, setErrgender] = useState("");
  const [errdescription, setErrdescription] = useState("");
  const [required, setRequired] = useState(true);
  const [formdata, setFormdata] = useState(
    props
      ? props.editData
      : {
          size: "",
          price: "",
          color: "",
          made: "",
          style: "",
          gender: "",

          description: "",
        }
  );

  const [img, setImg] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormdata({
      ...formdata,
      image:
        "https://i0.wp.com/sellmerch.org/wp-content/uploads/2019/12/V-neck-t-shirt_122719.png?w=500&ssl=1",
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const imageHandler = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setImg(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  // for (var key of fd.entries()) {
  //   console.log(key[0] + ", " + key[1]);
  // }

  //console.log(JSON.stringify({ ...formdata, image: img }));
  //const obj = { ...formdata, image: img };
  //   const fd = new FormData();
  //   fd.append("size", formdata?.size);
  //   fd.append("price", formdata?.price);
  //   fd.append("color", formdata?.color);
  //   fd.append("made", formdata?.made);
  //   fd.append("style", formdata?.style);
  //   fd.append("gender", formdata?.gender);
  //   fd.append("image", img);
  //   fd.append("description", formdata?.description);

  //console.log(formdata?.size);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formdata?.size) {
      setErrSize("*Size is required");
      setRequired(false);
    }
    if (!formdata?.price) {
      setErrPrice("*Price is required");
      setRequired(false);
    }
    if (!formdata?.color) {
      setErrColor("*Color is required");
      setRequired(false);
    }
    if (!formdata?.made) {
      setErrMade("*Made is required");
      setRequired(false);
    }
    if (!formdata?.style) {
      setErrStyle("*Style is required");
      setRequired(false);
    }
    if (!formdata?.gender) {
      setErrgender("*Gender is required");
      setRequired(false);
    }
    if (!formdata?.description) {
      setErrdescription("*Description is required");
      setRequired(false);
    } else {
      setRequired(true);
      const AddDetails = async () => {
        try {
          await fetch(url, {
            method: "POST",
            // headers: {
            //   "Content-Type":
            //     "multipart/form-data; boundary=------WebKitFormBoundaryThXvPDs31O2ryl9R",
            // },
            headers: {
              "Content-Type": "application/json",
            },

            body: JSON.stringify(formdata),
          });
          window.alert("New T-shirt added successfully");
          history.push("/");
        } catch (e) {
          console.log(e.message);
        }
      };

      {
        required && AddDetails();
      }
    }
  };

  const handleEdit = (e) => {
    e.preventDefault();
    const EditDetails = async () => {
      try {
        await fetch(urlEdit, {
          headers: {
            "Content-Type": "application/json",
          },
          method: "PUT",
          body: JSON.stringify(formdata),
        });
      } catch (e) {
        console.log(e.message);
      }
    };
    EditDetails();
  };

  return (
    <>
      <div className="d-flex justify-content-center my-4">
        <h3>{props.editData ? "Edit T-shirt" : "Add a New T-shirt"}</h3>
      </div>
      <form
        className="d-flex flex-column align-items-center justify-content-center"
        onSubmit={handleSubmit}
      >
        <div className="d-flex my-3">
          <label htmlFor="sizelabel" className="form-label mx-3">
            Size
          </label>
          <select
            id="sizeid"
            className="form-select mx-3"
            value={formdata?.size}
            name="size"
            onChange={handleChange}
            
          >
            <option>Select a size</option>
            <option>XXL</option>
            <option>XL</option>
            <option>L</option>
            <option>M</option>
            <option>S</option>
          </select>
        </div>
        <p style={{ color: "red" }}>{errSize}</p>
        <div className="d-flex my-3">
          <label htmlFor="pricelabel" className="col-sm-2 col-form-label">
            Price
          </label>
          <div className="col-sm-10 mx-3">
            <input
              type="text"
              className="form-control"
              id="priceid"
              name="price"
              value={formdata?.price}
              onChange={handleChange}
           
            />
          </div>
        </div>
        <p style={{ color: "red" }}>{errPrice}</p>
        <div className="d-flex my-3">
          <label htmlFor="colorlabel" className="col-sm-2 col-form-label">
            Color
          </label>
          <div className="col-sm-10 mx-3">
            <input
              type="text"
              className="form-control"
              id="colorid"
              name="color"
              value={formdata?.color}
              onChange={handleChange}
           
            />
          </div>
        </div>
        <p style={{ color: "red" }}>{errColor}</p>
        <div className="d-flex my-3">
          <label htmlFor="madelabel" className="col-sm-2 col-form-label">
            Made
          </label>
          <div className="col-sm-10 mx-3">
            <input
              type="text"
              className="form-control"
              id="madeid"
              name="made"
              value={formdata?.made}
              onChange={handleChange}
              
            />
          </div>
        </div>
        <p style={{ color: "red" }}>{errMade}</p>
        <div className="d-flex my-3">
          <label htmlFor="stylelabel" className="col-sm-2 col-form-label">
            Style
          </label>
          <select
            id="styleid"
            className="form-select mx-3"
            name="style"
            value={formdata?.style}
            onChange={handleChange}
        
          >
            <option>Select a Style</option>
            <option>Round Neck</option>
            <option>V Neck</option>
            <option>Half Sleeve</option>
            <option>Full Sleeve</option>
          </select>
        </div>
        <p style={{ color: "red" }}>{errStyle}</p>
        <div className="d-flex my-3">
          <label htmlFor="stylelabel" className="form-label mx-3">
            Gender
          </label>
          <div className="form-check form-check-inline ">
            <input
              className="form-check-input"
              type="radio"
              name="gender"
              id="inlineRadio1"
              value="Male"
              checked={formdata?.gender === "Male"}
              onChange={handleChange}
             
            />
            <label className="form-check-label" htmlFor="inlineRadio1">
              Male
            </label>
          </div>
          <div className="form-check form-check-inline ">
            <input
              className="form-check-input"
              type="radio"
              name="gender"
              id="inlineRadio2"
              value="Female"
              checked={formdata?.gender === "Female"}
              onChange={handleChange}
              //ref={register}
            />
            <label className="form-check-label " htmlFor="inlineRadio2">
              Female
            </label>
          </div>
        </div>
        <p style={{ color: "red" }}>{errgender}</p>
        <div className="d-flex my-3 ms-5">
          <label htmlFor="formFile" className="col-sm-2 col-form-label">
            Image
          </label>
          <input
            className="form-control mx-3"
            type="file"
            id="formFile"
            accept="image/*"
            onChange={imageHandler}
          />
          <img src={img} alt="" style={{ height: "40px" }} />
        </div>
        <div className="my-3 d-flex">
          <label htmlFor="desclabel" className="form-label mx-3">
            Description
          </label>
          <textarea
            name="description"
            value={formdata?.description}
            onChange={handleChange}
            //ref={register}
            className="form-control"
            id="descid"
            style={{ minWidth: "100%" }}
            rows="3"
          ></textarea>
        </div>
        <p style={{ color: "red" }}>{errdescription}</p>
        <div className="d-flex">
          {/* <button className="btn btn-success mx-3 my-3">Save</button> */}
          {props.editData ? (
            <Modal
              title="Confirm to save changes"
              data={formdata}
              btntitle="Save Changes"
              url={urlEdit}
            />
          ) : (
            <button className="btn btn-success mx-3 my-3">Save</button>
          )}
          <button
            className="btn btn-danger my-3"
            type="reset"
            onClick={() => history.push("/")}
          >
            Cancel
          </button>
        </div>
      </form>
      <div style={{ position: "relative", top: "20px" }}></div>
    </>
  );
}

export default AddItem;
