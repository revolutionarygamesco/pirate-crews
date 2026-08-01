const moduleName = 'Module'

Hooks.on('init', () => {
  console.log(`Initializing ${moduleName}...`)
})

Hooks.on('ready', () => {
  console.log(`${moduleName} is ready`)
})
