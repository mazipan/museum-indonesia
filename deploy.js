const ghpages = require('gh-pages')
const FOLDER_DIST = 'dist'
const BRANCH_DESTINATION = 'gh-pages'
const TODAY = new Date().toLocaleString()

console.log(`start deploying folder ${FOLDER_DIST} to ${BRANCH_DESTINATION}`)

ghpages.publish(FOLDER_DIST, {
  branch: BRANCH_DESTINATION,
  message: `Deploying folder ${FOLDER_DIST} to ${BRANCH_DESTINATION} on ${TODAY}`,
  dotfiles: true
}, () => {
  console.log(`done deploying folder ${FOLDER_DIST} to ${BRANCH_DESTINATION}`)
})
