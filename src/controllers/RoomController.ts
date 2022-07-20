import {Request, Response} from "express";
import {roomRepository} from "../repositories/roomRepository";
import {subjectRepository} from "../repositories/subjectRepository";
import {Room} from "../entities/Room";

export class RoomController {

    async create(req: Request, res: Response){

        const {name, description} = req.body

        try {
            const newRoom = roomRepository.create({name, description});
            await roomRepository.save(newRoom);

            return res.status(201).json(newRoom);
        }catch(error){
            console.log(error);
            return res.status(500).json({message: "Internal Server Error."});
        }
    }

    async insertSubjectOnRoom(req: Request, res: Response){

        const {idRoom, idSubject} = req.params;

        try {

           const room = await roomRepository.findOneBy({id: Number(idRoom)});

           if(!room){
                return res.status(404).json({message: "A room com o ID especificado não foi encontrada."});
           }

           const subject = await subjectRepository.findOneBy({id: Number(idSubject)});

            if(!subject){
                return res.status(404).json({message: "O subject com o ID especificado não foi encontrado."});
            }

            const roomUpdated = {
                ...room,
                subjects: [subject]
            }

            await roomRepository.save(roomUpdated);

            return res.status(201).json(room);
        }catch(err){
            console.log(err);
            return res.status(500).json({message: 'Internal Server Error.'});
        }
    }

    async listAll(req: Request, res: Response){

        try{

            const room = await roomRepository.find({
                relations: { //Se quisermos que os "subjects" ou os "videos" que estão relacionados a um room sejam obtidos, devemos marcar essas opções como "true".
                    subjects: true,
                    videos: true
                }
            })

            if(!room){
                return res.status(404).json({message: "Não existe nenhuma room com o ID especificado."});
            }

            return res.status(200).json(room);

        }catch(err){
            console.log(err);
            return res.status(500).json({message: "Internal Server Error."});
        }

    }
}