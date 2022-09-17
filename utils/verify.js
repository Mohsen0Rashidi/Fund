const { run } = require("hardhat")
const verify = async (cotractAddress, args) => {
    log("Verifying Contract")
    try {
        await run("verify:verify", {
            address: cotractAddress,
            constructorArguments: args,
        })
    } catch (error) {
        if (error.message.toLowerCase().includes("already verified")) {
            console.log("Already Verified")
        }
        console.log(error)
    }
}
module.exports = {
    verify
}
