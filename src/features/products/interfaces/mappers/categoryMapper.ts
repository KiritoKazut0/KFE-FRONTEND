import { CategoryDto } from "../dtos/category.dto";
import { Category } from "../models/category.model";

export class CategoryMapper {

    static toModel(dto: CategoryDto): Category {
        return {
            id: dto.id,
            name: dto.name
        }
    }

    static toModelList(dto: CategoryDto[]): Category[] {
        return (dto ?? []).map(category => this.toModel(category));
    }
}