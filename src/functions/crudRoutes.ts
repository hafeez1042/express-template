import { Router } from "express";
import { IController } from "../types/IController";

const crudRoutes = (path: string, router: Router, controller: IController) => {
  router
    .get(path, controller.getAll)
    .get(`${path}/:id`, controller.getById)
    .post(path, controller.create)
    .put(`${path}/:id`, controller.update)
    .delete(`${path}/:id`, controller.delete)
}

export default crudRoutes;
