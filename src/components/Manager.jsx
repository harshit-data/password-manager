import React, { useEffect, useState } from "react";
import eye from "./../assets/eye.png";
import hidden from "./../assets/hidden.png";
import bin from "./../assets/bin.png";
import edit from "./../assets/edit.png";
import copy from "./../assets/copy.png";
import { v4 as uuidv4 } from "uuid";
import schema from "./zod";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Manager = () => {
  const [editing, setEditing] = useState(false);
  const [passwordId, setPasswordId] = useState(uuidv4());
  const [show, setShow] = useState(false);
  const [form, setForm] = useState({
    websiteurl: "",
    username: "",
    password: "",
  });
  const [passwordArr, setPasswordArr] = useState([]);
  useEffect(() => {
    const passwords = localStorage.getItem("passwords");
    if (passwords) {
      setPasswordArr(JSON.parse(passwords));
    }
  }, []);
  function savePassword(id) {
    setEditing(false);
    const auth = schema.safeParse(form);
    let found = false;
    console.log(passwordArr);
    if (auth.success) {
      const newPasswordArr = passwordArr.map((item, _) => {
        if (item.id === id) {
          found = true;
          item.websiteurl = form.websiteurl;
          item.username = form.username;
          item.password = form.password;
        }
        return item;
      });
      if (found) {
        toast("Password Updated Succesfully", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        setPasswordArr(newPasswordArr);
        localStorage.setItem("passwords", JSON.stringify(newPasswordArr));
      } else {
        toast("New Password Created Succesfully", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        setPasswordArr([...passwordArr, { ...form, id: id }]);
        localStorage.setItem(
          "passwords",
          JSON.stringify([...passwordArr, { ...form, id: id }])
        );
      }
      setForm({ websiteurl: "", username: "", password: "" });
      setPasswordId(uuidv4());
    } else {
      let errorMessage = "";
      console.log(auth.error.issues[0].path[0]);
      if (auth.error.issues[0].path[0] === "websiteurl") {
        errorMessage = "Invalid URL";
      } else if (auth.error.issues[0].path[0] === "username") {
        errorMessage = "Username can't be empty";
      } else {
        errorMessage = "Password can't be empty";
      }
      toast.error(errorMessage, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  }
  function copyToClipboard(text) {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        toast("Copied to Clipboard", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        console.log("Copying to clipboard was successful!");
      })
      .catch(() => {
        toast.error("Couldn't copied to clipboard", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        console.error("Could not copy text: ", err);
      });
  }
  function deletePassword(id) {
    let c = confirm("Do you really want to delete this password");
    if (c) {
      const newPasswordArr = passwordArr.filter((item) => {
        return item.id !== id;
      });
      setPasswordArr(newPasswordArr);
      localStorage.setItem("passwords", JSON.stringify(newPasswordArr));
      toast("Password deleted Successfully", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  }
  function editPassword(item) {
    setEditing(true);
    setPasswordId(item.id);
    setForm({
      websiteurl: item.websiteurl,
      username: item.username,
      password: item.password,
    });
  }
  return (
    <div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div className="absolute inset-0 -z-10 h-full w-full bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>
      <div className="md:mycontainer mx-auto text-white relative">
        <h1 className="text-center text-green-700 text-4xl font-bold tracking-wide px-5">
          <span className="text-slate-800">&lt;Pass</span>OP /&gt;
        </h1>

        <p className="text-center text-2xl my-2 text-green-700">
          Your Own Password Manager
        </p>
        <div className="text-white flex flex-col sm-flex-row p-4 gap-5 items-center">
          <input
            className="rounded-md text-black px-5 border-teal-800 border-2 w-[75vw]"
            type="text"
            placeholder="Enter your websites URL"
            value={form.websiteurl}
            onChange={(e) => {
              setForm({ ...form, websiteurl: e.target.value });
            }}
          />
          <div className="flex md:flex-row flex-col gap-5 md:gap-10 items-center">
            <input
              className="rounded-md text-black px-5 border-teal-800 border-2 w-[75vw] lg:w-[47vw] md:w-[45vw]"
              type="text"
              placeholder="Enter your name"
              value={form.username}
              onChange={(e) => {
                setForm({ ...form, username: e.target.value });
              }}
            />
            <div className="relative">
              <input
                className="rounded-md text-black pl-4 pr-8 border-teal-800 border-2 w-[75vw] md:w-[25vw]"
                type={show ? "text" : "password"}
                placeholder="Enter Your Password"
                value={form.password}
                onChange={(e) => {
                  setForm({ ...form, password: e.target.value });
                }}
              />
              <span>
                <img
                  className="w-7 p-1 absolute right-2 bottom-[0.5px] cursor-pointer"
                  src={show ? eye : hidden}
                  alt="show"
                  onClick={() => setShow(!show)}
                />
              </span>
            </div>
          </div>
          <button
            className=" hover:border-green-900 hover:border-2 h-10 bg-green-600 hover:bg-green-500 rounded-md px-2 gap-1 py-1 flex items-center w-fit"
            onClick={() => {
              savePassword(passwordId);
            }}
          >
            <lord-icon
              src="https://cdn.lordicon.com/jgnvfzqg.json"
              trigger="hover"
            ></lord-icon>
            {editing ? "Update" : "Add"} Password
          </button>
        </div>
        <div className="passwords text-black min-h-52 max-w-[75vw]">
          <table class=" w-full">
            <thead className="bg-green-800 text-green-50">
              <tr>
                <th className="w-1/4">WebsiteUrl</th>
                <th className="w-1/4">Username</th>
                <th className="w-1/4">Password</th>
                <th className="w-1/4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {passwordArr.length > 0 ? (
                passwordArr.map((item, index) => {
                  return item != null ? (
                    <tr className="text-center">
                      <td className="w-32">
                        <div className="flex items-center justify-center gap-1  pr-4">
                          <div className="">{item.websiteurl}</div>
                          <img
                            className="w-5 cursor-pointer"
                            onClick={() => {
                              copyToClipboard(item.websiteurl);
                            }}
                            src={copy}
                            alt="copy websiteUrl
            "
                          />
                        </div>
                      </td>
                      <td className="w-32">
                        <div className="flex items-center justify-center gap-1  pr-4">
                          <div className="">{item.username}</div>
                          <img
                            className="w-5 cursor-pointer"
                            onClick={() => {
                              copyToClipboard(item.username);
                            }}
                            src={copy}
                            alt="copy username"
                          />
                        </div>
                      </td>
                      <td className="w-32">
                        <div className="flex items-center justify-center gap-1  pr-4">
                          <div className="">{item.password}</div>
                          <img
                            className="w-5 cursor-pointer"
                            onClick={() => {
                              copyToClipboard(item.password);
                            }}
                            src={copy}
                            alt="copy Password"
                          />
                        </div>
                      </td>
                      <td>
                        <div className="actions flex items-center justify-center gap-1">
                          <div
                            className="flex items-center gap-1  cursor-pointer"
                            onClick={() => {
                              deletePassword(item.id);
                            }}
                          >
                            <div className="text-green-600 font-medium text-base">
                              Delete
                            </div>
                            <img
                              className="w-5"
                              src={bin}
                              alt="deletePassword"
                            />
                          </div>
                          /
                          <div
                            className="flex items-center gap-1  cursor-pointer"
                            onClick={() => {
                              editPassword(item);
                            }}
                          >
                            <div className="text-green-600 font-medium text-base">
                              Edit
                            </div>
                            <img
                              className="w-5 cursor-pointer"
                              src={edit}
                              alt="editPassword"
                            />
                          </div>
                        </div>
                      </td>
                    </tr>
                  ) : null;
                })
              ) : (
                <div className="mt-2 text-xl text-green-950">
                  No Passwords to show
                </div>
              )}
            </tbody>
          </table>
        </div>
        <button
          className="hover:border-green-900 border-transparent border-2 h-12 text-center rounded-3xl px-4 py-2 absolute left-[42%] bg-green-600 hover:bg-green-500 text-white text-xl"
          onClick={() => {
            localStorage.clear();
            setPasswordArr([]);
          }}
        >
          Clear All Password
        </button>
      </div>
    </div>
  );
};
export default Manager;
