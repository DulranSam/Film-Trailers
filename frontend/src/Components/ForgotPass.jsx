import Axios from "axios";
import { useContext } from "react";
import { UserData } from "../App";

const ForgotPass = () => {
  const datax = useContext(UserData);
  // eslint-disable-next-line react/prop-types
  const { status, setStatus, loading, setLoading, data, setData } = datax;
  // eslint-disable-next-line react/prop-types

  const ForgotPass = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const r = await Axios.post("http://localhost:8000/register/forgot", {
        data,
      });
      if (r.status === 200) {
        setStatus("Ok");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <h1>Forgot Password</h1>
      <p>Fill this 👇🏻 to update your password!</p>
      <form onSubmit={ForgotPass}>
        <input
          onChange={handleChange}
          name="mail"
          placeholder="Enter email"
        ></input>
        <input
          onChange={handleChange}
          name="password"
          placeholder="Enter Updated Password"
        ></input>
        <button disabled={loading}>
          {loading ? "Loading..." : "Forgot Password"}
        </button>
      </form>
      <p>{status}</p>
    </div>
  );
};

export default ForgotPass;
