// src/ProductList.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@material-tailwind/react";
import { PATH_ADD_PRODUCTS, PATH_HOME } from "../routes/path";
import { Link, useNavigate } from "react-router-dom";
import { replaceSpecialCharacters, formatCash } from "../Utils/Utils";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [FilterData, setFilterData] = useState();
  const navigate = useNavigate();
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (!isLoggedIn) {
      navigate("/login"); // Nếu không đăng nhập, chuyển hướng về trang login
    }
  }, [navigate]);
  useEffect(() => {
    axios
      .get("http://localhost:3000/Products")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the products!", error);
      });
  }, []);

  // const handleChange = (event) => {
  //   const value = event.target.value;
  //   if (value === "phu-kien") {
  //     const FilterData = [...products].filter((product) => {
  //       return product.type_name === "phu-kien";
  //     });
  //     setProducts(FilterData);
  //   }
  //   else if (value === "Apple_Watch") {
  //     const FilterData = [...products].filter((product) => {
  //       return product.type_name === "Apple_Watch";
  //     });
  //     setProducts(FilterData);
  //   }
  //   else if (value === "Mac") {
  //     const FilterData = [...products].filter((product) => {
  //       return product.type_name === "Mac";
  //     });
  //     setProducts(FilterData);
  //   }
  //   else if (value === "iPad") {
  //     const FilterData = [...products].filter((product) => {
  //       return product.type_name === "iPad";
  //     });
  //     setProducts(FilterData);
  //   }
  //   else if (value === "iPhone") {
  //     const FilterData = [...products].filter((product) => {
  //       return product.type_name === "iPhone";
  //     });
  //     setProducts(FilterData);
  //   }
  //   else if (value === "All") {
  //     const FilterData = [...products];
  //     setProducts(FilterData);
  //   }
  //   console.log(products);
  // };
  const handleEdit = (productId) => {
    // Placeholder function for edit action
    console.log(`Edit product with ID: ${productId}`);
  };

  const handleDelete = (productId) => {
    // Placeholder function for delete action
    console.log(`Delete product with ID: ${productId}`);
  };

  return (
    <div className=" mx-auto p-4 container min-w-[1200px]">
      <div className="flex justify-between">
        <ol className="breadcrumb py-[6px] px-0 flex list-none mb-[8px]">
          <li className="breadcrumb-item h-5 text-[#444b52] text-[14px] leading-5">
            <Link
              to={PATH_HOME}
              className="text-[#0664f9] relative inline-block"
            >
              Trang chủ{" "}
            </Link>
          </li>
        </ol>
        <h1 className="text-2xl font-bold mb-4">Products</h1>
        <Link to={PATH_ADD_PRODUCTS}>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded">
            Thêm mới
          </button>
        </Link>
      </div>
      <div className="overflow-x-auto">
        {/* <div className="content flex justify-end items-center gap-2">
          <div className="text text-sm leading-5 font-normal text-[#444b52]">
            Sắp xếp theo:
          </div>

          <select
            name="Filter"
            id="Filter"
            onChange={handleChange}
            // value={selectedValue}
            className="outline-[#cbd1d6] border focus:border-[#cbd1d6] rounded border-[#cbd1d6] min-w-[124px] w-auto py-1 pl-3 pr-8 cursor-pointer text-[#444b52] bg-[#ffffff] font-normal inline-flex items-center relative justify-between transition-[all_.3s_cubic-bezier(0,0,.4,1)]"
          >
            <option disabled selected hidden>
              Choose ...
            </option>
            <option selected="selected" value="All">
              Tất cả
            </option>
            <option value="iPhone">iPhone</option>
            <option value="iPad">iPad</option>
            <option value="Mac">Mac</option>
            <option value="Apple_Watch">Apple Watch</option>
            <option value="phu-kien">Phụ kiện</option>
          </select>
        </div> */}
        <table className="w-full bg-white shadow-md rounded-md overflow-hidden">
          <thead className="bg-gray-200">
            <tr>
              <th className="py-3 px-4 border-b border-gray-300">Image</th>
              <th className="py-3 px-4 border-b border-gray-300">
                Product Name
              </th>
              <th className="py-3 px-4 border-b border-gray-300">Type</th>
              <th className="py-3 px-4 border-b border-gray-300">Giá mới</th>
              <th className="py-3 px-4 border-b border-gray-300">Giá cũ</th>
              <th className="py-3 px-4 border-b border-gray-300">Colors</th>
              <th className="py-3 px-4 border-b border-gray-300">Min ROM</th>
              <th className="py-3 pl-8 px-[70px] border-b border-gray-300">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr
                key={index}
                className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}
              >
                <td className="py-3 px-4 border-b border-gray-300">
                  <img
                    src={`http://localhost:3000/assets/${product.image_caption_URL}`}
                    alt={product.product_name}
                    className="w-16 h-16 object-cover rounded-md"
                  />
                </td>
                <td className="py-3 px-4 border-b border-gray-300">
                  {product.product_name}
                </td>
                <td className="py-3 px-4 border-b border-gray-300">
                  {replaceSpecialCharacters(product.type_name)}
                </td>
                <td className="py-3 px-4 border-b border-gray-300">
                  {formatCash(product.MaxCaptionPrice)}vnđ
                </td>
                <td className="py-3 px-4 border-b border-gray-300">
                  {formatCash(product.OldPrice) === 0
                    ? formatCash(product.MaxCaptionPrice)
                    : formatCash(product.OldPrice)}
                  vnđ
                </td>
                <td className="py-3 px-4 border-b border-gray-300">
                  <div className="product-color flex gap-3 mb-4 justify-center">
                    {product.colors &&
                      [...new Set(product.colors.split(","))].map(
                        (color, index) => (
                          <span
                            style={{
                              backgroundColor: `${color}`,
                            }}
                            key={index}
                            className={`rounded-[50%] shadow-[0_1px_1px_rgba(0,0,0,.15)] w-4 h-4`}
                          ></span>
                        )
                      )}
                  </div>
                </td>
                <td className="py-3 px-4 border-b border-gray-300">
                  {product.MinRom === null || product.MinRom === 0
                    ? "Khoong co"
                    : product.MinRom}
                </td>
                <td className="py-3 pl-8 px-[70px] border-b border-gray-300 space-x-2">
                  <div className="flex justify-around gap-4 w-full">
                    <button
                      className="select-none rounded-lg bg-green-500 py-1 px-2 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-green-500/20 transition-all hover:shadow-lg hover:shadow-green-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                      type="button"
                    >
                      Info
                    </button>
                    <button
                      onClick={() => handleEdit(product.ProductId)}
                      className="bg-blue-500 text-white py-1 px-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(product.ProductId)}
                      className="bg-red-500 text-white py-1 px-2 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Products;
