import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
} from "@nestjs/common";
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { BookService } from "./book.service";
import {
  BookCreateDto,
  BookUpdateDto,
  QueryParamsDto,
  BookViewDto,
} from "./dto/book.dto";

import { constant } from "../utils/constant";
import { CustomHttpException } from "../core/exception-filters/custom.http.exception";
import { ResponseInterface } from "../core/interfaces/response.interface";
import { MultipleBooksResponse, SingleBookResponse } from "./type";

@ApiTags("Book Api")
@Controller("books")
export class BookController {
  constructor(private readonly bookService: BookService) { }

  @ApiOperation({ summary: "Create Book" })
  @ApiBody({ type: BookCreateDto })
  @ApiResponse({ status: HttpStatus.OK, type: SingleBookResponse })
  @Post()
  async create(
    @Body() payload: BookCreateDto, //always use payload variable name in request
  ): Promise<ResponseInterface> {
    try {
      const response: any = await this.bookService.create(payload);
      return {
        error: false,
        statusCode: response?.statusCode || HttpStatus.OK,
        message: response?.message || constant.SUCCESS,
        displayMessage: false,
        data: response?.data || [],
      };
    } catch (e) {
      throw new CustomHttpException(
        e?.status || HttpStatus.INTERNAL_SERVER_ERROR,
        e?.message || constant.INTERNAL_SERVER_ERROR,
        e?.displayMessage || false,
        true,
        null,
      );
    }
  }

  @ApiOperation({ summary: "Retrieve all books" })
  @ApiResponse({ status: HttpStatus.OK, type: MultipleBooksResponse })
  @Get()
  async findAll(
    @Query() queryParams: QueryParamsDto,
  ): Promise<ResponseInterface> {
    try {
      const response = await this.bookService.findAll(queryParams);

      return {
        error: false,
        statusCode: HttpStatus.OK,
        message: constant.SUCCESS,
        displayMessage: false,
        data: response?.data || [],
      };
    } catch (e) {
      throw new CustomHttpException(
        e?.status || HttpStatus.INTERNAL_SERVER_ERROR,
        e?.message || constant.INTERNAL_SERVER_ERROR,
        e?.displayMessage || false,
        true,
        null,
      );
    }
  }

  @ApiOperation({ summary: "Retrieve single book by id" })
  @ApiResponse({ status: HttpStatus.OK, type: SingleBookResponse })
  @Get("/:id")
  async findOne(@Param() params: BookViewDto): Promise<ResponseInterface> {
    try {
      const response: any = await this.bookService.findOne(params.id);
      return {
        error: false,
        statusCode: response?.statusCode || HttpStatus.OK,
        message: response?.message || constant.SUCCESS,
        displayMessage: false,
        data: response?.data || [],
      };
    } catch (e) {
      throw new CustomHttpException(
        e?.status || HttpStatus.INTERNAL_SERVER_ERROR,
        e?.message || constant.INTERNAL_SERVER_ERROR,
        e?.displayMessage || false,
        true,
        null,
      );
    }
  }

  @ApiOperation({ summary: "Update Book" })
  @ApiResponse({ status: HttpStatus.OK, type: SingleBookResponse })
  @Put("/:id")
  async update(
    @Body() payload: BookUpdateDto,
    @Param() params: BookViewDto,
  ): Promise<ResponseInterface> {
    try {
      const response: any = await this.bookService.update(params?.id, payload);
      return {
        error: false,
        statusCode: response?.statusCode || HttpStatus.OK,
        message: response?.message || constant.SUCCESS,
        displayMessage: false,
        data: response?.data || [],
      };
    } catch (e) {
      throw new CustomHttpException(
        e?.status || HttpStatus.INTERNAL_SERVER_ERROR,
        e?.message || constant.INTERNAL_SERVER_ERROR,
        e?.displayMessage || false,
        true,
        null,
      );
    }
  }

  @ApiOperation({ summary: "Delete Book" })
  @ApiResponse({ status: HttpStatus.OK, type: SingleBookResponse })
  @Delete("/:id")
  async remove(@Param() params: BookViewDto): Promise<ResponseInterface> {
    try {
      const response: any = await this.bookService.remove(params?.id);
      return {
        error: false,
        statusCode: response?.statusCode || HttpStatus.OK,
        message: response?.message || constant.SUCCESS,
        displayMessage: false,
        data: response?.data || [],
      };
    } catch (e) {
      throw new CustomHttpException(
        e?.status || HttpStatus.INTERNAL_SERVER_ERROR,
        e?.message || constant.INTERNAL_SERVER_ERROR,
        e?.displayMessage || false,
        true,
        null,
      );
    }
  }
}
