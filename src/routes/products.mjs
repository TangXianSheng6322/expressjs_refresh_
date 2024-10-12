import { Router } from "express";

const router = Router();

router.get("/api/products", (req, res) => {
  //   console.log(req.headers.cookie);
  //   console.log(req.cookies);
  const key = req.signedCookies;
  //   if (key.hello && key.hello === "world") {
  //     res.send([{ id: 2, name: "doughnut", price: 29.99 }]);
  //   } else {
  //     res.send({ msg: "Sorry. You need to have right cookies" });
  //   }
  console.log(req.session.id);
  console.log(req.session);

  if (key.hello && key.hello === "world")
    return res.send([{ id: 2, name: "doughnut", price: 29.99 }]);

  return res.status(403).send({ msg: "Sorry. You need to have right cookies" });
});

export default router;
