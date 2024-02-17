import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { Student } from './entities/student.entity';

@Injectable()
export class StudentsService {
  constructor(
    @InjectRepository(Student) private studentRepository: Repository<Student>,
  ) {}

  create(createStudentDto: CreateStudentDto) {
    const student = new Student();
    student.firstName = createStudentDto.firstName;
    student.lastName = createStudentDto.lastName;
    student.email = createStudentDto.email;
    student.address = createStudentDto.address;
    return this.studentRepository.save(student);
  }

  findAll() {
    return this.studentRepository.find();
  }

  findOne(id: number) {
    return this.studentRepository.findOneBy({ id });
  }

  async update(id: number, updateStudentDto: UpdateStudentDto) {
    const studentById = await this.studentRepository.findOneBy({ id });
    studentById.firstName = updateStudentDto.firstName;
    studentById.lastName = updateStudentDto.lastName;
    studentById.email = updateStudentDto.email;
    studentById.address = updateStudentDto.address;
    return this.studentRepository.save(studentById);
  }

  remove(id: number) {
    return this.studentRepository.delete(id);
  }
}
