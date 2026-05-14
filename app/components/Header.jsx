import React from "react";

function Header() {
  return (
    <div className="bg-black text-white flex flex-row items-center  justify-evenly px-2">
      <img
        width={"150px"}
        src="https://img-cdn.publive.online/fit-in/1200x675/filters:format(webp)/entrackr/media/post_attachments/wp-content/uploads/2023/04/KFintech.jpg"
        alt=""
      />
      <div className="flex flex-row items-center space-x-4">
        <h1>This is header</h1>
        <p>Solutions</p>
        <p>Products</p>
        <p>About us</p>
        <p>Portofolio Companies</p>
      </div>
      <div className="flex flex-row items-center space-x-4">
        <p>Career</p>
        <p>Blog</p>
        <p>Contact us</p>
        <p>News letter</p>
      </div>
    </div>
  );
}

export default Header;
