process.env.NODE_ENV = 'test';
const request = require("supertest");
const app = require('./app');
const items = require('./fakeDb');

let item1 = { "name": "popsicle", "price": 1.45 };
let item2 = { "name": "cheerios", "price": 3.40 };


describe("Test 1", function () {
    test("add first item to array", async () => {
        const resp = await request(app).post("/items").send(item1)
        expect(resp.statusCode).toBe(201);
        expect(resp.body.added).toEqual(item1);
    })
    test("add second item to array", async () => {
        const resp = await request(app).post("/items").send(item2)
        expect(resp.statusCode).toBe(201);
        expect(resp.body.added).toEqual(item2);
    })
    test('get array of all items', async () => {
        const resp = await request(app).get('/items');
        expect(resp.statusCode).toBe(200);
        expect(resp.body).toEqual(items)
    })
    test('update an item by name', async () => {
        const resp = await request(app).patch('/items/cheerios').send("name=new popsicle");
        expect(resp.statusCode).toBe(200);
        expect(resp.body.updated.name).toEqual("new popsicle")
    })
    test('delete one item from items', async () => {
        const resp = await request(app).delete('/items/new popsicle');
        expect(resp.statusCode).toBe(200);
        expect(resp.body.message).toEqual("Deleted");
    })
})