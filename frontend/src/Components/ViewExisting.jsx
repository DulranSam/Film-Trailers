import Axios from "axios";
import { useEffect, useState } from "react";

const ViewExisting = (props) => {
  // eslint-disable-next-line react/prop-types
  const { loading, setLoading, status, setStatus } = props;
  const [data, setData] = useState([]);

  async function getItems() {
    try {
      setLoading(true);
      const r = await Axios.get("http://localhost:8000/cart");
      setData(r.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function Order(id) {
    try {
      const r = await Axios.post(`http://localhost:8000/cart/${id}`);
      if (r.status === 201) {
        setStatus("Order Placed");
      }
    } catch (err) {
      console.error(err);
      setStatus(err.response.data.Alert);
    }
  }

  useEffect(() => {
    getItems();
  }, []);
  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Manage Shop</h1>
      <div>
        {loading ? (
          <h1>Loading...</h1>
        ) : (
          <div>
            {data && data.length ? (
              data.map((x) => (
                <div key={x._id} style={{ margin: "2%", padding: "2%" }}>
                  <h1>{x.itemName}</h1>
                  <p>{x.itemDescription}</p>
                  <h3>{x.itemQuantity} Items available in stock</h3>
                  <h4>{x.itemAvailability ? "In Stock" : "Out of stock"}</h4>
                  <img
                    alt={`Image of ${x.itemName}`}
                    src={x.itemPhoto}
                    height={"fit-content"}
                  ></img>
                  <button
                    onClick={() => {
                      Order(x._id);
                    }}
                  >
                    Order
                  </button>
                  <p>{status}</p>
                </div>
              ))
            ) : (
              <h1>No items exist</h1>
            )}
          </div>
        )}
      </div>

      {/**Needs to contain button to click and delete/update specific item */}
    </div>
  );
};

export default ViewExisting;
