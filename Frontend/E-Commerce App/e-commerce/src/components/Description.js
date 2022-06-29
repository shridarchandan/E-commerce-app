import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import AddItem from "./AddItem";
import Modal from "./Modal";

function Description() {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [flag, setFlag] = useState(false);
  const [delCheck, setDelCheck] = useState(false);
  const history = useHistory();
  const { id } = useParams();
  const url = `/api/T_shirts/${id}`;
  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const result = await fetch(url, {
          method: "GET",
        });
        const res = await result.json();
        setLoading(true);
        setData(res);
      } catch (e) {
        console.log(e.message);
      }
    };
    fetchDetails();
  }, [id]);

  const handleDelete = () => {
    setDelCheck(true);
  };

  const handleEdit = () => {
    setFlag(true);
  };

  return (
    <>
      {loading ? (
        <>
          {" "}
          {delCheck && (
            <div
              className="my-5"
              style={{
                display: "flex",
                justifyContent: "center",
                position: "relative",
                width: "100%",
              }}
            >
              {" "}
              <Modal
                title="Are you sure you want to delete this item?"
                url={url}
                btntitle="Delete"
              />
            </div>
          )}
          {flag ? (
            <AddItem editData={data} />
          ) : (
            <>
              {" "}
              <div className="row my-5  justify-content-evenly">
                <div
                  className="col-8 d-flex justify-content-center align-items-center border border-primary mx-5"
                  style={{ width: "50%" }}
                >
                  <img src={data.image} alt="" />
                </div>
                <div className="col-4 mx-5">
                  <div className="mb-3 d-flex justify-content-end">
                    {/* <img
                  src="/images/trash.svg"
                  alt=""
                  style={{ height: "30px", margin: "0 50px" }}
                  onClick={handleDelete}
                /> */}
                    <Modal
                      title="Are you sure you want to delete this item?"
                      url={url}
                      btntitle="Delete"
                    />

                    <img
                      src="/images/edit.svg"
                      alt=""
                      className="my-3"
                      style={{ height: "30px", margin: "0 10px" }}
                      onClick={handleEdit}
                    />
                  </div>
                  <div className="mb-3 row ">
                    <label
                      htmlFor="staticEmail"
                      className="col-sm-2 col-form-label"
                    >
                      Size:
                    </label>
                    <div className="col-sm-10">
                      <label
                        htmlFor="staticEmail"
                        className="col-sm-2 col-form-label mx-3"
                      >
                        {data.size}
                      </label>
                    </div>
                  </div>
                  <div className="mb-3 row">
                    <label
                      htmlFor="staticEmail"
                      className="col-sm-2 col-form-label"
                    >
                      Price:
                    </label>
                    <div className="col-sm-10">
                      <label
                        htmlFor="staticEmail"
                        className="col-sm-2 col-form-label mx-3"
                      >
                        {data.price}
                      </label>
                    </div>
                  </div>
                  <div className="mb-3 row">
                    <label
                      htmlFor="staticEmail"
                      className="col-sm-2 col-form-label"
                    >
                      Color:
                    </label>
                    <div className="col-sm-10">
                      <label
                        htmlFor="staticEmail"
                        className="col-sm-2 col-form-label mx-3"
                      >
                        {data.color}
                      </label>
                    </div>
                  </div>
                  <div className="mb-3 row">
                    <label
                      htmlFor="staticEmail"
                      className="col-sm-2 col-form-label"
                    >
                      Made:
                    </label>
                    <div className="col-sm-10">
                      <label
                        htmlFor="staticEmail"
                        className="col-sm-2 col-form-label mx-3"
                      >
                        {data.made}
                      </label>
                    </div>
                  </div>
                  <div className="mb-3 row">
                    <label
                      htmlFor="staticEmail"
                      className="col-sm-2 col-form-label"
                    >
                      Style:
                    </label>
                    <div className="col-sm-10">
                      <label
                        htmlFor="staticEmail"
                        className="col-sm-2 col-form-label mx-3"
                      >
                        {data.style}
                      </label>
                    </div>
                  </div>
                  <div className="mb-3 row">
                    <label
                      htmlFor="staticEmail"
                      className="col-sm-2 col-form-label"
                    >
                      Gender:
                    </label>
                    <div className="col-sm-10">
                      <label
                        htmlFor="staticEmail"
                        className="col-sm-2 col-form-label mx-3"
                      >
                        {data.gender}
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="card d-block m-auto my-5"
                style={{ width: "80%" }}
              >
                <div className="card-header">
                  <h5>Description</h5>
                </div>
                <p className="card-text mx-3 my-3">{data.description}</p>
              </div>
            </>
          )}
        </>
      ) : (
        <h4 className="mx-3 my-3">Loading...</h4>
      )}
    </>
  );
}

export default Description;
