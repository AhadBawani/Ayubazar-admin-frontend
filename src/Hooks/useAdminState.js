import { useSelector } from "react-redux";

const useAdminState = () => {
    return useSelector((state) => state?.Admin) || [];
}

export default useAdminState;