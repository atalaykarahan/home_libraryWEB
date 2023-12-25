import { CONFIG } from "@/config";
import axios from "axios";

export default axios.create({
    baseURL : CONFIG.baseURL,
});
