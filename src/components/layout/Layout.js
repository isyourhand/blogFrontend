import FloatingButton from "./FloatingButton";
import MainNavigation from "./MainNavigation";
import "./css/Layout.css";

function Layout(props) {
  return (
    <div>
      <MainNavigation />
      <main className="main">{props.children}</main>
      <FloatingButton />
    </div>
  );
}

export default Layout;
