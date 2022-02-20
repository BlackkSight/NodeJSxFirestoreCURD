const { db } = require("../firebase");

const { Router } = require("express");
const router = Router();

router.get("/", async (req, res) => {
  try {
    const querySnapshot = await db.collection("contacts").get();
    const contacts = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    res.send(contacts)
  } catch (error) {
    console.error(error);
  }
});

router.post("/new-contact", async (req, res) => {
  console.log(req.body)
  const { firstname, lastname, email, phone } = req.body;
  await db.collection("contacts").add({
    firstname,
    lastname,
    email,
    phone,
  });
  res.send("Contact sent")
});

router.get("/delete-contact/:id", async (req, res) => {
  await db.collection("contacts").doc(req.params.id).delete();
  res.send("Contact deleted")
});

/* router.get("/edit-contact/:id", async (req, res) => {
  const doc = await db.collection("contacts").doc(req.params.id).get();
  res.render("index", { contact: { id: doc.id, ...doc.data() } });
 });*/

router.post("/update-contact/:id", async (req, res) => {
  const { firstname, lastname, email, phone } = req.body;
  const { id } = req.params;
  await db
    .collection("contacts")
    .doc(id)
    .update({ firstname, lastname, email, phone });
  res.send("Contact updated")
});

module.exports = router;