import { useEffect, useState } from "react";

export default function Preloader() {
    const [loaded, setLoaded] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setLoaded(false), 500); // hides after 500ms

        return () => clearTimeout(timer); // cleanup on unmount
    }, []);

    if (!loaded) return null;

    return (
        <div className="fixed left-0 top-0 z-[999999] flex h-screen w-screen items-center justify-center bg-white ">
            <div className="h-16 w-16 animate-spin rounded-full border-4 border-solid border-brand-500 border-t-transparent"></div>
        </div>
    );
}
