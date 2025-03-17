const shuffleArray = <T>(arr: T[]) => {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

function distributeStudents(
  students: { name: string; level: string }[],
  teachers: string[]
): Record<string, { name: string; level: string }[]> {
  const shuffledStudents = shuffleArray(students);
  const result: Record<string, { name: string; level: string }[]> = {};

  teachers.forEach((teacher) => (result[teacher] = []));

  shuffledStudents.forEach((student, index) => {
    const teacherIndex = index % teachers.length;
    result[teachers[teacherIndex]].push(student);
  });

  return result;
}
