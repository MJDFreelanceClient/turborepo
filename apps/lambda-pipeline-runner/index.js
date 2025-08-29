import {Pipeline, WorkerNode} from 'pipeline';

const fetchPage = async (url, attempt) => {
    console.log(`[Fetch] ${url}`);
    const html = `<a href="a.html">A</a><a href="b.html">B</a>`; // mock
    return html;
};

const extractLinks = async (html, attempt) => {
    console.log(`[Extract] HTML of length ${html.length}`);
    return ["a.html", "b.html"]; // mock links
};

const countLinks = async (links, attempt) => {
    console.log(`[Count] ${links.length} links`);
    return links.length;
};

const fetchNode = new WorkerNode(fetchPage,
    {onSuccess:(node, payload)=>{
        if (payload==="https://a.com") {
            node.execute({ payload: "https://later.com", attempt: 0 })
        }
        }}); // no pipeline assigned yet
const extractNode = new WorkerNode(extractLinks);
const countNode = new WorkerNode(countLinks);

// wire them up
await new Pipeline().createSource(fetchNode)
    .addChild(extractNode)
    .addChild(countNode)
    .batchExecuteOnSource([
        { payload: "https://a.com", attempt: 0 },
        { payload: "https://b.com", attempt: 0 },
    ]);

console.log("completed");