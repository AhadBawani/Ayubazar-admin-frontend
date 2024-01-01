import { useSelector } from "react-redux";

const useCompanyState = () => {
    return useSelector((state) => state?.Admin?.company) || [];
}

export default useCompanyState;