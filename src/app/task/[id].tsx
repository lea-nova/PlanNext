import { useRouter } from "next/router";
import { useEffect, useState } from "react";


const OneTaskList: React.FC = () => {
    const router = useRouter();
    const { id } = router.query;

    return (
        <div>
            <h2>{title}</h2>
        </div>
    )
}
export default OneTaskList;