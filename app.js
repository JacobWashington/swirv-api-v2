const express = require("express");

const app = express();
const PORT = process.env.PORT || 8000;

/**** MIDDLEWARE ****/
app.use('/uploads', express.static('uploads'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

/**** API ROUTES ****/
const routes = require("./routes");

app.get("/", (req, res) => {
  res.json({ message: "You've got Swirv" });
});

app.use("/users", routes.User);

/**** SERVER ****/
const server = app.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`);
});