const args = process.argv.slice(1)

export default {
    devMode: args.some(val => val === 'dev-mode')
}