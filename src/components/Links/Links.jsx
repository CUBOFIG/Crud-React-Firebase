import React, { useEffect, useState } from "react";
import LinkForm from "components/LinkForm/LinkForm";
import { toast } from "react-toastify";
import { db } from "../../firebase";

const Links = () => {
  const [links, setLinks] = useState([]);
  const [currentid, setCurrentid] = useState("");

  const addTask = async (linkObject) => {
    try {
      if (currentid === "") {
        await db.collection("links").doc().set(linkObject);
        toast("New task add", {
          type: "success",
        });
      } else {
        await db.collection("links").doc(currentid).update(linkObject);
        toast("Task Update successfully", {
          type: "info",
        });
        setCurrentid("");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getLinks = () => {
    db.collection("links").onSnapshot((querySnapshot) => {
      const docs = [];
      querySnapshot.forEach((doc) => {
        docs.push({ ...doc.data(), id: doc.id });
      });
      setLinks(docs);
    });
  };

  const deleteTask = async (id) => {
    if (window.confirm("are you sure you want to delete this link")) {
      await db.collection("links").doc(id).delete();
      toast("Task Deleted successfully", {
        type: "error",
        autoClose: 2000,
      });
    }
  };

  useEffect(() => {
    getLinks();
  }, []);

  return (
    <>
      <div className="col-md-6 p-2">
        <LinkForm {...{ addTask, currentid }} />
      </div>
      <div className="col-md-6 p-2">
        {links.map((link) => (
          <div className="card mb-1" key={link.id}>
            <div className="card-body">
              <div className="d-flex justify-content-between">
                <h4>{link.name}</h4>
                <div>
                  <i
                    className="material-icons text-danger icons iconsDelete"
                    onClick={() => deleteTask(link.id)}
                  >
                    close
                  </i>
                  <i
                    className="material-icons text-info icons iconsEdit"
                    onClick={() => setCurrentid(link.id)}
                  >
                    edit
                  </i>
                </div>
              </div>
              <p>{link.description}</p>
              <a href={link.url} target="_blank" rel="noopener noreferrer">
                Go to website
              </a>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Links;
