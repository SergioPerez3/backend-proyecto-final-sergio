import { expect } from "chai";
import  request from "supertest";
import app from "../app.js";
import { test } from "mocha";



describe("GET /", () => {
    test("espero recibir un mensaje de bienvenida", async () => {
        const response = await request(app).get("/");

        expect(response.status).to.equal(200)
        expect(response.body).to.have.property("message","Bienvenido a la API de compra-venta")
    })
})