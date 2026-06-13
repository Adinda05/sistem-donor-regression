process.env.NODE_ENV = "test";

const request = require("supertest");
const app = require("../app");

describe("Regression Test Suite Sistem Donor", () => {

  test("GET / harus mengembalikan status 200", async () => {
    const res = await request(app).get("/");
    expect(res.statusCode).toBe(200);
  });

  test("GET / harus mengandung teks Backend jalan", async () => {
    const res = await request(app).get("/");
    expect(res.text).toContain("Backend");
  });

  test("POST /register gagal jika email tidak valid", async () => {
    const res = await request(app)
      .post("/register")
      .send({
        nama: "Dinda",
        email: "email-salah",
        password: "123456"
      });

    expect(res.statusCode).toBe(400);
  });

  test("POST /register gagal jika password kurang dari 6 karakter", async () => {
    const res = await request(app)
      .post("/register")
      .send({
        nama: "Dinda",
        email: "dinda@test.com",
        password: "123"
      });

    expect(res.statusCode).toBe(400);
  });

  test("POST /register gagal jika nama kosong", async () => {
    const res = await request(app)
      .post("/register")
      .send({
        nama: "",
        email: "abc@gmail.com",
        password: "123456"
      });

    expect(res.statusCode).toBe(400);
  });

  test("POST /register gagal jika email kosong", async () => {
    const res = await request(app)
      .post("/register")
      .send({
        nama: "Dinda",
        email: "",
        password: "123456"
      });

    expect(res.statusCode).toBe(400);
  });

  test("POST /register gagal jika password kosong", async () => {
    const res = await request(app)
      .post("/register")
      .send({
        nama: "Dinda",
        email: "dinda@gmail.com",
        password: ""
      });

    expect(res.statusCode).toBe(400);
  });

  test("POST /login gagal jika email tidak valid", async () => {
    const res = await request(app)
      .post("/login")
      .send({
        email: "abc",
        password: "123456"
      });

    expect(res.statusCode).toBe(400);
  });

  test("POST /login gagal jika password kosong", async () => {
    const res = await request(app)
      .post("/login")
      .send({
        email: "test@gmail.com",
        password: ""
      });

    expect(res.statusCode).toBe(400);
  });

  test("POST /login gagal jika email kosong", async () => {
    const res = await request(app)
      .post("/login")
      .send({
        email: "",
        password: "123456"
      });

    expect(res.statusCode).toBe(400);
  });

test("POST /login email tidak ditemukan", async () => {

  const res = await request(app)
    .post("/login")
    .send({
      email: "tidakada@gmail.com",
      password: "123456"
    });

  expect(res.statusCode).toBe(404);

});

  test("GET /donor mengembalikan status 200", async () => {
    const res = await request(app).get("/donor");
    expect(res.statusCode).toBe(200);
  });

  test("GET /donor mengembalikan array", async () => {
    const res = await request(app).get("/donor");
    expect(Array.isArray(res.body)).toBe(true);
  });

  test("POST /donor tanpa token harus gagal", async () => {
    const res = await request(app)
      .post("/donor")
      .send({});

    expect(res.statusCode).toBe(401);
  });

  test("POST /donor token palsu harus gagal", async () => {
    const res = await request(app)
      .post("/donor")
      .set("Authorization", "Bearer token-palsu")
      .send({});

    expect(res.statusCode).toBe(401);
  });

  test("PUT /donor/id-salah harus gagal", async () => {
    const res = await request(app)
      .put("/donor/id-salah")
      .send({
        nama: "Update"
      });

    expect([404, 500]).toContain(res.statusCode);
  });

  test("PUT /donor/123 harus gagal", async () => {
    const res = await request(app)
      .put("/donor/123")
      .send({
        nama: "Tes"
      });

    expect([404, 500]).toContain(res.statusCode);
  });

  test("DELETE /donor/id-salah harus gagal", async () => {
    const res = await request(app)
      .delete("/donor/id-salah");

    expect([404, 500]).toContain(res.statusCode);
  });

  test("DELETE /donor/123 harus gagal", async () => {
    const res = await request(app)
      .delete("/donor/123");

    expect([404, 500]).toContain(res.statusCode);
  });

});

test("POST /register berhasil", async () => {

  const res = await request(app)
    .post("/register")
    .send({
      nama: "Dinda",
      email: "baru@test.com",
      password: "123456"
    });

  expect(res.statusCode).toBe(200);

});

test("POST /register email sudah digunakan", async () => {

  const res = await request(app)
    .post("/register")
    .send({
      nama: "Dinda",
      email: "duplicate@test.com",
      password: "123456"
    });

  expect(res.statusCode).toBe(400);

});

test("POST /login berhasil", async () => {

  const res = await request(app)
    .post("/login")
    .send({
      email: "user@test.com",
      password: "123456"
    });

  expect(res.statusCode).toBe(200);

});

test("POST /login password salah", async () => {

  const res = await request(app)
    .post("/login")
    .send({
      email: "salahpassword@test.com",
      password: "123456"
    });

  expect(res.statusCode).toBe(400);

});

test("POST /donor berhasil", async () => {

  const res = await request(app)
    .post("/donor")
    .set("Authorization", "Bearer dummy-token")
    .send({
      nama: "Dinda",
      jenisKelamin: "Perempuan",
      umur: 22,
      beratBadan: 50,
      golonganDarah: "O",
      lokasi: "Parepare",
      kontak: "08123456789",
      userId: "123"
    });

  expect(res.statusCode).toBe(200);

});

