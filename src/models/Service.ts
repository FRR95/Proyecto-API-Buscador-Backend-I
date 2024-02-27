import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { Appointment } from "./Appointment";

@Entity()
export class Service extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number

    @Column({ name: 'services_name' })
    services_name!: string

    @Column({ name: 'description' })
    description!: string

    @OneToMany(() => Appointment, (appointment) => appointment.service)
    appointments!: Appointment[];

  
}
