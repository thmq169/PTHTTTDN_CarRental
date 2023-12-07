require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const carOwnerAuthRouter = require("./routes/carOwner/auth");
const carOwnerCarRouter = require("./routes/carOwner/car");

const staffAuthRouter = require("./routes/staff/auth");
const staffCarRouter = require("./routes/staff/car");

const rentalInvoice = require("./routes/rentalInvoice/rentalInvoice");
const customerRouter = require("./routes/staff/customer");
const carOwnerRouter = require("./routes/staff/carOwner");

const Rental_Invoice = require("./models/Rental_invoice");

const moment = require("moment");

const cors = require("cors");

const connectDB = async () => {
  try {
    mongoose.set("strictQuery", false);
    mongoose.connect(
      `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@hiringcar.bc2rvzj.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );

    console.log("MongoDB connected");

    setInterval(async () => {
      const updateData = {
        transportation_status: "RETURNING_REQUEST",
      };

      const filter = {
        end_day: new Date(moment().add(-1, "day").format("YYYY-MM-DD")),
        transportation_status: "DELIVERY SUCESSFULL",
      };

      await Rental_Invoice.updateMany(filter, updateData);

      console.log("---------------------------");
    }, 10000);
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};

connectDB();

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => res.send("Hi!, welcome to my api"));

app.use("/api/car-owner/auth", carOwnerAuthRouter);
app.use("/api/car-owner/cars", carOwnerCarRouter);

app.use("/api/staff/auth", staffAuthRouter);
app.use("/api/staff/cars", staffCarRouter);
app.use("/api/staff/invoices", rentalInvoice);
app.use("/api/staff/customers", customerRouter);
app.use("/api/staff/carowner", carOwnerRouter);

const PORT = 5000;

app.listen(process.env.PORT, () => {
  console.log(`Server started on port http://localhost:${process.env.PORT}`);
});
