namespace University.Models
{
    public enum Grade
    {
        A, B, C, D, F
    }

    public class Enrollment
    {
        public int EnrollmentID { get; set; }
        public Grade? Grade { get; set; } //The question mark after the Grade type declaration indicates that the Grade property is nullable

        public int CourseID { get; set; } //foreign key, and the corresponding navigation property is Course
        public Course Course { get; set; }
        public int StudentID { get; set; } //foreign key, and the corresponding navigation property is Student
        public Student Student { get; set; }
    }
}