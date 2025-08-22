import { useParams } from "react-router-dom";

export default function CategoryBooks() {
    const { slug } = useParams();

    return (
        <div>
            {slug}
        </div>
    )
}

