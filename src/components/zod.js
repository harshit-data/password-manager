import zod from "zod"

const schema = zod.object({
    websiteurl: zod.string().url(),
    username: zod.string().min(1),
    password: zod.string().min(1)
})

export default schema
