import { EntityRepository ,Repository } from "typeorm";
import { User } from "./user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Injectable } from "@nestjs/common";

@Injectable()
export class UserRepository{
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ){}

    async findByUsername(username: string): Promise<User | null>{
        return await this.userRepository.findOne({where: {username}});
    }

    async saveUser(user: User): Promise<User>{
        return await this.userRepository.save(user);
    }
}