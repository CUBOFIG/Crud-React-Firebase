import { db } from "../../firebase";
import { toast } from "react-toastify";
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

const LinkForm = ({ addTask, currentid }) => {
  const initialValues = {
    url: "",
    name: "",
    description: "",
  };
  const [data, setData] = useState(initialValues);

  const handleSumit = (e) => {
    e.preventDefault();
    if (!validURL(data.url)) {
      return toast("Invalid URL", {
        type: "warning",
        autoClose: 2000,
      });
    }
    if (data.name === "") {
      return toast("The name is necessary", {
        type: "warning",
        autoClose: 2000,
      });
    }
    addTask(data);
    setData({ ...initialValues });
  };

  const handlenOnChanges = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const validURL = (str) => {
    var pattern = new RegExp(
      "^(https?:\\/\\/)?" +
        "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" +
        "((\\d{1,3}\\.){3}\\d{1,3}))" +
        "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" +
        "(\\?[;&a-z\\d%_.~+=-]*)?" +
        "(\\#[-a-z\\d_]*)?$",
      "i"
    );
    return !!pattern.test(str);
  };

  const getLinkById = async (id) => {
    const doc = await db.collection("links").doc(id).get();
    setData({ ...doc.data() });
  };

  useEffect(() => {
    if (currentid === "") {
      setData({ ...initialValues });
    } else {
      getLinkById(currentid);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentid]);

  return (
    <form className="card card-body" onSubmit={handleSumit}>
      <div className="form-group input-group">
        <div className="input-group-text bg-light">
          <i className="material-icons">insert_link</i>
        </div>
        <input
          onChange={handlenOnChanges}
          type="text"
          className="form-control"
          name="url"
          value={data.url}
          placeholder="https://example.com"
        />
      </div>
      <div className="form-group input-group">
        <div className="input-group-text bg-light">
          <i className="material-icons ">create</i>
        </div>
        <input
          onChange={handlenOnChanges}
          type="text"
          className="form-control"
          name="name"
          value={data.name}
          placeholder="Website name."
        />
      </div>
      <div className="form-group">
        <textarea
          onChange={handlenOnChanges}
          name="description"
          row="3"
          className="form-control"
          value={data.description}
          placeholder="Write a description."
        ></textarea>
      </div>
      <button className="btn btn-primary btn-block">
        {currentid === "" ? "Save" : "Update"}
      </button>
    </form>
  );
};

LinkForm.propTypes = {
  addTask: PropTypes.func.isRequired,
  errors: PropTypes.string.isRequired,
};

export default LinkForm;
