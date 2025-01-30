import { useReducer,useEffect } from "react";
import axios from "axios";

const initialState={
    data:null,
    loading: true,
    error:null,
};
function reducer (state,action){
    switch(action.type){
        case "EXITOSO":
        return { data: action.payload, loading: false, error: null };
        case "ERROR":
        return { data: null, loading: false, error: action.payload };
        default:
          return state;
    }

}
const FetchPerson =()=>{
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        axios
          .get("https://rickandmortyapi.com/api/character")
          .then((response) => {
            dispatch({ type: "EXITOSO", payload: response.data.results });
          })
          .catch((error) => {
            dispatch({ type: "ERROR", payload: error.message });
          });
      }, []);
    
      return state;
    };

export default FetchPerson;