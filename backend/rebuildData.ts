import { refreshDatabase } from "./tests/RefreshDatabase";


refreshDatabase()
    .then(c => c.close())
    .catch(err => console.log(err))