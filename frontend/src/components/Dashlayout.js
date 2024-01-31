import { Outlet } from "react-router-dom";

const Dashlayout = () => {
  return (
    <>
      <div className="dash-container">
        <Outlet />
      </div>
    </>
  );
};

export default Dashlayout;
