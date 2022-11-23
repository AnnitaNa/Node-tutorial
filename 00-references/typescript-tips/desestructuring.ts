interface Iobj {
    a: string;
    b: number;
    c: boolean;
    d: Array<string>;
    e: object;
}

const obj: Iobj = {
    a: "texto",
    b: 10,
    c: true,
    d: ["d"],
    e: { a: "1" },
};

// * 1) Assign new names after :
const { a: aNewName, b: bNewName } = obj;

// * 2) Determining types
const { c, d }: { c: boolean; d: Array<string> } = obj;

// OR

const { e }: Iobj = obj;

//-------------------------------------------------

console.log(aNewName, bNewName);
console.log(c, d);
console.log(e);
