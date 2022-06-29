import React from "react";
import { useHistory } from "react-router-dom";

function Modal(props) {
  const history = useHistory();

  const handleEdit = (e) => {
    e.preventDefault();
    const EditDetails = async () => {
      try {
        await fetch(props.url, {
          headers: {
            "Content-Type": "application/json",
          },
          method: "PUT",
          body: JSON.stringify(props?.data),
        });
        window.alert("Changes saved successfully");
        history.push("/");
      } catch (e) {
        console.log(e.message);
      }
    };
    EditDetails();
  };

  const handleDelete = async () => {
    console.log("del");
    console.log("asfal");
    console.log("dasf");
    try {
      await fetch(props.url, {
        method: "DELETE",
      });

      window.alert("Item deleted successfully");
      history.push("/");
    } catch (e) {
      console.log(e.message);
    }
  };

  const test = () => {
    console.log("del");
    console.log("asfal");
    console.log("dasf");
  };
  return (
    <div>
      {props.btntitle === "Delete" ? (
        <img
          className="my-3"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
          src="/images/trash.svg"
          alt=""
          style={
            props.fromHome
              ? {
                  height: "22px",
                  margin: "0 10px",
                  position: "relative",
                  bottom: "18rem",
                  left: "15rem",
                  cursor: "pointer",
                }
              : { height: "30px", margin: "0 50px" }
          }
        />
      ) : (
        <button
          type="button"
          className="btn btn-success mx-3 my-3"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
        >
          {props.btntitle}
        </button>
      )}

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                {props.title}
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                data-bs-dismiss="modal"
                onClick={
                  props.btntitle === "Save Changes" ? handleEdit : handleDelete
                }
              >
                {props.btntitle}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
