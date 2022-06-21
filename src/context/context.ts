import { createContext } from "react";

import { DarkMode } from "../../global";

const context = createContext<DarkMode | null>(null);

export { context };
