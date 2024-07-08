import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../components/Modal"; // Yolu düzeltilmiştir
import Input from "../components/Input"; // Yolu düzeltilmiştir
import ProductCard from "../components/ProductCard"; // Yolu düzeltilmiştir
import { createDataFunc, updateDataFunc } from "../redux/dataSlice";
import { modalFunc } from "../redux/modalSlice";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "../components/Button";

const Product = () => {
  const { modal } = useSelector(state => state.modal);
  const { data, keyword } = useSelector(state => state.data);
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const [productInfo, setProductInfo] = useState({ name: "", price: "", url: "" });

  const onchangeFunc = (e, type) => {
    if (type === "url") {
      setProductInfo(prev => ({ ...prev, [e.target.name]: URL.createObjectURL(e.target.files[0]) }));
    } else {
      setProductInfo(prev => ({ ...prev, [e.target.name]: e.target.value }));
    }
  };

  let loc = location?.search.split("=")[1];

  useEffect(() => {
    if (loc) {
      setProductInfo(data.find(dt => dt.id == loc));
    }
  }, [loc, data]);

  const buttonFunc = () => {
    if (loc) {
      dispatch(updateDataFunc({ ...productInfo, id: parseInt(loc) }));
    } else {
      dispatch(createDataFunc({ ...productInfo, id: data.length + 1 }));
    }
    dispatch(modalFunc());
    navigate("/");
  };

  const contentModal = (
    <>
      <Input value={productInfo.name} type={"text"} placeholder={"Ürün Ekle"} id={"name"} name={"name"} onchange={e => onchangeFunc(e, "name")} />
      <Input value={productInfo.price} type={"text"} placeholder={"Fiyat Ekle"} id={"price"} name={"price"} onchange={e => onchangeFunc(e, "price")} />
      <Input type={"file"} placeholder={"Resim Seç"} id={"url"} name={"url"} onchange={e => onchangeFunc(e, "url")} />
      <Button btnText={loc ? "Ürün Güncelle" : "Ürün Oluştur"} onClick={buttonFunc} />
    </>
  );
const filteredItems = data.filter(dt => dt.name.toLowerCase().includes(keyword))
  return (
    <div>
      <div className="flex items-center flex-wrap">
        {filteredItems?.map((dt, i) => (
          <ProductCard key={i} dt={dt} />
        ))}
      </div>
      {modal && <Modal content={contentModal} title={loc ? "Ürün Güncelle" : "Ürün Oluştur"} btnText={loc ? "Vazgeç" : "İptal Et"} onClick={buttonFunc}/>}
    </div>
  );
};

export default Product;
