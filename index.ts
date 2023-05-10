import { populate } from "./app/utility/populateDb";
import { config } from "dotenv";
config();

// populate();

import { startServer } from "./app/app";
startServer();