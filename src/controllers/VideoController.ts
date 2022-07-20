import {Request, Response} from "express";
import {videoRepository} from "../repositories/videoRepository";
import {roomRepository} from "../repositories/roomRepository";

export class VideoController {

    async create(req: Request, res: Response){

        const { title, url } = req.body //O título e a URL serão passados pelo corpo da requisição.
        const { idRoom } = req.params //O ID será passado como parâmetro para a rota.

        try{
            const room = await roomRepository.findOneBy({id: Number(idRoom)});

            if(!room){
                return res.status(404).json({message: "A aula com o ID especificado não existe."});
            }

            const newVideo = videoRepository.create({title, url, room});

            await videoRepository.save(newVideo);

            return res.status(201).json(newVideo);
        }catch(err){
            console.log(err);
            return res.status(500).json({message: "Internal Server Error."});
        }
    }
}