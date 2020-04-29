import { Task } from './task.entity';
import { Repository, EntityRepository } from "typeorm";
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatus } from './task-status.enum';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { User } from 'src/auth/user.entity';

//https://github.com/typeorm/typeorm/blob/master/docs/custom-repository.md
//http://typeorm.delightful.studio/classes/_repository_repository_.repository.html

@EntityRepository(Task)
export class TaskRepository extends Repository<Task>{

  async getTasks(
    filterDto: GetTasksFilterDto,
    user: User
  ): Promise<Task[]> {
    const { status, search } = filterDto;

    const query = this.createQueryBuilder('task'); //tạo ra 1 câu query chỉ đến bảng task

    query.where('task.userId=:userId', { userId: user.id })

    if (status) {
      query.andWhere('task.status = :status', { status });
    }
    if (search) {
      query.andWhere('task.title LIKE :search OR task.description LIKE :search', { search: `%${search}%` }) //%% giúp tìm kiếm 1 thành phần hoặc chuỗi con
    }
    const tasks = await query.getMany()
    return tasks;
  }
  //https://github.com/arielweinberger/nestjs-course-task-management/tree/persistence/10-refactor-both-getting-all-tasks-and-filters

  async createTask(
    createTaskDto: CreateTaskDto,
    user: User
  ): Promise<Task> {
    const { title, description } = createTaskDto;

    const task = new Task();
    task.title = title;
    task.description = description;
    task.status = TaskStatus.OPEN;
    task.user = user;
    await task.save();
    //
    delete task.user;

    return task;
  }
}