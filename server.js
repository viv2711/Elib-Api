import app from "./src/app.js";
import process from "process";

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`)
})