import {useEffect,useState} from "react";
import {loadState,saveState} from "../lib";
export default function useAppState(){const [state,setState]=useState(loadState);useEffect(()=>{saveState(state)},[state]);return[state,setState]}
