import { useState } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";

const AddFilm = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    title: "",
    description: "",
    trailer: "",
    photo: null,
    alternate: "",
  });
  const [status, setStatus] = useState("");

  const handleChange = (e, field) => {
    setData((prevData) => ({ ...prevData, [field]: e.target.value }));
  };

  const handleFileChange = (e) => {
    setData({ ...data, photo: e.target.files[0] });
  };

  async function createFilm(e) {
    e.preventDefault();
    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("trailer", data.trailer);
      // formData.append("photo", data.photo);

      const response = await Axios.post("http://localhost:8000/home", {
        title: data.title,
        description: data.description,
        trailer: data.trailer,
        alternate: data.alternate,
      });

      if (response.status === 201) {
        setStatus(`${data.title} Added`);
      }
    } catch (err) {
      console.error(err);
      setStatus("Error adding film");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <h1 style={{ fontSize: 32 }}>Add Film</h1>

      <form onSubmit={createFilm}>
        <input
          onChange={(e) => handleChange(e, "title")}
          placeholder="Enter Title"
        />
        <input
          onChange={(e) => handleChange(e, "description")}
          placeholder="Enter description"
        />
        <input
          onChange={(e) => handleChange(e, "trailer")}
          placeholder="Enter trailer"
        />
        <input
          onChange={(e) => handleChange(e, "alternate")}
          placeholder="Enter alternate image by address"
        />
        <input onChange={handleFileChange} type="file" />
        <button type="submit" disabled={loading}>
          {loading ? "Loading..." : "Add Film"}
        </button>
        <h1>{status}</h1>
      </form>
      <Link to="/">Go to Movies</Link>
    </>
  );
};

export default AddFilm;
