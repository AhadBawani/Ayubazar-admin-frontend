import API from "../Middlewares/Api"
import Requests from "../Requests/Request"

export const getAllContactUsHandler = (setContactUs) => {
    API.get(Requests.GET_ALL_CONTACTS)
    .then((response) => {
        if(response){
            setContactUs(response.data);
        }
    })
    .catch((error) => {
        console.log('error in get all contact us handler : ', error);
    })
}