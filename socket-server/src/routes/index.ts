
import { Router } from 'express';


const router: Router = Router();

router.get("/", (req, res) => {
  res.send("Service is running");
});



export default router;