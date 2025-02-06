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

    async register(username: string, email: string, password: string, phone: string, role: string){
        const existingUser = await this.usersService.findByUsername(username);
        if (existingUser){
            throw new UnauthorizedException("User is already exist");
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log(password);
        console.log(hashedPassword);

        const userCount = await this.usersService.countUsers();
        const userRole = userCount === 0 ? "admin" : role || "user";
        
        return await this.usersService.createUser(username, email, hashedPassword, userRole, phone);
    }

    async login(username: string, password: string) : Promise<{access_token: string}>{
        const user = await this.usersService.findByUsername(username);
        console.log(user);
        if(!user){
            console.log(`User not found for username: ${username}`); 
            throw new UnauthorizedException("Incorrect username or password");
        }

        const isMatch = await bcrypt.compare(password, user.password);
        console.log(`password: ${password}, hashed password: ${user.password}, isMatch: ${isMatch}`); 
        if(!isMatch){
            console.log(`Entered password: ${password}`);
            console.log(`Hashed password: ${user.password}`);
            console.log(`Password match: ${isMatch}`);
            throw new UnauthorizedException("Cannot password");
        }

        const payload = {username: user.username, sub: user.id, role: user.role};
        return {access_token: this.jwtService.sign(payload)};
    }

}
