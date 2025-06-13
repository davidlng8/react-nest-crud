import { NestFactory } from "@nestjs/core";
import { AppModule } from "@/app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: "*", // allow all origins for now
  });
  // For port binding towards
  await app.listen(parseInt(process.env.BACKEND_PORT || "3011"), "0.0.0.0");
}
bootstrap();
