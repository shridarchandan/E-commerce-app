import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import AddItem from "./AddItem";
import Modal from "./Modal";
function Home() {
  const url = "api/T_shirts";

  const [check, setCheck] = useState(false);
  const [flag, setFlag] = useState(false);
  const [data, setData] = useState([]);

  const [editData, setEditData] = useState({});
  const [loading, setLoading] = useState(false);
  const history = useHistory();

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
  }, []);

  const handleEdit = (i) => {
    const fetchEditDetails = async () => {
      try {
        const result = await fetch(`api/T_shirts/${i}`, {
          method: "GET",
        });
        const res = await result.json();
        setEditData(res);
      } catch (e) {
        console.log(e.message);
      }
    };
    fetchEditDetails();
    setFlag(true);
  };

  return (
    <>
      {loading ? (
        <>
          {" "}
          {flag && Object.keys(editData).length > 0 ? (
            <AddItem editData={editData} />
          ) : (
            <div className="container ">
              <h2 className="my-3 ">TShirts for Sale</h2>
              {data.map((ele, id) => {
                return (
                  <div
                    className="d-inline-flex justify-content-around"
                    key={ele.id}
                  >
                    <div className="card mx-3 my-5" style={{ width: "18rem" }}>
                      <div
                        onMouseEnter={() => setCheck(true)}
                        onMouseLeave={() => setCheck(false)}
                      >
                        {" "}
                        <img
                          src={ele?.image}
                          className="card-img-top"
                          alt="..."
                        />
                        {check && (
                          <div>
                            {" "}
                            {/* <img
                              src="/images/trash.svg"
                              alt=""
                              style={{
                                height: "22px",
                                margin: "0 10px",
                                position: "relative",
                                bottom: "18rem",
                                left: "13rem",
                                cursor: "pointer",
                              }}
                            /> */}
                            <Modal
                              title="Are you sure you want to delete this item?"
                              url={`api/T_shirts/${ele.id}`}
                              btntitle="Delete"
                              fromHome="fromHome"
                            />
                            <img
                              style={{
                                height: "22px",
                                margin: "0 10px",
                                position: "relative",
                                bottom: "18rem",
                                left: "15rem",
                                cursor: "pointer",
                              }}
                              src="/images/edit.svg"
                              alt=""
                              onClick={() => handleEdit(ele.id)}
                            />
                          </div>
                        )}
                      </div>

                      <div className="card-body ">
                        <div className="container d-flex justify-content-evenly my-2">
                          <h4 className="border border-primary p-2">
                            {ele.size}
                          </h4>
                          <h4 className="border border-primary p-2">
                            {ele.price}
                          </h4>
                          <h4 className="border border-primary p-2">
                            {ele.gender === "Male" ? "M" : "F"}
                          </h4>
                        </div>
                        <Link
                          to={`/details/${ele.id}`}
                          style={{ textDecoration: "none" }}
                        >
                          <button className="container btn btn-primary">
                            Go to Description
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
              <div className="d-inline-flex mx-5">
                <img
                  onClick={() => history.push("/AddItem")}
                  src="/images/plus-circle.svg"
                  style={{
                    width: "80px",
                    height: "200px",
                    marginLeft: "50px",
                    cursor: "pointer",
                  }}
                />
              </div>
            </div>
          )}{" "}
        </>
      ) : (
        <h4 className="mx-3 my-3">Loading...</h4>
      )}
    </>
  );
}

export default Home;
