import React from "react";
import { useState, useRef, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { Dialog } from "primereact/dialog";
import useApi from "../src/utils/http";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Note from "./components/Note";
import ReactForm from "./components/ReactForm";
import Codeig from "./components/Codeig";
import Laravel from "./components/Laravel";
import Other from "./components/Other";
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
  const [reactFiles, setReactFiles] = useState([]);
  const [codeFiles, setCodeFiles] = useState([]);
  const [laravelFiles, setLaravelFiles] = useState([]);
  const [otherFiles, setOtherFiles] = useState([]);

  const api = useApi();

  useEffect(() => {
    fetchData();
  }, [query]);

  // useEffect(() => {
  //   fetchReact();
  //   fetchCodeigniter();
  //   fetchLaravel();
  //   fetchOther();
  // }, []);

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
  const fetchCodeigniter = async () => {
    setLoading(true);
    try {
      const response = await api.get("/getFilesCodeigniter");
      setCodeFiles(response.data);
    } catch (error) {
      console.error("Error fetching search results", error);
    } finally {
      setLoading(false);
    }
  };
  const fetchLaravel = async () => {
    setLoading(true);
    try {
      const response = await api.get("/getFilesLaravel");
      setLaravelFiles(response.data);
    } catch (error) {
      console.error("Error fetching search results", error);
    } finally {
      setLoading(false);
    }
  };
  const fetchOther = async () => {
    setLoading(true);
    try {
      const response = await api.get("/getFilesOther");
      setOtherFiles(response.data);
    } catch (error) {
      console.error("Error fetching search results", error);
    } finally {
      setLoading(false);
    }
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
          codeFiles,
          laravelFiles,
          otherFiles,
          fetchCodeigniter,
          fetchLaravel,
          fetchOther,
          setVisible,
          visible,
          subject,
          setSubject,
          title,
          setTitle,
          content,
          setContent,
        }}
      >
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/note" element={<Note />} />
          <Route path="/react" element={<ReactForm />} />
          <Route path="/codeigniter" element={<Codeig />} />
          <Route path="/laravel" element={<Laravel />} />
          <Route path="/other" element={<Other />} />
        </Routes>
      </AppContext.Provider>
    </div>
  );
};

export default App;
