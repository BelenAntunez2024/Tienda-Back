import { IsString, MaxLength, MinLength, IsNotEmpty, IsDate, IsOptional, IsEmail, } from "class-validator";
import { Transform } from "class-transformer";

export class LoginDto {
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @Transform(({ value }) => value.trim())
    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    @MaxLength(10)
    password: string;
}
