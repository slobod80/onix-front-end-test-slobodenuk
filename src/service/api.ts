/*const myURL:string="https://cold-water-7357.getsandbox.com/";

export default {myURL}

*/

import axios from "axios"

const ax = axios.create({
  baseURL: "https://cold-water-7357.getsandbox.com/",
});

export default ax;