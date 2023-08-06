// components/Layout.js
import Navbar from './Navbar';

const NavbarLayout = ({ children }) => {
  return (
    <>
      <Navbar />
      <div className=''>{children}</div>
    </>
  );
};

export default NavbarLayout;
