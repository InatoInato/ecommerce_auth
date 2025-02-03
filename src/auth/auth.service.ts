import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from "bcrypt";

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
    ){}

    async register(username: string, email: string, password: string, phone: string){
        const existingUser = await this.usersService.findByUsername(username);
        if (existingUser){
            throw new UnauthorizedException("User is already exist");
        }
        return this.usersService.craeteUser(username, email, password, phone);
    }

    async login(username: string, password: string) : Promise<{access_token: string}>{
        const user = await this.usersService.findByUsername(username);
        if(!user){
            throw new UnauthorizedException("Incorrect username or password");
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            throw new UnauthorizedException("Incorrect username or password");
        }

        const payload = {username: user.username, sub: user.id};
        return {access_token: this.jwtService.sign(payload)};
    }
}