test("PUT /donor berhasil", async () => {

  const res = await request(app)
    .put("/donor/valid-id")
    .send({
      nama: "Update"
    });

  expect(res.statusCode).toBe(200);

});

test("DELETE /donor berhasil", async () => {

  const res = await request(app)
    .delete("/donor/valid-id");

  expect(res.statusCode).toBe(200);

});

test("POST /donor nama kosong", async () => {

  const res = await request(app)
    .post("/donor")
    .set("Authorization", "Bearer dummy-token")
    .send({
      nama: "",
      jenisKelamin: "Perempuan",
      umur: 22,
      beratBadan: 50,
      golonganDarah: "O",
      lokasi: "Parepare",
      kontak: "08123",
      userId: "1"
    });

  expect(res.statusCode).toBe(400);

});

test("POST /donor jenis kelamin kosong", async () => {

  const res = await request(app)
    .post("/donor")
    .set("Authorization", "Bearer dummy-token")
    .send({
      nama: "Dinda",
      jenisKelamin: "",
      umur: 22,
      beratBadan: 50,
      golonganDarah: "O",
      lokasi: "Parepare",
      kontak: "08123",
      userId: "1"
    });

  expect(res.statusCode).toBe(400);

});

test("POST /donor umur bukan angka", async () => {

  const res = await request(app)
    .post("/donor")
    .set("Authorization", "Bearer dummy-token")
    .send({
      nama: "Dinda",
      jenisKelamin: "Perempuan",
      umur: "abc",
      beratBadan: 50,
      golonganDarah: "O",
      lokasi: "Parepare",
      kontak: "08123",
      userId: "1"
    });

  expect(res.statusCode).toBe(400);

});

test("POST /donor berat badan bukan angka", async () => {

  const res = await request(app)
    .post("/donor")
    .set("Authorization", "Bearer dummy-token")
    .send({
      nama: "Dinda",
      jenisKelamin: "Perempuan",
      umur: 22,
      beratBadan: "abc",
      golonganDarah: "O",
      lokasi: "Parepare",
      kontak: "08123",
      userId: "1"
    });

  expect(res.statusCode).toBe(400);

});

test("POST /donor golongan darah kosong", async () => {

  const res = await request(app)
    .post("/donor")
    .set("Authorization", "Bearer dummy-token")
    .send({
      nama: "Dinda",
      jenisKelamin: "Perempuan",
      umur: 22,
      beratBadan: 50,
      golonganDarah: "",
      lokasi: "Parepare",
      kontak: "08123",
      userId: "1"
    });

  expect(res.statusCode).toBe(400);

});

test("POST /donor lokasi kosong", async () => {

  const res = await request(app)
    .post("/donor")
    .set("Authorization", "Bearer dummy-token")
    .send({
      nama: "Dinda",
      jenisKelamin: "Perempuan",
      umur: 22,
      beratBadan: 50,
      golonganDarah: "O",
      lokasi: "",
      kontak: "08123",
      userId: "1"
    });

  expect(res.statusCode).toBe(400);

});

test("POST /donor kontak kosong", async () => {

  const res = await request(app)
    .post("/donor")
    .set("Authorization", "Bearer dummy-token")
    .send({
      nama: "Dinda",
      jenisKelamin: "Perempuan",
      umur: 22,
      beratBadan: 50,
      golonganDarah: "O",
      lokasi: "Parepare",
      kontak: "",
      userId: "1"
    });

  expect(res.statusCode).toBe(400);

});

test("POST /donor userId kosong", async () => {

  const res = await request(app)
    .post("/donor")
    .set("Authorization", "Bearer dummy-token")
    .send({
      nama: "Dinda",
      jenisKelamin: "Perempuan",
      umur: 22,
      beratBadan: 50,
      golonganDarah: "O",
      lokasi: "Parepare",
      kontak: "08123",
      userId: ""
    });

  expect(res.statusCode).toBe(400);

});

test("POST /donor authorization bearer kosong", async () => {

  const res = await request(app)
    .post("/donor")
    .set("Authorization", "Bearer ")
    .send({});

  expect(res.statusCode).toBe(401);

});

test("POST /donor authorization random token", async () => {

  const res = await request(app)
    .post("/donor")
    .set("Authorization", "Bearer random-token")
    .send({});

  expect(res.statusCode).toBe(401);

});

test("POST /donor berhasil data A", async () => {

  const res = await request(app)
    .post("/donor")
    .set("Authorization", "Bearer dummy-token")
    .send({
      nama: "Andi",
      jenisKelamin: "Laki-laki",
      umur: 25,
      beratBadan: 60,
      golonganDarah: "A",
      lokasi: "Parepare",
      kontak: "0811111111",
      userId: "1"
    });

  expect(res.body.message).toBe("Data berhasil disimpan");

});

test("POST /register berhasil mengembalikan message", async () => {

  const res = await request(app)
    .post("/register")
    .send({
      nama: "User Baru",
      email: "baru123@test.com",
      password: "123456"
    });

  expect(res.body.message).toBe("Register berhasil");

});

test("POST /login berhasil mengembalikan token", async () => {

  const res = await request(app)
    .post("/login")
    .send({
      email: "user@test.com",
      password: "123456"
    });

  expect(res.body.token).toBeDefined();

});

test("PUT /donor valid-id mengembalikan data", async () => {

  const res = await request(app)
    .put("/donor/valid-id")
    .send({
      nama: "Dinda Update"
    });

  expect(res.body.message).toBe("Berhasil update");

});

test("DELETE /donor valid-id mengembalikan pesan", async () => {

  const res = await request(app)
    .delete("/donor/valid-id");

  expect(res.body.message).toBe("Berhasil dihapus");

});