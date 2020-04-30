import { Controller, Get, Post, Body, Param, Delete, Patch, Query, UsePipes, ValidationPipe, ParseIntPipe, UseGuards, Logger, } from '@nestjs/common';
import { TasksService } from './tasks.service';
// import { Task, TaskStatus } from './task.model';
import { CreateTaskDto } from './dto/create-task.dto'
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';
import { Task } from './task.entity';
import { TaskStatus } from './task-status.enum';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decoration';
import { User } from 'src/auth/user.entity';



@Controller('tasks')
@UseGuards(AuthGuard()) //https://github.com/arielweinberger/nestjs-course-task-management/tree/auth/16-authorization-deleting-a-task
export class TasksController {
  private logger = new Logger('TasksController');
  constructor(private tasksService: TasksService) { }

  @Get()
  getTasks(
    @Query(ValidationPipe) filterDto: GetTasksFilterDto,
    @GetUser() user: User,
  ): Promise<Task[]> {
    this.logger.verbose(`User "${user.username}" retrieving all task .Fillter: ${JSON.stringify(filterDto)}`)
    return this, this.tasksService.getTasks(filterDto, user);
  }


  @Get('/:id')
  getTaskById(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User
  ): Promise<Task> {
    return this.tasksService.getTaskById(id, user);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createTask(
    @Body() createTaskDto: CreateTaskDto,
    @GetUser() user: User
  ): Promise<Task> {
    this.logger.verbose(`User "${user.username}" creating a new task.Data: ${JSON.stringify(createTaskDto)}`)
    return this.tasksService.createTask(createTaskDto, user);
  }

  @Delete('/:id')
  deleteTask(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User
  ): Promise<void> {
    return this.tasksService.deleteTask(id, user);
  }

  @Patch('/:id/status')
  updateTaskStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body('status', TaskStatusValidationPipe) status: TaskStatus,
    @GetUser() user: User
  ): Promise<Task> {
    return this.tasksService.updateTaskStatus(id, status, user);
  }


  //khai báo các phương thức thông qua tasksService

  // //GET ALL TASKS
  // @Get()
  // getTasks(@Query(ValidationPipe) filterDto : GetTasksFilterDto): Task[] {
  //   if(Object.keys(filterDto).length){
  //     return this.tasksService.getTaskWithFilter(filterDto)
  //   }else{
  //     return this.tasksService.getAllTasks();
  //   }
  // }

  // //GET TASK BY ID
  // @Get('/:id')
  // getTaskById(@Param('id') id: string): Task {
  //   return this.tasksService.getTaskById(id);
  // }

  // //CREATE A TASK
  // @Post()
  // @UsePipes(ValidationPipe)
  // createTask(
  //   // @Body('title') title: string,
  //   // @Body('description') description: string,
  //   @Body() createTaskDto: CreateTaskDto
  // ): Task {
  //   // console.log('title', title)
  //   // console.log('description',description)
  //   return this.tasksService.createTask(createTaskDto);
  // }

  // //DELETE TASK
  // @Delete('/:id')
  // deleteTask(@Param('id') id: string): void {
  //   this.tasksService.deleteTask(id);
  // }

  // //UPDATE TASKSTATUS
  // @Patch('/:id/status')
  // updateTaskStatus(
  //   @Param('id') id: string,
  //   @Body('status', TaskStatusValidationPipe) status: TaskStatus,
  // ): Task {
  //   return this.tasksService.updateTaskStatus(id, status);
  // }
}
