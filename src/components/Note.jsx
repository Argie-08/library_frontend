import FloatingLabel from "react-bootstrap/FloatingLabel";
import { EditOutlined } from "@ant-design/icons";
import { useState, useRef } from "react";
import { Spin } from "antd";
import { Toast } from "primereact/toast";
import useApi from "../utils/http";
import Form from "react-bootstrap/Form";
import "./Note.css";

const Note = () => {
  const [subject, setSubject] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [validated, setValidated] = useState(false);
  const [spinner, setSpinner] = useState(false);

  const api = useApi();
  const toast = useRef(null);

  const handleSave = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      setValidated(true);
      e.stopPropagation();
      return;
    }
    setValidated(false);
    setSpinner(true);

    const file = {
      subject: subject,
      title: title,
      content: content,
    };

    const { data } = await api.post("/uploadFile", file);
    setSpinner(false);
    toast.current.show({
      severity: "info",
      summary: "Info",
      detail: data.message,
    });
    setSubject("");
    setTitle("");
    setContent("");
  };

  return (
    <div className="w-100 p-5">
      <Toast ref={toast} />
      <Form
        noValidate
        validated={validated}
        onSubmit={handleSave}
        className="p-4 d-flex flex-column gap-4 border border-dark-subtle"
        style={{ height: "90vh", borderRadius: "10px" }}
      >
        <h2 className="">
          Recording{" "}
          <span>
            <EditOutlined />
          </span>
        </h2>
        <Form.Group controlId="formSubject">
          <Form.Select
            aria-label="Default select"
            className="py-3"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
          >
            <option value="" hidden>
              Framework/ Subject
            </option>
            <option value="React">React</option>
            <option value="Laravel">Laravel</option>
            <option value="Codeigniter">Codeigniter</option>
            <option value="Other">Other</option>
          </Form.Select>
          <Form.Control.Feedback type="invalid">
            Please select a framework or subject!
          </Form.Control.Feedback>
        </Form.Group>
        <FloatingLabel controlId="floatingInput" label="Title">
          <Form.Control
            required
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Form.Control.Feedback type="invalid">
            Title is required!
          </Form.Control.Feedback>
        </FloatingLabel>
        <FloatingLabel
          controlId="floatingTextarea2"
          label="Content"
          style={{ flexGrow: "1", display: "flex", flexDirection: "column" }}
        >
          <Form.Control
            required
            as="textarea"
            placeholder="Content"
            style={{ flex: "1", resize: "none" }}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <Form.Control.Feedback type="invalid">
            Content is required!
          </Form.Control.Feedback>
        </FloatingLabel>
        <button
          className="btn btn-success fw-bold fs-6 position-relative"
          style={{ height: "45px" }}
          type="submit"
        >
          Save
          <span
            className="position-absolute "
            style={{ top: "50%", right: "45%", transform: "translateY(-50%)" }}
          >
            <Spin spinning={spinner} />
          </span>
        </button>
      </Form>
    </div>
  );
};

export default Note;
