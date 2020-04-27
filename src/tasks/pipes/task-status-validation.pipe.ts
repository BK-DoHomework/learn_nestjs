import { PipeTransform, BadRequestException } from "@nestjs/common";
import { TaskStatus } from "../task-status.enum";

export class TaskStatusValidationPipe implements PipeTransform {

  //dữ liệu status của phương thức PATCH sẽ đi đến đây trước tiên thông qua biến status
  //sau đó kiểm tra sự tồn tại của status
  readonly allowedStatuses = [
    TaskStatus.OPEN,
    TaskStatus.IN_PROGRESS,
    TaskStatus.DONE
  ]


  transform(value: any) {
    // console.log('value', value)
    value = value.toUpperCase();
    if (!this.isStatusValid(value)) {
      throw new BadRequestException(`"${value}" is an invalid status`);
    }
    return value;
  }


  private isStatusValid(status: any) {
    const idx = this.allowedStatuses.indexOf(status);
    return idx !== -1;
  }
  // https://github.com/arielweinberger/nestjs-course-task-management/tree/validation/task-filtering-and-search/src/tasks
}