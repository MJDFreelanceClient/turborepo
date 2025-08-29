export const noResults = (data:any) => {
    return !Array.isArray(data) || data.length === 0;
}

export const NoResults = ({data}:{data:any}) => {
    return (<>No Definitions Found</>);
};