import { useState } from "react"
import { Public_routes } from "./public.routes";
import { Footer, Header } from "../../core/components";


 export const Public_main = () => {

    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="flex h-full overflow-hidden">

            <div className="relative flex flex-col flex-1 overflow-x-hidden overflow-y-auto" >

                {/* Header */}
                {/* <Header  /> */}

                {/* Main content */}
                <main className="block h-auto py-10 grow">

                    <Public_routes />



                </main>

                {/* <Footer /> */}

            </div>

        </div>
    )
}


export default Public_main

