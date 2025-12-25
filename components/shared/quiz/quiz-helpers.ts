import { QuizQuestion } from "@/lib/quiz/types";

export function getCorrectAnswerText(q: QuizQuestion): string {
  if (q.kind === "mcq") {
    const correctOpt = q.options.find((o) => o.id === q.correctOptionId);
    if (correctOpt?.content.kind === "text")
      return correctOpt.content.text ?? "";
    return "See above";
  }
  if (q.kind === "cloze") {
    // Join answers
    if (q.correctAnswers) {
      return Object.values(q.correctAnswers).join(", ");
    }
    return "See above";
  }
  if (q.kind === "short_text") {
    return Array.isArray(q.correctAnswers)
      ? (q.correctAnswers[0] ?? "")
      : (q.correctAnswers ?? "");
  }
  // For match/reorder, usually just showing the solution state is enough or complex to stringify
  return "Solution shown above";
}

export function getIncorrectFeedback(q: QuizQuestion, answer: unknown): string {
  if (q.kind === "mcq" && typeof answer === "string") {
    const selectedOption = q.options.find((o) => o.id === answer);
    if (selectedOption?.feedback) {
      return selectedOption.feedback;
    }
  }
  return `Correct answer: ${getCorrectAnswerText(q)}`;
}

export function feedbackToCardStatus(
  fb: "idle" | "correct" | "incorrect"
): "correct" | "incorrect" | "info" {
  if (fb === "correct") return "correct";
  if (fb === "incorrect") return "incorrect";
  return "info";
}

export function praise(id: string) {
  const variants = ["Great job!", "Nice work!", "Well done!", "Awesome!"];
  const sum = Array.from(id).reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
  return variants[sum % variants.length];
}
