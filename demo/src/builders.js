import { fill, hexToRgb, colourIsLight, addMonthsToYearAsDate, nextColor, randomTitle } from './utils'

const START_YEAR = 2020
const NUM_OF_YEARS = 1
const MONTHS_PER_YEAR = 12
const NUM_OF_MONTHS = NUM_OF_YEARS * MONTHS_PER_YEAR
const MAX_TRACK_START_GAP = 1
const MAX_ELEMENT_GAP = 8
const MAX_MONTH_SPAN = 2
const MIN_MONTH_SPAN = 1
const MAX_NUM_OF_SUBTRACKS = 5

export const buildElement = ({ projectId, start, end, i }) => {
  const bgColor = nextColor()
  const color = colourIsLight(...hexToRgb(bgColor)) ? '#000000' : '#ffffff'
  return {
    id: `t-${projectId}-el-${i}`,
    title: randomTitle(),
    start,
    end,
    style: {
      bgColor,
      color,
    },
  }
}

export const buildProjectStartGap = () => Math.floor(Math.random() * MAX_TRACK_START_GAP)
export const buildElementGap = () => Math.floor(Math.random() * MAX_ELEMENT_GAP)
export const buildElements = projectId => {
  const v = []
  let i = 1
  let month = buildProjectStartGap()

  while (month < NUM_OF_MONTHS) {
    let monthSpan = Math.floor(Math.random() * (MAX_MONTH_SPAN - (MIN_MONTH_SPAN - 1))) + MIN_MONTH_SPAN

    if (month + monthSpan > NUM_OF_MONTHS) {
      monthSpan = NUM_OF_MONTHS - month
    }

    const start = addMonthsToYearAsDate(START_YEAR, month)
    const end = addMonthsToYearAsDate(START_YEAR, month + monthSpan)
    v.push(
      buildElement({
        projectId,
        start,
        end,
        i,
      })
    )
    const gap = buildElementGap()
    month += monthSpan + gap
    i += 1
  }

  return v
}

export const buildSubproject = (projectId, subprojectId) => ({
  id: `project-${projectId}-${subprojectId}`,
  title: `子项目 ${subprojectId}`,
  elements: buildElements(subprojectId),
})

export const buildProject = projectId => {
  const projects = fill(Math.floor(Math.random() * MAX_NUM_OF_SUBTRACKS) + 1).map(i => buildSubproject(projectId, i + 1))
  return {
    id: `project-${projectId}`,
    title: `项目 ${projectId}`,
    elements: buildElements(projectId),
    projects,
    isOpen: false,
  }
}
