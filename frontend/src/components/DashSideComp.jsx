import { useLocation } from "react-router-dom";
import { cn } from "../utils/twUtils";

const DashSideBarComp = ({ title, icon, path }) => {
  const {pathname} = useLocation();

  return (
    <a
      href={path}
      className={cn(
        "flex gap-5 border-[1.5px] p-2 rounded-lg cursor-pointer",
        pathname === path
          ? " bg-blue-600 text-white"
          : " hover:bg-blue-600 hover:text-white cursor-pointer "
      )}
    >
      {icon}
      <span className=" text-start flex-1 ">{title}</span>
    </a>
  );
};

export default DashSideBarComp;
