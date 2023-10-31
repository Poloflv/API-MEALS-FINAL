import app from "./app.js";
import { initModel } from "./config/database/assosiations.js";
import { authenticated, syncUp } from "./config/database/database.js";
import { envs } from "./config/enviroments/enviroments.js";



async function main(){
    try {
        //conexiones a bases de datos
        await authenticated()
        initModel()
        await syncUp()
    } catch (error) {
        console.log(error);
    }
}

main()

app.listen(envs.PORT, () => {
    console.log(`Server running on port ${envs.PORT}😁`);
})