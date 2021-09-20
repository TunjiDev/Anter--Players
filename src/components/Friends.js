import Nav from "./NavLink";
import "./styles3.css";
// import { Plugins } from "@capacitor/core";
// const { Contacts } = Plugins;
import { Contacts } from "@capacitor-community/contacts";

// Contacts.getContacts()
//   ? Contacts?.getContacts().then((result) => {
//       console.log(result);
//       localStorage.setItem("contacts", JSON.stringify(result.contacts));
//     })
//   : null;

const Friends = () => {
  return (
    <div>
      <div className="container">
        <header className="navigation">
          <div className="nav">
            <div className="nav__property">
              <div className="nav__property--top">
                <img src="../img/naira.svg" alt="" className="icons" />
                <span className="nav-earned amount-earned">500</span>
              </div>
              <div className="nav__property--bottom">
                <p className="nav-text">Earned</p>
              </div>
            </div>

            <div className="nav__property">
              <div className="nav__property--top">
                <img src="../img/yellow-coin.svg" alt="" className="icons" />
                <span className="nav-earned amount-earned">400</span>
              </div>
              <div className="nav__property--bottom">
                <p className="nav-text">coins</p>
              </div>
            </div>
            <div className="nav__property">
              <div className="nav__property--top">
                <img src="../img/extral-life.svg" alt="" className="icons" />
                <span className="nav-earned amount-earned">3</span>
              </div>
              <div className="nav__property--bottom">
                <p className="nav-text">Extra Life</p>
              </div>
            </div>
            <div className="nav__property">
              <div className="nav__property--top">
                <img src="../img/eraser.svg" alt="" className="icons" />
                <span className="nav-earned amount-earned">4</span>
              </div>
              <div className="nav__property--bottom">
                <p className="nav-text">Earned</p>
              </div>
            </div>
          </div>

          <a href="" role="button" className="btn nav-btn">
            <img src="../img/plus.svg" alt="" className="icons" />
            <span className="nav-btn-text">Get More</span>
          </a>
        </header>

        <section className="vsfriend phone-book">
          <div className="vsfriend__add">
            <button className="vsfriend__add-phonebook phonebook-active">
              Add from Phonebook
            </button>
            <button className="vsfriend__add-search phonebook-search">
              Search
            </button>
          </div>

          <div className="vsfriend__searchBar">
            <div className="vsfriend__searchBar-img">
              <img src="../img/search-icon.svg" alt="search-icon" />
            </div>
            <input type="search" placeholder="search contacts" />
            <div className="vsfriend__searchBar-close">
              <a href="#">&times; </a>
            </div>
          </div>

          <p className="phone-book__heading">Contact List</p>

          <div className="vsfriend__friends">
            <div className="vsfriend__friends-image">
              <img
                src="../img/admin1.jpg"
                alt="friend-pix"
                className="vsfriend__friends-image--pix"
              />
            </div>
            <p className="vsfriend__friends-name phone-book__name">Philip</p>
            <a href="../html/playfree.html">
              <button className="vsfriend__friends-play">Add</button>{" "}
            </a>
          </div>

          <div className="vsfriend__friends">
            <div className="vsfriend__friends-image">
              <img
                src="../img/admin1.jpg"
                alt="friend-pix"
                className="vsfriend__friends-image--pix"
              />
            </div>
            <p className="vsfriend__friends-name phone-book__name">Philip</p>
            <a href="../html/playfree.html">
              <button className="vsfriend__friends-play">Add</button>{" "}
            </a>
          </div>

          <div className="vsfriend__friends">
            <div className="vsfriend__friends-image">
              <img
                src="../img/admin1.jpg"
                alt="friend-pix"
                className="vsfriend__friends-image--pix"
              />
            </div>
            <p className="vsfriend__friends-name phone-book__name">Philip</p>
            <a href="../html/playfree.html">
              <button className="vsfriend__friends-play">Add</button>{" "}
            </a>
          </div>

          <div className="vsfriend__friends">
            <div className="vsfriend__friends-image">
              <img
                src="../img/admin1.jpg"
                alt="friend-pix"
                className="vsfriend__friends-image--pix"
              />
            </div>
            <p className="vsfriend__friends-name phone-book__name">Philip</p>
            <a href="../html/playfree.html">
              <button className="vsfriend__friends-play">Add</button>{" "}
            </a>
          </div>

          <div className="vsfriend__friends">
            <div className="vsfriend__friends-image">
              <img
                src="../img/Vector.svg"
                alt="friend-pix"
                className="vsfriend__friends-image--pix"
              />
            </div>
            <p className="vsfriend__friends-name phone-book__name">Cesna</p>
            <a href="../html/playfree.html">
              <button className="vsfriend__friends-play invite">invite</button>{" "}
            </a>
          </div>

          <div className="vsfriend__friends">
            <div className="vsfriend__friends-image">
              <img
                src="../img/Vector.svg"
                alt="friend-pix"
                className="vsfriend__friends-image--pix"
              />
            </div>
            <p className="vsfriend__friends-name phone-book__name">Purity</p>
            <a href="../html/playfree.html">
              <button className="vsfriend__friends-play invite">invite</button>{" "}
            </a>
          </div>
        </section>
      </div>

      <Nav />
    </div>
  );
};

export default Friends;
