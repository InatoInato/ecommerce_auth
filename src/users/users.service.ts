import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import * as bcrypt from "bcrypt";
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private userRepo: Repository<User>,
    ){}

    async countUsers(): Promise<number> {
        return await this.userRepo.count();
    }

    async createUser(
        username: string, 
        email: string, 
        password: string, 
        role: string,
        phone: string,
    ) : Promise<User>{
        const user = new User();
        user.username = username;
        user.email = email;
        user.password = password;
        user.role = role;
        user.phone = phone;

        return this.userRepo.save(user);
    }

    async findByUsername(username: string): Promise<User | null>{
        return this.userRepo.findOne({where: {username}});
    }
}
