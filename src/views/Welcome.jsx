import { useEffect } from "react";

export default function Welcome() {
    useEffect(() => {
        document.title = "Welcome";
    }, []);

    return (
        <div>

        </div>
    )
}
