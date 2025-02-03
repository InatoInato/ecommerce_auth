import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repo';
import { User } from './user.entity';
import * as bcrypt from "bcrypt";

@Injectable()
export class UsersService {
    constructor(
        private userRepo: UserRepository,
    ){}

    async craeteUser(
        username: string, 
        email: string, 
        password: string, 
        phone: string
    ) : Promise<User>{
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User();
        user.username = username;
        user.email = email;
        user.password = hashedPassword;
        user.phone = phone;

        return this.userRepo.saveUser(user);
    }

    async findByUsername(username: string): Promise<User | null>{
        return this.userRepo.findByUsername(username);
    }
}
