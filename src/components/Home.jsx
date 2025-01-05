import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useContext } from "react";
import { AppContext } from "../AppContext";
import {
  FolderOutlined,
  FileTextOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { InputText } from "primereact/inputtext";
import "./Home.css";

const Home = () => {
  const { results } = useContext(AppContext);
  const { setQuery } = useContext(AppContext);
  const { query } = useContext(AppContext);
  const { loading } = useContext(AppContext);

  return (
    <div className="w-100 p-5">
      <Form
        className="border border-dark-subtle p-4"
        style={{ height: "100%", borderRadius: "10px" }}
      >
        <Row className="">
          <Col sm={12} md={6} className="d-flex justify-content-start">
            <h2 className="">
              Documents
              <span className="ps-2">
                <FolderOutlined />
              </span>
            </h2>
          </Col>
          <Col sm={12} md={6} className="d-flex align-items-center">
            <div
              className="position-relative w-100"
              style={{ display: "inline-block" }}
            >
              <InputText
                className="homeSearch"
                placeholder="Search here . . ."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <SearchOutlined />
            </div>
          </Col>
        </Row>
        <div className="ps-5 mt-4" style={{ height: "95%" }}>
          {loading && <p>Loading...</p>}
          {results.map((file, i) => (
            <div style={{ cursor: "pointer" }} className="dataItem" key={i}>
              <p>
                <span className="pe-2">
                  <FileTextOutlined style={{ fontSize: "20px" }} />
                </span>
                {file.title}
              </p>
            </div>
          ))}
        </div>
      </Form>
    </div>
  );
};

export default Home;
