import { expect } from "chai";
import request from "supertest";
import app from "../app.js";
import { test } from "mocha";

import User from "../src/models/User.js";
import Movie from "../src/models/Movie.js";
import bcrypt from "bcryptjs";


describe("CRU Products", () => {
      this.timeout(5000);

  before(async () => {
    // Crear un usuario adminstrador
    User.deleteMany();

    const hash = await bcrypt.hash("123456", 10);

    const user = {
      name: "Admin",
      email: "user@test.com",
      password: hash,
    };

    User.create(user);
  });
    test("deberia traer un array de películas", async () => {
        const response = await request(app).get("/api/products")

        expect(response.status).to.equal(200)
        expect(response.body).to.be.an("array")
    });

    test("el user deberia poder crear una pelicula", async () => {
    await Movie.deleteMany();

    const responseLogin = await request(app).post("/api/auth/login").send({
      email: "user@test.com",
      password: "123456",
    });

    const token = responseLogin.body.token;

    const movie = {
      name: "Bicicleta",
      description: "Bici de montaña",
      price: 2018,
      category: "Deporte y ocio",
      image: "https://picsum.photos/200",
      featured: false,
    };

    const response = await request(app)
      .post("/api/products")
      .send(product)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).to.equal(201);
    expect(response.body).to.have.property("name");
    expect(response.body.name).to.equal("Bicicleta");
  });
});

