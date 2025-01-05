import React from "react";
import { useState, useRef, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { Dialog } from "primereact/dialog";
import useApi from "../src/utils/http";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Note from "./components/Note";
import ReactForm from "./components/ReactForm";
import { AppContext } from "./AppContext";
import "./App.css";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { use } from "react";

const App = () => {
  const [visible, setVisible] = useState(false);
  const [subject, setSubject] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [storeFile, setStoreFile] = useState("");
  const [reactFiles, setReactFiles] = useState([]);

  const api = useApi();

  useEffect(() => {
    fetchData();
  }, [query]);

  useEffect(() => {
    fetchReact();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const endpoint =
        query.trim() === "" ? "/getFiles" : `/getFile?key=${query}`;
      const response = await api.get(endpoint);
      setResults(response.data);
    } catch (error) {
      console.error("Error fetching search results", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchReact = async () => {
    setLoading(true);
    try {
      const response = await api.get("/getFilesReact");
      setReactFiles(response.data);
    } catch (error) {
      console.error("Error fetching search results", error);
    } finally {
      setLoading(false);
    }
  };

  const handleContent = (content) => {
    setVisible(true);
    setStoreFile(content);
  };

  return (
    <div className="d-flex ">
      <AppContext.Provider
        value={{
          results,
          setQuery,
          query,
          loading,
          fetchData,
          fetchReact,
          reactFiles,
        }}
      >
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/note" element={<Note />} />
          <Route path="/react" element={<ReactForm />} />
        </Routes>
      </AppContext.Provider>
    </div>

    // <div className="Container">
    //   <form onSubmit={handleSave}>
    //     <div>
    //       <label htmlFor="subject">Subject:</label>
    //       <input
    //         value={subject}
    //         type="text"
    //         id="subject"
    //         placeholder="Subject"
    //         onChange={(e) => setSubject(e.target.value)}
    //       />
    //     </div>
    //     <div>
    //       <label htmlFor="title">Title:</label>
    //       <input
    //         value={title}
    //         type="text"
    //         id="title"
    //         placeholder="Title"
    //         onChange={(e) => setTitle(e.target.value)}
    //       />
    //     </div>
    //     <div>
    //       <label htmlFor="content">Content:</label>
    //       <textarea
    //         value={content}
    //         type="text"
    //         id="content"
    //         placeholder="Content"
    //         onChange={(e) => setContent(e.target.value)}
    //       />
    //     </div>
    //     <button>Save</button>
    //   </form>
    //   <div
    //     className="typeContainer"
    //     style={{ width: "60%", marginTop: "2rem" }}
    //   >
    //     <input
    //       type="text"
    //       placeholder="Search here ..."
    //       style={{ width: "100%", marginBottom: "1rem" }}
    //       value={query}
    //       onChange={(e) => setQuery(e.target.value)}
    //     />
    //     {loading && <p>Loading...</p>}
    //     {results.map((result, index) => (
    //       <p onClick={() => handleContent(result.content)} key={index}>
    //         {result.subject} - {result.title}
    //       </p>
    //     ))}
    //   </div>
    //   <Dialog
    //     header="Header"
    //     visible={visible}
    //     style={{ width: "50vw" }}
    //     onHide={() => {
    //       if (!visible) return;
    //       setVisible(false);
    //     }}
    //   >
    //     <p className="m-0">{storeFile}</p>
    //   </Dialog>
    //   <Toast ref={toast} />
    // </div>
  );
};

export default App;
