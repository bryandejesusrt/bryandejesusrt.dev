import Link from "next/link";
import { IoHome } from "react-icons/io5";
import { BsFillPostcardFill } from "react-icons/bs";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { IoMdPricetags } from "react-icons/io";
import { FaShoppingBag } from "react-icons/fa";
import { AiFillCode } from "react-icons/ai";
import { RiGalleryFill } from "react-icons/ri";
import { MdOutlineDesignServices } from "react-icons/md";
import { IoMdContact } from "react-icons/io";
import { FaUserAlt } from "react-icons/fa";
import {
  Bolt,
  Bug,
  FolderRoot,
  House,
  Images,
  Receipt,
  SquareTerminal,
  Store,
  UserRound,
} from "lucide-react";
import { NotebookPen } from "lucide-react";
import { FaGear } from "react-icons/fa6";

import { active } from "sortablejs";

export default function Aside({ asideOpen, handleAsideOpen }) {
  const router = useRouter();
  const [clicked, setClicked] = useState(false);
  const [activeLink, setActiveLink] = useState("/");

  const handleClick = () => {
    setClicked((prevClicked) => !prevClicked);
  };

  const handleLinkClick = (link) => {
    setActiveLink((preActive) => (preActive === link ? null : link));
    setClicked(false);
  };

  useEffect(() => {
    if (router.pathname) {
      setActiveLink(router.pathname);
    }
  }, [router.pathname]);

  return (
    <>
      <aside className={asideOpen ? "asideleft active" : "asideleft"}>
        <ul>
          <Link href="/">
            <li className="navactive">
              <House />
              <span>Dashboard</span>
            </li>
          </Link>
          <li
            className={
              activeLink === "/blogs"
                ? "navactive flex-col flex-left"
                : "navactive flex-col flex-left"
            }
            onClick={() => handleLinkClick("/blogs")}
          >
            <div className="flex gap-1">
              <NotebookPen />
              <span>Blogs</span>
            </div>
            {activeLink === "/blogs" && (
              <ul>
                <Link href="/blogs">
                  <li>All Blogs</li>
                </Link>
                <Link href="/blogs/draft">
                  <li>Draft Blogs</li>
                </Link>
                <Link href="/blogs/addblog">
                  <li>Add Blog</li>
                </Link>
              </ul>
            )}
          </li>
          <li
            className={
              activeLink === "/projects"
                ? "navactive flex-col flex-left"
                : "navactive flex-col flex-left"
            }
            onClick={() => handleLinkClick("/projects")}
          >
            <div className="flex gap-1">
              <FolderRoot />
              <span>projects</span>
            </div>
            {activeLink === "/projects" && (
              <ul>
                <Link href="/projects">
                  <li>All projects</li>
                </Link>
                <Link href="/projects/draftproject">
                  <li>Draft projects</li>
                </Link>
                <Link href="/projects/addproject">
                  <li>Add projects</li>
                </Link>
              </ul>
            )}
          </li>
          <li
            className={
              activeLink === "/shops"
                ? "navactive flex-col flex-left"
                : "navactive flex-col flex-left"
            }
            onClick={() => handleLinkClick("/shops")}
          >
            <div className="flex gap-1">
              <Store />
              <span>Shop</span>
            </div>
            {activeLink === "/shops" && (
              <ul>
                <Link href="/shops">
                  <li>All Articles</li>
                </Link>
                <Link href="/shops/draftshop">
                  <li>Draft Products</li>
                </Link>
                <Link href="/shops/addproduct">
                  <li>Add Product</li>
                </Link>
              </ul>
            )}
          </li>
          <li
            className={
              activeLink === "/gallery"
                ? "navactive flex-col flex-left"
                : "navactive flex-col flex-left"
            }
            onClick={() => handleLinkClick("/gallery")}
          >
            <div className="flex gap-1">
              <Images />
              <span>Gallery</span>
            </div>
            {activeLink === "/gallery" && (
              <ul>
                <Link href="/gallery">
                  <li>All Photo</li>
                </Link>
                <Link href="/gallery/addphoto">
                  <li>Add Photo</li>
                </Link>
              </ul>
            )}
          </li>
          <li
            className={
              activeLink === "/services"
                ? "navactive flex-col flex-left"
                : "navactive flex-col flex-left"
            }
            onClick={() => handleLinkClick("/services")}
          >
            <div className="flex gap-1">
              <SquareTerminal />
              <span>Services</span>
            </div>
            {activeLink === "/services" && (
              <ul>
                <Link href="/services">
                  <li>All Service</li>
                </Link>
                <Link href="/services/draft">
                  <li>Draft Service</li>
                </Link>
                <Link href="/services/addservices">
                  <li>Add Service</li>
                </Link>
              </ul>
            )}
          </li>
          <li
            className={
              activeLink === "/pricing"
                ? "navactive flex-col flex-left"
                : "navactive flex-col flex-left"
            }
            onClick={() => handleLinkClick("/prices")}
          >
            <div className="flex gap-1">
              <Receipt />
              <span>Prices</span>
            </div>
            {activeLink === "/prices" && (
              <ul>
                <Link href="/prices">
                  <li>All Prices</li>
                </Link>
                <Link href="prices/draftprice">
                  <li>Draft Price</li>
                </Link>
                <Link href="/prices/addprice">
                  <li>Add Price</li>
                </Link>
              </ul>
            )}
          </li>
          <Link href="/contacts">
            <li
              className={activeLink === "/contacts" ? "navactive" : ""}
              onClick={() => handleLinkClick("/contacts")}
            >
              <UserRound />
              <span>Contacts</span>
            </li>
          </Link>
          <Link href="/setting">
            <li
              className={activeLink === "/settings" ? "navactive" : ""}
              onClick={() => handleLinkClick("/setting")}
            >
              <Bolt />
              <span>Settings</span>
            </li>
          </Link>
        </ul>
        <button className="logoutbtn ">Logout</button>
      </aside>
    </>
  );
}
