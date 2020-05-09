

export function setProjectDetails(projectDetails) {
  sessionStorage.setItem("ProjectDetails", JSON.stringify(projectDetails))
}

export function getProjectDetails() {
  return JSON.parse(sessionStorage.getItem("ProjectDetails"))
}

export function removeProjectDetails() {
  sessionStorage.removeItem("ProjectDetails")
}
