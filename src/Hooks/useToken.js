import { useSelector } from "react-redux";

const useToken = () => {
    return useSelector((state) => state?.User?.token);
}

export default useToken;
