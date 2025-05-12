class Student {
    private id: number;
    private name: string;
    private courses: Course[] = [];

    constructor(id: number, name: string) {
        this.id = id;
        this.name = name;
    }

    public enrollCourse(course: Course): void {
        if (!this.courses.includes(course)) {
            this.courses.push(course);
            course.addStudent(this);
        }
    }

    public getCourses(): Course[] {
        return this.courses;
    }

    public getName(): string {
        return this.name;
    }
}

class Course {
    private courseId: string;
    private title: string;
    private students: Student[] = [];

    constructor(courseId: string, title: string) {
        this.courseId = courseId;
        this.title = title;
    }

    public addStudent(student: Student): void {
        if (!this.students.includes(student)) {
            this.students.push(student);
        }
    }

    public getStudents(): Student[] {
        return this.students;
    }

    public getTitle(): string {
        return this.title;
    }
}

// Використання
const student1 = new Student(1, "Марія");
const student2 = new Student(2, "Петро");

const mathCourse = new Course("MATH101", "Вища математика");
const programmingCourse = new Course("CS101", "Основи програмування");

student1.enrollCourse(mathCourse);
student1.enrollCourse(programmingCourse);
student2.enrollCourse(programmingCourse);

// Виведення інформації про зв'язки
console.log(`Студент ${student1.getName()} відвідує курси:`);
student1.getCourses().forEach(course => console.log(`- ${course.getTitle()}`));

console.log(`\nКурс "${programmingCourse.getTitle()}" відвідують студенти:`);
programmingCourse.getStudents().forEach(student => console.log(`- ${student.getName()}`));