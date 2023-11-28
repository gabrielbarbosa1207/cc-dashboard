import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Category from "./category/forms.js"
import UpdateCategory from "./category/update.js";
import Bank from "./bank/forms.js";
import UpdateBank from "./bank/update.js";


const rootElement = document.getElementById("root");

createRoot(rootElement).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/category" element={ <Category /> }/>
        <Route path="/bank" element={ <Bank /> }/>
        <Route path="/category/update/:slug" element={ <UpdateCategory /> }/>
        <Route path="/bank/update/:slug" element={ <UpdateBank /> }/>
      </Routes>
    
    </BrowserRouter>
  </StrictMode>
);
