// import lodash from "lodash";

export default function persist(x) {
    if (x === undefined) { return undefined };
    return JSON.parse(JSON.stringify(x)); //seemingly incompatable with react-build
    // return Object.assign(Array.isArray(x) ? [] : {}, x) //just doesnt work period
    // return lodash.cloneDeep(x); //not ideal since lodash is big
    
}