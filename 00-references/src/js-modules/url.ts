const urls = new URL(
    " https://user:password@sub.example.com:8080/p/a/t/h?query=string#hash"
);

function urlStructures(url: URL) {
    return {
        Serialized: {
            HREF: url.href,
            TOSTRING: url.toString(),
        },
        PROTOCOL: url.protocol,
        USERNAME: url.username,
        PASSWORD: url.password,
        HOST: url.host,
        HOSTNAME: url.hostname,
        PORT: url.port,
        PATHNAME: url.pathname,
        SEARCH: url.search,
        HASH: url.hash,
    };
}

console.log(urlStructures(urls));

//returns query of the variable in the format: {prop1 => value1, prop2 => value2}
const urlQuery = urls.searchParams;

// adds param to query
urlQuery.append("num", "123");

console.log(urlQuery);

//to return a value, needs to use get('prop')
console.log(`using get('query'): ${urlQuery.get("query")}`);

//Loop through params
urlQuery.forEach((val, key) => {
    console.log(`${key}: ${val}`);
});
