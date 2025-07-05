import Preloader from "./partials/Preloader";
import Sidebar from "./partials/Sidebar";

export default function AuthLayout() {
    return (
        <>
            <Preloader />
            <div className="flex h-screen overflow-hidden">
                <Sidebar />
            </div>
        </>
    )
}
