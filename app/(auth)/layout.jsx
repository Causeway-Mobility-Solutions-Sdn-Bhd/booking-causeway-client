import Nav from "../_components/Nav";
import BottomBar from "../_components/BottomBar";
import SideBar from "../_components/SideBar";

export default function AuthLayout({ children }) {
  return (
    <div>
      <Nav isPrimary={false} />
      <div>{children}</div>
      <BottomBar />
      <SideBar />
    </div>
  );
}
