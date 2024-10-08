import { NestFactory } from "@nestjs/core";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );
  const config = new DocumentBuilder()
    .setTitle("Backend Task")
    .setDescription("The Backend API description")
    .setVersion("1.0")
    .addTag("backend")
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api-docs", app, document);
  await app.listen(3000);
}
bootstrap();
