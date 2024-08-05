import process from "process";
import {config as confg} from 'dotenv'

confg();
const _config = {
    port: process.env.PORT
}
const config = Object.freeze(_config)
export default config;
//Object.freeze is used to freeze the object or make it read only object so that no can change it 