import { useNavigate } from "react-router-dom";
import { Menu } from "antd";
import {
  LinuxOutlined,
  SlackOutlined,
  AliwangwangOutlined,
  PlusOutlined,
  HomeOutlined,
  DingdingOutlined,
  RedditOutlined,
} from "@ant-design/icons";
import { useContext } from "react";
import { AppContext } from "../AppContext";
import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const { fetchData } = useContext(AppContext);
  const { fetchReact } = useContext(AppContext);

  const handleNote = () => {
    navigate("/note");
  };

  const onClick = (e) => {
    if (e.key === "") {
      fetchData();
    } else if (e.key === "react") {
      fetchReact();
    } else if (e.key === "laravel") {
      console.log("Laravel");
    } else if (e.key === "codeigniter") {
      console.log("Codeigniter");
    }
    navigate(`/${e.key}`);
  };

  const items = [
    {
      key: "sub",
      label: (
        <div style={{ cursor: "pointer" }} onClick={() => navigate("/")}>
          <h3 className="text-center my-4">
            <span>
              <DingdingOutlined className="logoIcon" />
            </span>
            EulaNotes
          </h3>
        </div>
      ),

      className: "text-white",
      type: "group",
    },
    {
      key: "sub-btn",
      label: (
        <div>
          <button className="btn btn-success w-100 my-3" onClick={handleNote}>
            <span className="pe-2">
              <PlusOutlined />
            </span>
            Taking Note
          </button>
        </div>
      ),
      type: "group",
    },
    {
      key: "",
      label: "Home",
      icon: <HomeOutlined />,
    },
    {
      key: "react",
      label: "React",
      icon: <SlackOutlined />,
    },
    {
      key: "laravel",
      label: "Laravel",
      icon: <LinuxOutlined />,
    },

    {
      key: "codeigniter",
      label: "Codeigniter",
      icon: <AliwangwangOutlined />,
      className: "",
    },
    {
      key: "other",
      label: "Other",
      icon: <RedditOutlined />,
      className: "",
    },
  ];

  return (
    <Menu
      onClick={onClick}
      style={{
        width: 300,
      }}
      defaultSelectedKeys={[""]}
      defaultOpenKeys={["sub1"]}
      mode="inline"
      items={items}
      className="bg-dark-subtle  vh-100 px-2"
    />
  );
};

export default Navbar;
