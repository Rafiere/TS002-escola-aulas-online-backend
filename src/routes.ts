import { Router } from 'express';
import {SubjectController} from "./controllers/SubjectController";
import {RoomController} from "./controllers/RoomController";
import {VideoController} from "./controllers/VideoController";

const routes = Router();

routes.post('/subject', new SubjectController().create)
routes.post('/room', new RoomController().create)
routes.post('/room/:idRoom/:idSubject/update', new RoomController().insertSubjectOnRoom)
routes.get('/room/:idRoom/list', new RoomController().listAll)
routes.post('/video/:idRoom/create', new VideoController().create)

export default routes;