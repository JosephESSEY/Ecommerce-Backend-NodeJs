// const request = require("supertest");
// const app = require("../app");
// const db = require("../config/db");

// describe("Test Auth routes", () => {
//   const testUser = {
//     firstname: "Test",
//     lastname: "User",
//     email: "joseph@example.com",
//     password: "password123"
//   };

//     beforeAll(async () => {
//     await db.query("DELETE FROM users WHERE email = $1", ["joseph@example.com"]);
//     });

//     afterAll(async () => {
//     try {
//         await db.query("DELETE FROM users WHERE email = $1", ["joseph@example.com"]);
//     } catch (err) {
//         console.error("Erreur dans afterAll :", err);
//     } finally {
//         await db.end();
//     }
//     });


//   it("should register a user", async () => {
//     const res = await request(app)
//       .post("/api/users/register")
//       .send(testUser);

//     expect(res.statusCode).toEqual(201);
//     expect(res.body).toHaveProperty("message", "User SignIn With Success !");
//   });

//   it("should login a user and return a token", async () => {
//     const res = await request(app)
//       .post("/api/users/login")
//       .send({ email: testUser.email, password: testUser.password });

//     expect(res.statusCode).toEqual(200);
//     expect(res.body).toHaveProperty("token");
//   });
// });


const request = require("supertest");
const app = require("../app");
const db = require("../config/db");

describe("Test Auth routes", () => {
  const testUser = {
    firstname: "Test",
    lastname: "User",
    email: "testuser@example.com", // Email plus générique
    password: "password123"
  };

  beforeAll(async () => {
    try {
      await db.query("DELETE FROM users WHERE email = $1", [testUser.email]);
    } catch (err) {
      console.error("Error in beforeAll:", err);
      throw err; // Important de propager l'erreur pour échouer le test
    }
  });


    afterAll(async () => {
        try {
            await db.query("DELETE FROM users WHERE email = $1", [testUser.email]);
        } catch (err) {
            console.error("Error in afterAll:", err);
        }
    });

  describe("POST /api/users/register", () => {
    it("should register a user", async () => {
      const res = await request(app)
        .post("/api/users/register")
        .send(testUser);

      expect(res.statusCode).toEqual(201);
      expect(res.body).toHaveProperty("message", "User SignIn With Success !");
      expect(res.body.user).toBeDefined();
      expect(res.body.user.password).toBeUndefined(); // Vérifie que le mot de passe n'est pas renvoyé
    });

    it("should fail with missing fields", async () => {
      const res = await request(app)
        .post("/api/users/register")
        .send({ email: testUser.email }); // Envoi incomplet

      expect(res.statusCode).toEqual(400);
    });
  });

  describe("POST /api/users/login", () => {
    it("should login a user and return a token", async () => {
      // On s'assure que l'utilisateur existe d'abord
      await request(app).post("/api/users/register").send(testUser);

      const res = await request(app)
        .post("/api/users/login")
        .send({ email: testUser.email, password: testUser.password });

      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty("token");
      expect(res.body.token).toBeTruthy();
    });

    it("should fail with wrong credentials", async () => {
      const res = await request(app)
        .post("/api/users/login")
        .send({ email: testUser.email, password: "wrongpassword" });

      expect(res.statusCode).toEqual(400);
    });
  });
});