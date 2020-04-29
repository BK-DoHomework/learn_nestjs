import { Controller, Get, Post, Body, Param, Delete, Patch, Query, UsePipes, ValidationPipe, ParseIntPipe, UseGuards, } from '@nestjs/common';
import { TasksService } from './tasks.service';
// import { Task, TaskStatus } from './task.model';
import { CreateTaskDto } from './dto/create-task.dto'
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';
import { Task } from './task.entity';
import { TaskStatus } from './task-status.enum';
import { AuthGuard } from '@nestjs/passport';



@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
  constructor(private tasksService: TasksService) { }

  @Get()
  getTasks(@Query(ValidationPipe) filterDto: GetTasksFilterDto):Promise<Task[]> {
    return this, this.tasksService.getTasks(filterDto);
  }


  @Get('/:id')
  getTaskById(@Param('id', ParseIntPipe) id: number): Promise<Task> {
    return this.tasksService.getTaskById(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    return this.tasksService.createTask(createTaskDto);
  }

  @Delete('/:id')
  deleteTask(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.tasksService.deleteTask(id);
  }

  @Patch('/:id/status')
  updateTaskStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body('status', TaskStatusValidationPipe) status: TaskStatus,
  ): Promise<Task> {
    return this.tasksService.updateTaskStatus(id, status);
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
