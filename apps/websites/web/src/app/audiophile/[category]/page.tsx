import {Earphones} from "@/app/audiophile/[category]/@subpages/Earphones";
import {Headphones} from "@/app/audiophile/[category]/@subpages/Headphones";
import {Speakers} from "@/app/audiophile/[category]/@subpages/Speakers";

const Page = ({params:{category}}:{params: {
        category: string
    }}) => {

    switch (category.toLowerCase()) {
        case "earphones":
            return <Earphones />;
        case "headphones":
            return <Headphones />;
        case "speakers":
            return <Speakers />;
        default:
            return <>404</>
    }
};

export default Page;