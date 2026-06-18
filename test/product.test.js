import { expect } from "chai";
import request from "supertest";
import app from "../app.js";
import { test } from "mocha";

describe("CRU Products", () => {
    test("deberia traer un array de películas", async () => {
        const response = await request(app).get("/api/products")

        expect(response.status).to.equal(200)
        expect(response.body).to.be.an("array")
    })
})