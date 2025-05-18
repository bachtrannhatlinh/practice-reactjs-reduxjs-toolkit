import "./App.css";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import {
  handleAddCam,
  handleAddDua,
  handleAddTao,
  handleReduceCamSlice,
  handleReduceDuaSlice,
  handleReduceTaoSlice,
} from "./features/cart/cartSlice";

function App() {
  const [cam, setCam] = useState(false);
  const [tao, setTao] = useState(false);
  const [dua, setDua] = useState(false);

  const cart = useSelector((state) => state.cart);
  const [quantityCam, quantityTao, quantityDua] = useSelector((state) => [
    state.cart.quatityCam,
    state.cart.quantityTao,
    state.cart.quantityDua,
  ]);
  const dispatch = useDispatch();

  const [total, setTotal] = useState(0);

  const camPrice = 10000;
  const taoPrice = 20000;
  const duaPrice = 30000;
  useEffect(() => {
    if (cam || tao || dua) {
      setTotal(
        quantityCam * camPrice + quantityTao * taoPrice + quantityDua * duaPrice
      );
    } else {
      setTotal(0);
    }
  }, [quantityCam, quantityTao, quantityDua]);

  // const totalPrice = total.toLocaleString("vi-VN", {
  //   style: "currency",
  //   currency: "VND",
  // });
  // const totalPriceNumber = total.toLocaleString("en-US", {
  //   style: "currency",
  //   currency: "USD",
  // });

  const handleAddTaoMore = () => {
    dispatch(handleAddTao(1));
  };
  const handleAddCamMore = () => {
    dispatch(handleAddCam(1));
  };
  const handleAddDuaMore = () => {
    dispatch(handleAddDua(1));
  };

  const handleReduceCam = () => {
    dispatch(handleReduceCamSlice(1));
  };
  const handleReduceTao = () => {
    dispatch(handleReduceTaoSlice(1));
  };
  const handleReduceDua = () => {
    dispatch(handleReduceDuaSlice(1));
  };

  const handleDeleteCam = () => {
    setCam(false);
    // setQuantityCam(0);
  };

  const handleDeleteTao = () => {
    setTao(false);
    // setQuantityTao(0);
  };

  const handleDeleteDua = () => {
    setDua(false);
    // setQuantityDua(0);
  };

  const handlePaySuccess = () => {
    if (total > 0) {
      toast.success(`thanh toán thành công với tổng số tiền là ${total}`, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setTotal(0);
      setCam(false);
      setTao(false);
      setDua(false);
      // setQuantityCam(0);
      // setQuantityTao(0);
      // setQuantityDua(0);
    } else {
      toast.error("Giỏ hàng trống", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="App">
        <h1 className="text-3xl font-bold underline text-red-600">
          Tiệm tạp hoá trái cây
        </h1>
        <div>
          <div>
            Quả cam
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => setCam(true)}
            >
              Thêm vào giỏ hàng
            </button>
          </div>
          <div>
            Quả táo
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => setTao(true)}
            >
              Thêm vào giỏ hàng
            </button>
          </div>
          <div>
            Quả dưa hấu
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => setDua(true)}
            >
              Thêm vào giỏ hàng
            </button>
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-bold">Giỏ hàng</h2>
          <ul>
            {cam ? (
              <li>
                Quả cam
                <span className="text-red-500">
                  {" "}
                  có bao nhiêu quả cam {quantityCam}
                </span>
                <span className="text-red-500"> giá {camPrice} VNĐ</span>
                <button
                  className="bg-blue-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  onClick={handleAddCamMore}
                >
                  tăng thêm
                </button>
                <button
                  className="bg-yellow-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  onClick={handleReduceCam}
                  disabled={quantityCam === 0}
                >
                  giảm bớt
                </button>
                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  onClick={handleDeleteCam}
                >
                  Xoá khỏi giỏ hàng
                </button>
              </li>
            ) : null}
            {tao ? (
              <li>
                Quả táo
                <span className="text-red-500">
                  {" "}
                  có bao nhiêu quả táo {quantityTao}
                </span>
                <span className="text-red-500"> giá {taoPrice} VNĐ</span>
                <button
                  className="bg-blue-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  onClick={handleAddTaoMore}
                >
                  tăng thêm
                </button>
                <button
                  className="bg-yellow-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  onClick={handleReduceTao}
                  disabled={quantityTao === 0}
                >
                  giảm bớt
                </button>
                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  onClick={handleDeleteTao}
                >
                  Xoá khỏi giỏ hàng
                </button>
              </li>
            ) : null}
            {dua ? (
              <li>
                Quả dưa hấu
                <span className="text-red-500">
                  có bao nhiêu quả dưa hấu {quantityDua}
                </span>
                <span className="text-red-500"> giá {duaPrice} VNĐ</span>
                <button
                  className="bg-blue-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  onClick={handleAddDuaMore}
                >
                  tăng thêm
                </button>
                <button
                  className="bg-yellow-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  onClick={handleReduceDua}
                  disabled={quantityDua === 0}
                >
                  giảm bớt
                </button>
                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  onClick={handleDeleteDua}
                >
                  Xoá khỏi giỏ hàng
                </button>
              </li>
            ) : null}
          </ul>
          <h3 className="text-xl font-bold">Tổng tiền: {total}</h3>
          <button
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            onClick={handlePaySuccess}
          >
            Thanh toán
          </button>
          <button className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
            Huỷ
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
