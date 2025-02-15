// import { Navbar, Container, Nav } from 'react-bootstrap';
// import { FaSignOutAlt } from 'react-icons/fa';

// const Topbar = () => {
//   return (
//     <Navbar bg="light" expand="lg">
//       <Container>
//         <Navbar.Brand>Admin Dashboard</Navbar.Brand>
//         <Nav className="ml-auto">
//           <Nav.Link href="/logout">
//             <FaSignOutAlt /> Logout
//           </Nav.Link>
//         </Nav>
//       </Container>
//     </Navbar>
//   );
// };

// export default Topbar;

import { FaUserCircle } from "react-icons/fa";
import "../../styles/Topbar.css";

const Topbar = () => {
  return (
    <div className="topbar">
      <h3>لوحة التحكم</h3>
      <div className="profile">
        <FaUserCircle size={30} />
        <span>Admin</span>
      </div>
    </div>
  );
};

export default Topbar;
