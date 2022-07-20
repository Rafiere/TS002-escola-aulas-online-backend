import {Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn} from "typeorm";
import {Room} from "./Room";

@Entity('subjects')
export class Subject {

    @PrimaryGeneratedColumn()
    id: number

    @Column({type: 'text'})
    name: string

    @ManyToMany(() => Room, (room) => room.subjects)
    @JoinTable({
        name: 'room_subject', //O nome da tabela que relacionará as duas entidades.
        joinColumn: { //Qual é a coluna da outra tabela que se juntará na tabela de join.
            name: 'room_id', //A coluna "room_id" da entidade "Room" será a escolhida.
            referencedColumnName: 'id'
        },
        inverseJoinColumn: {
            name: 'subject_id',
            referencedColumnName: 'id'
        }
    }) //Sempre que tivermos um relacionamento em que uma tabela realiza o relacionamento entre duas tabelas, devemos utilizar o "JoinTable" ao invés do "JoinColumn".
    rooms: Room[]
}