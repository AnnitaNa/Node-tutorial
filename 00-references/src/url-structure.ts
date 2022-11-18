const url = new URL(
    "https://user:password@sub.example.com:8080/p/a/t/h?query=string#hash"
);

function urlStructure(url: URL) {
    return {
        HREF: url.href,
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

console.table(urlStructure(url));
