'use client'
import { ListContextProvider } from "@/context/list";

import { PropsWithChildren } from "react";
import Navbar from "@/components/Navbar/page";
const RootTemplate = ({ children }: PropsWithChildren) => {
    return (


        <ListContextProvider>
            <Navbar />
            {children}
        </ListContextProvider>
    )
}
export default RootTemplate;