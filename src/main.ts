import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

async function start() {
    const app = await NestFactory.create(AppModule);
    const port = Number(process.env.SERVER_PORT) || 5000;
    await app.listen(port);
    console.log(`Started in port: ${port}`)
}

start();