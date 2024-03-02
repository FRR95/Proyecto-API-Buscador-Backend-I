import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { Service } from "./Service";
import { User } from "./User";

@Entity("appointments")
export class Appointment extends BaseEntity{
    @PrimaryGeneratedColumn()
    id!: number

    @Column({ name: 'appointment_date' })
    appointment_date!: Date

    @ManyToOne(() => Service, (service) => service.appointments)
    @JoinColumn ({ name: "service_id" }) 
    service!: Service;

    @ManyToOne(() => User, (user) => user.appointments)
    @JoinColumn ({ name: "user_id" }) 
    user!: User;

}
