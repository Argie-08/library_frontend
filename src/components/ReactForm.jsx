import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {
  FolderOutlined,
  FileTextOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { useContext } from "react";
import { AppContext } from "../AppContext";
import Dialoged from "./Dialoged";

const ReactForm = () => {
  const { reactFiles, setVisible, setTitle, setContent, setSubject, loading } =
    useContext(AppContext);

  const handleContent = (file) => {
    setVisible(true);
    setTitle(file.title);
    setContent(file.content);
    setSubject(file.subject);
  };

  return (
    <div className="w-100 p-5">
      <Form
        className="border border-dark-subtle p-4"
        style={{ height: "100%", borderRadius: "10px" }}
      >
        <Row className="">
          <Col sm={12} className="d-flex justify-content-start">
            <h2 className="">
              React Documents
              <span className="ps-2">
                <FolderOutlined />
              </span>
            </h2>
          </Col>
        </Row>
        <div className="ps-5 mt-4" style={{ height: "95%" }}>
          {loading && <p>Loading...</p>}
          {reactFiles.map((file, i) => (
            <div
              style={{ cursor: "pointer" }}
              className="dataItem"
              key={i}
              onClick={() => handleContent(file)}
            >
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
      <Dialoged />
    </div>
  );
};

export default ReactForm;
