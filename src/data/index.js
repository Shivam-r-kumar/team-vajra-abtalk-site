import student from "./student.json";
import community from "./community.json";
import domains from "./domains.json";

export const studentData = student;
export const communityData = community;
export const domainsData = domains;

export function getDomainById(domainId) {
  return domains.find((domain) => domain.id === domainId) || null;
}

export function getChallengeForDay(domain, day) {
  const challenge = domain?.challenges.find((item) => item.day === day) || domain?.challenges[0];
  const difficulty = day <= 10 ? "Beginner" : day <= 20 ? "Intermediate" : "Advanced";
  const timeKey = difficulty.toLowerCase();

  return {
    ...challenge,
    difficulty,
    estimatedTime: domain?.estimatedTimes[timeKey] || "~45 min",
    requirements: challenge?.requirements || domain?.requirements || []
  };
}

export function getStudentSubmission(day) {
  return student.submissions.find((submission) => submission.day === day) || null;
}
