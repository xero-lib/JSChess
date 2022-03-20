// import lodash from "lodash";

export default function persist(x) {
    if (x === undefined) { return undefined };
    return JSON.parse(JSON.stringify(x));
    // return lodash.cloneDeep(x); //not ideal since lodash is big
}