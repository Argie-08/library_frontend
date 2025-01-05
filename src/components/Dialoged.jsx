import { useContext } from "react";
import { AppContext } from "../AppContext";
import { Dialog } from "primereact/dialog";

const Dialoged = () => {
  const { visible, setVisible, title, subject, content } =
    useContext(AppContext);
  return (
    <Dialog
      header={
        <p>
          {subject}: <span className="fs-5 fw-light ps-3">{title}</span>
        </p>
      }
      visible={visible}
      style={{ width: "50vw" }}
      onHide={() => {
        if (!visible) return;
        setVisible(false);
      }}
    >
      <p className="m-0">{content}</p>
    </Dialog>
  );
};

export default Dialoged;
