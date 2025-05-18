import "./App.css";
import { ToastContainer, toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import {
  addToCart,
  handleAddQuantity,
  handleReduceQuantity,
  handleTotalProduct,
  handleRemoveItem,
} from "./features/cart/cartSlice";

const products = [
  { id: "1", name: "Quả cam", price: 10000 },
  { id: "2", name: "Quả táo", price: 15000 },
  { id: "3", name: "Quả dứa", price: 20000 },
];

function App() {
  const listProduct = useSelector((state) => state.cart.listProduct);
  const totalPayment = useSelector((state) => state.cart.totalPayment);
  const dispatch = useDispatch();

  const handleAddtoCart = (product) => {
    dispatch(addToCart(product));
    dispatch(handleTotalProduct());
  }

  return (
    <>
      <ToastContainer />
      <div className="max-w-2xl mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4 text-center">
          Danh sách sản phẩm
        </h1>
        <div className="space-y-4">
          {products.map((p) => (
            <div
              key={p.id}
              className="flex justify-between items-center border p-4 rounded shadow-sm bg-white"
            >
              <div className="text-lg">
                {p.name} -{" "}
                <span className="font-semibold text-green-600">
                  {p.price.toLocaleString("vi-VN")} VNĐ
                </span>
              </div>
              <button
                onClick={() => handleAddtoCart(p)}
                className="bg-blue-500 hover:bg-blue-700 text-white font-medium py-1 px-3 rounded"
              >
                Thêm
              </button>
            </div>
          ))}
        </div>

        <h2 className="text-xl font-bold mt-8 mb-4 text-center">Giỏ hàng</h2>
        <div className="space-y-4">
          {listProduct.length === 0 ? (
            <div className="text-center text-gray-500">
              Chưa có sản phẩm nào.
            </div>
          ) : (
            listProduct.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center border p-4 rounded shadow-sm bg-gray-50"
              >
                <div>
                  {item.name} -{" "}
                  <span className="text-green-600 font-medium">
                    {item.price.toLocaleString("vi-VN")} VNĐ
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => dispatch(handleReduceQuantity(item.id))}
                    className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded"
                  >
                    -
                  </button>
                  <span className="px-2">{item.quantity}</span>
                  <button
                    onClick={() => dispatch(handleAddQuantity(item.id))}
                    className="bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded"
                  >
                    +
                  </button>
                </div>
                <div className="text-lg font-semibold">
                  <button
                    className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded"
                    onClick={() => dispatch(handleRemoveItem(item.id))}
                  >
                    Xoá sản phẩm
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {listProduct.length > 0 && (
          <div className="mt-6 border-t pt-4 flex justify-between items-center">
            <div className="text-lg font-semibold text-blue-600">
              Tổng tiền: {totalPayment.toLocaleString("vi-VN")} VNĐ
            </div>
            <button
              onClick={() => dispatch(handleTotalProduct())}
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            >
              Thanh toán
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
